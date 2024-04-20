import React from 'react'
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from 'firebase/storage';
// import { app } from '../firebase';
import { useState,useEffect} from 'react';
// import { CircularProgressbar } from 'react-circular-progressbar';
//  import 'react-circular-progressbar/dist/styles.css';
import { useNavigate,useParams } from 'react-router-dom';
import { current } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export default function Employee_AnnouncementEdit() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const {currentUser} = useSelector((state)=> state.user);
  
 const{announcementId} = useParams();

 console.log(formData);
 useEffect(() => {
  try {
    const fetchAnnouncement = async () => {
      const res = await fetch(`/api/announcement/getannouncement?announcementId=${announcementId}`);
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        setFormData(data.announcements[0]);
      }
    };

    fetchAnnouncement();
  } catch (error) {
    console.log(error.message);
  }
}, [announcementId]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/announcement/updateannouncement/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
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
    <h1 className='text-center text-3xl my-7 font-semibold'>Update The Announcemnt</h1>
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        <TextInput type='text' placeholder='Title' required id='title' className='flex-1' onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }value={formData.title} ></TextInput>
        <Select  onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            } value={formData.category}>
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
        value={formData.content}
      />
      <Button type='submit'   
       gradientDuoTone='purpleToPink'     
               className='w-40 h-10 mx-auto '
               style={{ backgroundColor: '#00008B' }}>
      Update 
      </Button>
     
      {publishError && (
        <Alert className='mt-5' color='failure'>
          {publishError}
        </Alert>
      )}
     
    </form>
    
  </div>
);
}
