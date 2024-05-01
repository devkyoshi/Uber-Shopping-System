import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react';
import Emp_CallToAction from '../components/Emp_CallToAction';
import { useSelector } from 'react-redux';


export default function AnnouncementHomeEach() {
  const { announcementSlug } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [recentAnnouncements, setRecentAnnouncements] = useState(null);
  const [error, setError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        
        const res = await fetch(`/api/announcement/getannouncement?slug=${announcementSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
         
          return;
        }
        if (res.ok) {
          setAnnouncement(data.announcements[0]);
         
          setError(false);
        }
      } catch (error) {
        setError(true);
       
      }
    };
    fetchAnnouncement();
  }, [announcementSlug]);
  return (
    
    <div   >
    <div hoverable  className=' border border-black justify-center items-center rounded-tl-3xl rounded-br-3xl text-center shadow-md p-3 mt-4 flex flex-col max-w-6xl mx-auto min-h-screen'>
    
    <img
        src={announcement && announcement.image}
       
        className='mt-0 p-3 max-h-[300px] w-full object-cover rounded-tl-3xl rounded-tr-3xl rounded-br-3xl rounded-bl-3xl'
      />
    <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
      {announcement && announcement.title}
    </h1>
    <div
     
      className='self-center mt-5'
    >
      
        {announcement && announcement.category}
      
    </div>
    
    <div className=' flex  justify-between p-3  mx-auto w-full max-w-2xl text-xs'>
      <span>{announcement && new Date(announcement.createdAt).toLocaleDateString()}</span>
      
    </div>
    
    <div
      className='p-3 max-w-2xl mx-auto w-full announcement-content'
      dangerouslySetInnerHTML={{ __html: announcement && announcement.content }}
    ></div>
    </div>
    
    
  
     <div className='max-w-4xl mx-auto w-full mt-8 mb-7'>
<Emp_CallToAction/>
    </div>
    <div>
    
      <form style={{ display: 'flex', flexDirection: 'column', marginBottom: '1.75rem', gap: '1rem' }}>
        
          <Link to={'/Emp_Home'} style={{ textDecoration: 'none' }}>
            <Button
              gradientDuoTone='purpleToPink'
              type='button'
              className='w-auto h-10 mx-auto mt-5'
              style={{ width: 'cover', margin: 'auto', backgroundColor: '#00008B' }}
            >
             Done
            </Button>
          </Link>
        
        </form>
    </div>
    <div>
    
      <form style={{ display: 'flex', flexDirection: 'column', marginBottom: '1.75rem', gap: '1rem' }}>
        {currentUser.isAdmin && (
          <Link to={'/Dashboard?tab=Announcements'} style={{ textDecoration: 'none' }}>
            <Button
              gradientDuoTone='purpleToPink'
              type='button'
              className='w-auto h-10 mx-auto mt-5'
              style={{ width: 'cover', margin: 'auto', backgroundColor: '#00008B' }}
            >
              Update Another Announcement
            </Button>
          </Link>
        )}
        </form>
    </div>
    <div>
    
    <form style={{ display: 'flex', flexDirection: 'column', marginBottom: '1.75rem', gap: '1rem' }}>
      {currentUser.isAdmin && (
        <Link to={'/Employee_Announcements'} style={{ textDecoration: 'none' }}>
          <Button
         gradientDuoTone='purpleToPink'
         type='button'
         className='w-auto h-10 mx-auto mt-5'
         
            style={{ width: 'cover', margin: 'auto', backgroundColor: '#00008B' }}
          >
            Publish Another Announcement
          </Button>
        </Link>
      )}
      </form>
  </div>
  </div>
 
  )
}
