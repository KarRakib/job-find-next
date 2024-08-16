'use client'
import { getUser } from '@workos-inc/authkit-nextjs';
import axios from 'axios';
import React, { ChangeEvent, useState } from 'react'
interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId :string;
  email:string
}

const AppliedPopUp: React.FC<UploadModalProps> =  ({ isOpen,email, onClose ,jobId}) => {
  const [cvLink, setCvLink] = useState<string>('');
 
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value) {
          setCvLink(e.target.value);
      }
  };
// for file upload 
//   const handleUpload = async () => {
//       if (!file) return;

//       const formData = new FormData();
//       formData.append('file', file);

//       const response = await fetch('/api/upload', {
//           method: 'POST',
//           body: formData,
//       });

//       if (response.ok) {
//           alert('File uploaded successfully!');
//           onClose();
//       } else {
//           alert('Failed to upload the file.');
//       }
//   };
async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevents the default form submission behavior
    const formData = new FormData(event.currentTarget);
    // Get the values of the email and cv fields
    const email = formData.get('email') as string | null;
    const cv = formData.get('cv') as string | null;
    const file = formData.get('file') as File | null;

    if (!email || !cv) {
        console.error('Email and CV are required');
        return;
    }
    const applicated = { email, cv };
    try {
        const res = await axios.put(`/api/jobs?id=${jobId}`, applicated);
        console.log('Response:', res.data);
        onClose();
    } catch (error) {
        console.error('Error uploading:', error);
    } 
    // You can now send this data to your server or perform other actions
}

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Upload Your Google CV Link</h2>
        {/* <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="mb-4 w-full"
        /> */}
     <form onSubmit={handleUpload} >
    <input
        type="text"
        name="cv"
        placeholder="https://docs.google.com/document"
        className="mb-4 w-full border-2 border-indigo-500"
    />
    <input
        type="email"
        name="email"
        readOnly
       defaultValue={email}
        className="mb-4 w-full border-2 border-rose-500"
    />
    <input
        type="file"
        name="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="mb-4 w-full border-2 border-gray-300"
    />
    <div className="flex justify-end space-x-4">
        <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
            Upload
        </button>
        <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
            Close
        </button>
    </div>
</form>

    </div>
</div>
  )
}

export default AppliedPopUp