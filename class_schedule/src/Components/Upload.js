import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const UploadFileForm = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const userId = useSelector(state => state.userID.user_id);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`http://127.0.0.1:5555//upload-profile-picture/${userId}`, {
        method: 'PATCH',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadStatus(data.message);  setFile('')// Update status
      } else {
        const errorData = await response.json();
        setUploadStatus(`Error: ${errorData.message}`); // Show error message
      }
    } catch (error) {
      setUploadStatus(`Error: ${error.message}`); // Catch error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center border-2 border-sky-400">
      <h1 className="text-2xl font-bold mb-4">Choose a profile photo</h1>
      <label className="flex flex-col items-center justify-center w-48 h-10 text-white bg-blue-400 rounded-lg">
        <span className="mb-1">Upload file</span>
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>
      {file && (
        <p className="mt-2 text-center">{file.name}</p>
      )}
      <button className="bg-blue-400 text-white px-4 py-2 rounded mt-2" onClick={handleFileUpload}>
        Submit Profile Img
      </button>
      <p className="mt-2">{uploadStatus}</p>
    </div>
  );
};

export default UploadFileForm;