import React from 'react'
import { Modal, Table, Button,TextInput} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { useDispatch } from 'react-redux';
export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(''); 
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null); 
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDeleteUser = async () => {
    try {
        const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        if (res.ok) {
            setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
            setShowModal(false);
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log(error.message);
    }
  };


 
  const generatePDF = () => {
    const input = document.getElementById('reportUser');
    html2canvas(input, { scrollY: -window.scrollY, logging: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const offsetX = (pdfWidth - imgWidth) / 2;
      const offsetY = 10;
      pdf.setFontSize(20);
      pdf.text('Announcemnt Report', pdfWidth / 2, 20, null, null, 'center');
      pdf.addImage(imgData, 'PNG', offsetX, offsetY + 30, imgWidth, imgHeight);
      pdf.save('user_report.pdf');
    });
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 '>
      {currentUser.isAdmin && users.length > 0 ? (
        <>
         <Button className=' mt-5 mb-5' gradientDuoTone='purpleToPink'
             type='button'
             
             style={{ backgroundColor: '#00008B' }} onClick={generatePDF}>Generate PDF</Button>
         <div id="reportUser" className='shadow-md'>
  <div className='grid grid-cols-6 bg-gray-100 dark:bg-black'>
    <div className='p-3'>Date created</div>
    <div className='p-3'>User image</div>
    <div className='p-3'>Username</div>
    <div className='p-3'>Email</div>
    <div className='p-3'>Admin</div>
    <div className='p-3'>Delete</div>
  </div>
  {users.map((user) => (
    <div key={user._id} className='grid grid-cols-6 divide-x divide-gray-200 dark:divide-gray-800'>
      <div className='p-3'>{new Date(user.createdAt).toLocaleDateString()}</div>
      <div className='p-3'>
        <img
          src={'https://www.366icons.com/media/01/profile-avatar-account-icon-16699.png'}
          alt={user.username}
          className='w-10 h-10 object-cover bg-gray-500 rounded-full'
        />
      </div>
      <div className='p-3'>{user.username}</div>
      <div className='p-3'>{user.email}</div>
      <div className='p-3'>
        {user.isAdmin ? (
          <FaCheck className='text-green-500' />
        ) : (
          <FaTimes className='text-red-500' />
        )}
      </div>
      <div className='p-3'>
        <span
          onClick={() => {
            setShowModal(true);
            setUserIdToDelete(user._id);
          }}
          className='font-medium text-red-500 hover:underline cursor-pointer'
        >
          Delete
        </span>
      </div>
    </div>
  ))}
</div>

          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no users yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
       
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this user?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
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
