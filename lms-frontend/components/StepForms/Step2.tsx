import React from "react";

interface Step2Props {
  videoFile: File | null;
  thumbnailFile: File | null;
  setVideoFile: (file: File | null) => void;
  setThumbnailFile: (file: File | null) => void;
}

function Step2({
  videoFile,
  thumbnailFile,
  setVideoFile,
  setThumbnailFile,
}: Step2Props) {
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setVideoFile(file);
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setThumbnailFile(file);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-indigo-950 mb-1.5">
          Course Video
        </label>
        <label
          htmlFor="video-upload"
          className="flex flex-col items-center justify-center gap-1.5 border-2 border-dashed border-indigo-200 bg-indigo-50/60 hover:bg-indigo-50 rounded-xl p-6 cursor-pointer transition-colors duration-200"
        >
          <svg
            className="w-7 h-7 text-indigo-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm text-indigo-700 font-medium">
            {videoFile ? "Replace video" : "Click to upload a video"}
          </span>
          <span className="text-xs text-gray-400">MP4, MOV up to 200MB</span>
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="hidden"
          />
        </label>
        {videoFile && (
          <p className="text-xs text-gray-500 mt-2 px-1">
            Selected: <span className="font-medium">{videoFile.name}</span>{" "}
            ({(videoFile.size / (1024 * 1024)).toFixed(1)} MB)
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-indigo-950 mb-1.5">
          Course Thumbnail
        </label>

        {thumbnailFile ? (
          <label
            htmlFor="thumbnail-upload"
            className="block relative w-full h-36 rounded-xl overflow-hidden cursor-pointer group"
          >
            <img
              src={URL.createObjectURL(thumbnailFile)}
              alt="Thumbnail preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-indigo-950/0 group-hover:bg-indigo-950/40 flex items-center justify-center transition-colors duration-200">
              <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Change thumbnail
              </span>
            </div>
            <input
              id="thumbnail-upload"
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="hidden"
            />
          </label>
        ) : (
          <label
            htmlFor="thumbnail-upload"
            className="flex flex-col items-center justify-center gap-1.5 border-2 border-dashed border-violet-200 bg-violet-50/60 hover:bg-violet-50 rounded-xl p-6 cursor-pointer transition-colors duration-200"
          >
            <svg
              className="w-7 h-7 text-violet-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm text-violet-700 font-medium">
              Click to upload a thumbnail
            </span>
            <span className="text-xs text-gray-400">PNG, JPG recommended</span>
            <input
              id="thumbnail-upload"
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );
}

export default Step2;