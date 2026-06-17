const pool = require("../config/database");
const crypto = require("crypto");


// generate course code 
const generateCourseCode = (courseName) => {
    const prefix = (courseName || "CRS")
        .replace(/[^a-zA-Z]/g, "")
        .toUpperCase()
        .slice(0, 4) || "CRS";
 
    const random = crypto.randomBytes(4).toString("hex").toUpperCase().slice(0, 6);
 
    return `${prefix}-${random}`;
};

const generateUniqueCourseCode = async (courseName) => {
    const MAX_ATTEMPTS = 5;
 
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const candidate = generateCourseCode(courseName);
 
        const existing = await pool.query(
            `SELECT id FROM courses WHERE course_code=$1`,
            [candidate]
        );
 
        if (existing.rows.length === 0) {
            return candidate;
        }
    }
 
    throw new Error("Could not generate a unique course code, please try again");
};
const addCourse = async (req, res) => {
    try {
        const{teacher_id,course_name, course_code, description, grade}=req.body;

        //validation
        if(!teacher_id || !course_name || !course_code){
            return res.status(400).json({
                success:false,
                message:"Missing fields"
            });
        }
        //check teacher exist
        const teacherResult= await pool.query(
            `SELECT * FROM users WHERE id=$1`,
            [teacher_id]
        );

        if(teacherResult.rows.length === 0){
            return res.status(400).json({
                success:false,
                message:"Teacher not found"
            });
        }

        //check duplicate course code
        const existingCode= await pool.query(
            `SELECT * FROM courses WHERE course_code=$1`,
            [course_code]
        );

        if(existingCode.rows.length > 0){
            return res.status(400).json({
                success:false,
                message:"Course code already exists"
            });
        }

        //insert course data to table
        const result = await pool.query(
            `INSERT INTO courses
             (teacher_id, course_name, course_code, description, grade) 
             VALUES ($1, $2, $3, $4, $5)
              RETURNING *`,
            [teacher_id, course_name, course_code, description, grade]
        );

        return res.status(201).json({
            success:true,
            course:result.rows[0]
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Server error"
        });
    }
}

//get course by teacher
const getCourseByTutor= async(req,res)=>{
    try{
       const {teacher_id}=req.params;
       const result=await pool.query(`SELECT * FROM courses WHERE teacher_id=$1`,[teacher_id]);
        return res.status(200).json({
            success:true,
            courses:result.rows
        });
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Server error"
        });
    }
}


module.exports={addCourse, getCourseByTutor};