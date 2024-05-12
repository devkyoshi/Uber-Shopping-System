import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';

export default function AdminPage() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='mt-5' style={{ maxWidth: '32rem', padding: '0.75rem', width: '100%' }}>
      <div>
         <h1 style={{ marginBottom: '1.75rem', textAlign: 'center', fontWeight: '600', fontSize: '1.875rem' }}>Publish an Announcement</h1>
      <form style={{ display: 'flex', flexDirection: 'column', marginBottom: '1.75rem', gap: '1rem' }}>
        {currentUser.isAdmin && (
          <Link to={'/Employee_Announcements'} style={{ textDecoration: 'none' }}>
            <Button
               gradientDuoTone='purpleToPink'
               type='button'
               className='w-40 h-10 mx-auto '
               style={{ backgroundColor: '#00008B' }}
            >
              Publish
            </Button>
          </Link>
        )}
      </form>
       <hr style={{ margin: '2rem auto', width: '80%', borderColor: 'gray' }} />
      </div>
      <h1 style={{ marginBottom: '1.75rem', textAlign: 'center', fontWeight: '600', fontSize: '1.875rem' }}>View Finance</h1>
      <form style={{ display: 'flex', flexDirection: 'column', marginBottom: '1.75rem', gap: '1rem' }}>
        {currentUser.isAdmin && (
          <Link to={'/Dashboard?tab=ManageEmp_salary'} style={{ textDecoration: 'none' }}>
            <Button
            gradientDuoTone='purpleToPink'
            type='button'
            
            className='w-40 h-10 mx-auto '
            style={{ backgroundColor: '#00008B' }}
            >
              View
            </Button>
          </Link>
        )}
        </form>
      <div>
          
      </div>
     
    </div>
  );
}
