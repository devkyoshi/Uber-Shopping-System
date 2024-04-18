import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';

export default function AdminPage() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div style={{ maxWidth: '32rem', margin: 'auto', padding: '0.75rem', width: '100%' }}>
      <div>
         <h1 style={{ marginBottom: '1.75rem', textAlign: 'center', fontWeight: '600', fontSize: '1.875rem' }}>Publish an Announcement</h1>
      <form style={{ display: 'flex', flexDirection: 'column', marginBottom: '1.75rem', gap: '1rem' }}>
        {currentUser.isAdmin && (
          <Link to={'/Employee_Announcements'} style={{ textDecoration: 'none' }}>
            <Button
              type='button'
              gradientDuoTone='purpleToPink'
              style={{ width: '100%', margin: 'auto' }}
            >
              Publish
            </Button>
          </Link>
        )}
      </form>
       <hr style={{ margin: '2rem auto', width: '80%', borderColor: 'gray' }} />
      </div>
      <h1 style={{ marginBottom: '1.75rem', textAlign: 'center', fontWeight: '600', fontSize: '1.875rem' }}>Manage Salary</h1>
      <form style={{ display: 'flex', flexDirection: 'column', marginBottom: '1.75rem', gap: '1rem' }}>
        {currentUser.isAdmin && (
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <Button
              type='button'
              gradientDuoTone='purpleToPink'
              style={{ width: '100%', margin: 'auto' }}
            >
              Manage
            </Button>
          </Link>
        )}
        </form>
      <div>
          
      </div>
     
    </div>
  );
}
