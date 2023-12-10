import React, { useState } from "react";

function FileUploader() {
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    // Upload the file here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-gray-50 px-4 py-8 shadow-md">
        <label
          className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-100 p-4"
          htmlFor="file-input"
        >
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <svg
              className="h-12 w-12 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-12-4.586a2 2 0 010-2.828L4 7.172M6.828 8.293l4.586 4.586a2 2 0 002.828 0L16 11.172v-4.586a2 2 0 00-2.828 0L8.293 6.828"
              />
            </svg>
          )}
          <input
            type="file"
            id="file-input"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </label>
        <p className="mt-4 text-sm text-gray-700">Select a file to upload</p>
        <button
          type="submit"
          className="mt-8 rounded-lg bg-primary-800 px-4 py-2 text-white hover:bg-primary-500"
        >
          Upload
        </button>
      </div>
    </form>
  );
}

export default FileUploader;
