import React from "react";

interface Step3Props {
  formData: {
    course_name: string;
    description: string;
    grade: string;
  };
  videoFile: File | null;
  thumbnailFile: File | null;
}

function Step3({ formData, videoFile, thumbnailFile }: Step3Props) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Please review the details below before submitting.
      </p>

      <div className="rounded-xl p-5 space-y-4 bg-gradient-to-br from-indigo-50 via-indigo-50/70 to-violet-50 border border-indigo-100">
        <div>
          <span className="text-xs text-indigo-400 font-medium block mb-0.5">
            Course Name
          </span>
          <span className="text-sm font-semibold text-indigo-950">
            {formData.course_name || "—"}
          </span>
        </div>

        <div>
          <span className="text-xs text-indigo-400 font-medium block mb-0.5">
            Description
          </span>
          <span className="text-sm text-gray-600">
            {formData.description || "—"}
          </span>
        </div>

        <div>
          <span className="text-xs text-indigo-400 font-medium block mb-0.5">
            Grade
          </span>
          <span className="text-sm text-gray-600">
            {formData.grade ? `Grade ${formData.grade}` : "—"}
          </span>
        </div>

        <div>
          <span className="text-xs text-indigo-400 font-medium block mb-0.5">
            Course Video
          </span>
          <span className="text-sm text-gray-600">
            {videoFile ? videoFile.name : "No video selected"}
          </span>
        </div>

        <div>
          <span className="text-xs text-indigo-400 font-medium block mb-1">
            Course Thumbnail
          </span>
          {thumbnailFile ? (
            <img
              src={URL.createObjectURL(thumbnailFile)}
              alt="Thumbnail preview"
              className="w-32 h-20 object-cover rounded-lg border border-indigo-100"
            />
          ) : (
            <span className="text-sm text-gray-600">No thumbnail selected</span>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-400 leading-relaxed">
        Course code will be assigned automatically after submission.
      </p>
    </div>
  );
}

export default Step3;