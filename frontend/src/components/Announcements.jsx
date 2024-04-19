 import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
 import { Link } from 'react-router-dom';
 import { HiOutlineExclamationCircle } from 'react-icons/hi';
//import { set } from 'mongoose';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
   const [userAnnouncements, setUserAnnouncements] = useState([]);
   const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [announcementIdToDelete, setAnnouncementsIdToDelete] = useState('');
 
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch(`/api/announcement/getannouncement?userId=${currentUser._id}`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setUserAnnouncements(data.announcements);//check
          if (data.announcements.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchAnnouncements();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userAnnouncements.length;
    try {
      const res = await fetch(`/api/announcement/getannouncement?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUserAnnouncements((prev) => [...prev, ...data.announcements]);
        if (data.announcements.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteAnnouncement = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/announcement/deleteannouncement/${announcementIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserAnnouncements((prev) =>
          prev.filter((announcements) => announcements._id !== announcementIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
   
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
    {currentUser.isAdmin && userAnnouncements.length > 0 ? (
      <>
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Date updated</Table.HeadCell>
            
            <Table.HeadCell>Announcment title</Table.HeadCell>
            <Table.HeadCell>Post image</Table.HeadCell>
            <Table.HeadCell>Announcment Category</Table.HeadCell>
            <Table.HeadCell>Delete Announcment</Table.HeadCell>
            <Table.HeadCell>Edit Announcment</Table.HeadCell>
          </Table.Head>
          {userAnnouncements.map((announcements) => (
            <Table.Body key={announcements._id} className='divide-y'>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>
                  {new Date(announcements.updatedAt).toLocaleDateString()}
                </Table.Cell>
                
                <Table.Cell>
                  <Link
                    className='font-medium text-gray-900 dark:text-white'
                    to={`/announcement/${announcements.slug}`}
                  >
                    {announcements.title}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                    <Link to={`/post/${announcements.slug}`}>
                      <img
                        src={announcements.image}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                <Table.Cell>{announcements.category}</Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => {
                      setShowModal(true);
                      setAnnouncementsIdToDelete(announcements._id);
                    }}
                    className='font-medium text-red-500 hover:underline cursor-pointer'
                  >
                    Delete
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    className='text-teal-500 hover:underline'
                     to={`/Employee_AnnouncementEdit/${announcements._id}`}
                  >
                    <span>Edit</span>
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
        <button
          onClick={handleShowMore}
          className='w-full text-teal-500 self-center text-sm py-7'
        >
          Show more
        </button> 
      </>
    ) : (
    <p>You have no Announcments yet!</p>
    )}
     <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this Announcement?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteAnnouncement}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
  </div>
);
}
 
