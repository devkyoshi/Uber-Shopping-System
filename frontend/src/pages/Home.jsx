import { Link } from 'react-router-dom';
import Emp_CallToAction from '../components/Emp_CallToAction';
import { useEffect, useState } from 'react';
import AnnouncementCard from '../components/AnnouncementCard';

export default function Home() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const res = await fetch('http://localhost:8070/Employee/announcement/getannouncement');
      const data = await res.json();
      setAnnouncements(data.announcements);
    };
    fetchAnnouncements();
  }, []);
  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome Employees</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
         
"Welcome to our food-loving team! At UBER DELIVERY, 
we're thrilled to have you join our delivery family. 
Get ready to bring smiles to hungry customers' faces one order at a time. Let's deliver deliciousness together!"
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <Emp_CallToAction />
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {announcements && announcements.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {announcements.map((announcement) => (
                <AnnouncementCard key={announcement._id} announcement={announcement} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all announcements
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}