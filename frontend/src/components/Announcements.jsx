 import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
 import { Link } from 'react-router-dom';
 import { HiOutlineExclamationCircle } from 'react-icons/hi';
//import { set } from 'mongoose';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
  
  const generatePDF = () => {
    const input = document.getElementById('reportannounce');
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
   
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
    {currentUser.isAdmin && userAnnouncements.length > 0 ? (
      <>
      <Button className=' mt-5 mb-5' gradientDuoTone='purpleToPink'
             type='button'
             
             style={{ backgroundColor: '#00008B' }}onClick={generatePDF}>Generate PDF</Button>
      <div id="reportannounce" className='shadow-md'>
  <div className='grid grid-cols-6 bg-gray-100 dark:bg-gray-800'>
    <div className='p-3'>Date updated</div>
    <div className='p-3'>Announcement title</div>
    <div className='p-3'> image</div>
    
    <div className='p-3'> Category</div>
    <div className='p-3'>Delete </div>
    <div className='p-3'>Edit </div>
  </div>
  {userAnnouncements.map((announcements) => (
    <div key={announcements._id} className='divide-y grid grid-cols-6'>
      <div className='p-3'>
        {new Date(announcements.updatedAt).toLocaleDateString()}
      </div>
      <div className='p-3'>
        <Link
          className='font-medium text-gray-900 dark:text-white'
          to={`/announcement/${announcements.slug}`}
        >
          {announcements.title}
        </Link>
      </div>
      <div className='p-3'>
        <Link to={`/post/${announcements.slug}`}>
          <img
            src={announcements.image}
            className='w-20 h-10 object-cover bg-gray-500'
          />
        </Link>
      </div>
      <div className='p-3'>{announcements.category}</div>
      <div className='p-3'>
        <span
          onClick={() => {
            setShowModal(true);
            setAnnouncementsIdToDelete(announcements._id);
          }}
          className='font-medium text-red-500 hover:underline cursor-pointer'
        >
          Delete
        </span>
      </div>
      <div className='p-3'>
        <Link
          className='text-teal-500 hover:underline'
          to={`/Employee_AnnouncementEdit/${announcements._id}`}
        >
          <span>Edit</span>
        </Link>
      </div>
    </div>
  ))}
</div>

        
      </>
    ) : (
    <p>You have no Announcments yet!</p>
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
 
