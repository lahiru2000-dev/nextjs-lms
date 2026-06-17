import React from 'react'

interface Step1Props {
  formData: {
    course_name: string;
    description: string;
    grade: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
}
function Step1() {
  return (
    <div>Step1</div>
  )
}

export default Step1