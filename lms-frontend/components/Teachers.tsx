'use client'
import React, { useEffect, useState } from 'react'
import api from '../lib/axios'
import Image from 'next/image'

interface Teacher {
  id: number
  name: string
  subject?: string
  avatar?: string
}

function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([])

  const getTeachers = async () => {
    try {
      const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/teachers`)
      setTeachers(res.data.teachers)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTeachers()
  }, [])

  const getInitials = (name: string) =>
    name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
   <div className="w-full px-6 py-6 bg-gray-50">
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Tutors</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm text-center"
          >
            {teacher.avatar ? (
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-indigo-100">
                <Image src={teacher.avatar} alt={teacher.name} fill className="object-cover" />
              </div>
            ) : (
              <div className="w-28 h-28 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium text-2xl">
                {getInitials(teacher.name)}
              </div>
            )}
            <div>
              <p className="text-base font-semibold text-gray-900">{teacher.name}</p>
              {teacher.subject && (
                <p className="text-sm text-gray-500 mt-1">{teacher.subject}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default Teachers