"use client";
import {useState, useEffect} from "react";
import React from 'react'
import axios from "axios";

type studentType={
    name:string,
    grade:string,
    email:string,
    phone:string
}

function Student() {

    const [students, setStudents] = useState<studentType[]>([]);
    const [name, setName] = useState<string>("");
    const [grade, setGrade] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    // get all students
    const getStudents=async()=>{
        try{
            const res=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/students`);
            setStudents(res.data.students);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getStudents();
    },[])
    


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
    
    <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl overflow-hidden">

      <table className="w-full border-collapse text-left">

        {/* Table Head */}
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700">
              Name
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700">
              Grade
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700">
              Email
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700">
              Phone
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">

          {students.map((student, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4 text-gray-800">
                {student.name}
              </td>

              <td className="px-6 py-4 text-gray-800">
                {student.grade}
              </td>

              <td className="px-6 py-4 text-gray-800">
                {student.email}
              </td>

              <td className="px-6 py-4 text-gray-800">
                {student.phone}
              </td>

              <td className="px-6 py-4">
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                  Edit
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>

    </div>
  </div>
  )
}

export default Student