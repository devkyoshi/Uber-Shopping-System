import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  
 
  const [announcements, setAnnouncements] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  const [totalAnnouncements, setTotalAnnouncements] = useState(0);
  
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthAnnouncements, setLastMonthAnnouncements] = useState(0);

  const { currentUser } = useSelector((state) => state.user);
 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers?limit=5');
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    
     const fetchAnnouncements = async () => {
      try {
        const res = await fetch(`/api/announcement/getannouncement?limit=5`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
            setAnnouncements(data.announcements);
            setTotalAnnouncements(data.totalAnnouncements);
            setLastMonthAnnouncements(data.lastMonthAnnouncements);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchAnnouncements();
      fetchUsers();
    }
  }, [currentUser]);
  return (
    <div className='p-3 md:mx-auto'>
      <div className='flex-wrap flex gap-4 justify-center'>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
              <p className='text-2xl'>{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className='bg-teal-600  text-black rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex  gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
        
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Total Announcements</h3>
              <p className='text-2xl'>{totalAnnouncements}</p>
            </div>
            <HiDocumentText className='bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex  gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthAnnouncements}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between  p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent users</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/Dashboard?tab=DashUsers'}>See all</Link>
            </Button>
          </div>
          <table className="table hoverable shadow-md">
  <thead>
    <tr >
      <th  className="w-auto pl-3 pr-0 pb-3 pt-3">User image</th>
      <th  className="w-auto pl-0 pr-12 pb-3 pt-3">Username</th>
    </tr>
  </thead>
  <tbody>
    {users &&
      users.map((user) => (
        <tr key={user._id} className=" w-auto table-row bg-white dark:border-gray-700 dark:bg-gray-800">
          <td  className="pl-3 pr-3">
            <img
              src={'https://www.366icons.com/media/01/profile-avatar-account-icon-16699.png'}
              alt="user"
              className="w-10 h-10 rounded-full bg-gray-500"
            />
          </td>
          <td  className="pl-3 pr-3 pb-3 pt-3">{user.username}</td>
        </tr>
      ))}
  </tbody>
</table>

          {/* <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      <img
                        src={'https://www.366icons.com/media/01/profile-avatar-account-icon-16699.png'}
                        alt='user'
                        className='w-10 h-10 rounded-full bg-gray-500'
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table> */}
        </div>
        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
        
          
        </div>
        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between  p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent Announcements</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/Dashboard?tab=Announcements'}>See all</Link>
            </Button>
          </div>
          <div className='shadow-md'>
              <table className="table hoverable">
  <thead>
    <tr>
      <th className="pl-3 pr-3">Announcements image</th>
      <th className="pl-3 pr-3">Announcements Title</th>
      <th className="pl-3 pr-3">Announcements Category</th>
    </tr>
  </thead>
  <tbody>
    {announcements &&
      announcements.map((announcement) => (
        <tr key={announcement._id} className="table-row bg-white dark:border-gray-700 dark:bg-gray-800">
          <td className="pl-3 pr-3 pt-3 pb-3 ">
            <img
              src={announcement.image}
              alt="announcement"
              className="w-14 h-10 rounded-md bg-gray-500 "
            />

          </td>
          <td className="w-auto pt-3 pb-3 pl-3 pr-3">{announcement.title}</td>
          <td className="w-auto pt-3 pb-3 pl-3 pr-3">{announcement.category}</td>
        </tr>
      ))}
  </tbody>
</table>
          </div>
        

          {/* <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Announcements image</Table.HeadCell>
              <Table.HeadCell>Announcements Title</Table.HeadCell>
              <Table.HeadCell>Announcements Category</Table.HeadCell>
            </Table.Head>
            {announcements &&
              announcements.map((announcement) => (
                <Table.Body key={announcement._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      <img
                        src={announcement.image}
                        alt='user'
                        className='w-14 h-10 rounded-md bg-gray-500'
                      />
                    </Table.Cell>
                    <Table.Cell className='w-96'>{announcement.title}</Table.Cell>
                    <Table.Cell className='w-5'>{announcement.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table> */}
        </div>
      </div>
    </div>
  );
}