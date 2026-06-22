import React, {useEffect, useState} from 'react'
import {useRouter} from "next/navigation";

interface Course{
  id: number;
  course_name: string;
  course_code: string;
  description: string;
  grade: string;
  thumbnail_url: string | null;
  video_url: string | null;
  created_at: string;
}

function TeacherDashboard() {







  
  return (
    <div>page</div>
  )
}

export default TeacherDashboard