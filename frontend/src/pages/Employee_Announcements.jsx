import React from 'react'
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from 'firebase/storage';
// import { app } from '../firebase';
import { useState } from 'react';
// import { CircularProgressbar } from 'react-circular-progressbar';
//  import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

export default function Employee_Announcements() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
 console.log(formData);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/announcement/announcement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
         navigate(`/announcement/${data.slug}`)
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/announcement/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Internal Error Check code lines 17-46 :)');
    }
  };
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
    <h1 className='text-center text-3xl my-7 font-semibold'>Publish An Announcemnt</h1>
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        <TextInput type='text' placeholder='Title' required id='title' className='flex-1' onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            } ></TextInput>
        <Select  onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }>
          <option value='uncategorized'>Select a Criteria</option>
          <option value='Version'>Version Updates</option>
          <option value='Promotions'>Promotions</option>
          <option value='Market'>Market</option>
        </Select>
      </div>
     
      
     
      <ReactQuill
        theme='snow'
        placeholder='Write something...'
        className='h-72 mb-12'
        required
        onChange={(value) => {
          setFormData({ ...formData, content: value });
        }}
      />
      <Button type='submit'  
       gradientDuoTone='purpleToPink'     
               className='w-40 h-10 mx-auto '
               style={{ backgroundColor: '#00008B' }}>
        Publish
      </Button>
      {publishError && (
        <Alert className='mt-5' color='failure'>
          {publishError}
        </Alert>
      )}
    </form>
    <Link to={'/Dashboard?tab=HR_Dashboard'} style={{ textDecoration: 'none' }}>
            <Button
               gradientDuoTone='purpleToPink'
               type='button'
               className='w-40 h-10 mx-auto mt-5'
               style={{ backgroundColor: '#00008B' }}
            >
             Cancel
            </Button>
          </Link>
          <button className=''>

          </button>
  </div>

  
);
}
