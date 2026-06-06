const pool = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        //validation
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"Missing fields"
            });
        }

        //check email already exists
        const existingUser = await pool.query(`SELECT * FROM users WHERE email=$1`,[email]);
        if(existingUser.rows.length > 0){
            return res.status(400).json({
                success:false,
                message:"Email already exists"
            });
        }
        //hashed password
        const hashedPassword = await bcrypt.hash(password, 10);
        const result= await pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,[name, email, hashedPassword]);
        return res.status(201).json({
            success:true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Server error"
        });

    }
    
}