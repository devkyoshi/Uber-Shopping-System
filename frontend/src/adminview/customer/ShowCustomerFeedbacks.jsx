import { Modal, Button } from 'flowbite-react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ShowCustomerFeedbacks() {
    const { currentCustomer } = useSelector((state) => state.customer);
    const [feedbacks,setFeedbacks] = useState([]);
    const [showMore,setShowMore] = useState(true);
    const [showModel,setShowModel] = useState(false);
    const [feedbackIdToDelete,setFeedbackIdToDelete] = useState('');
    const [searchFeedback,setSearchFeedback] = useState('');
    const  location = useLocation();
    const navigate = useNavigate();
    const [searchData ,setSeacrhData] = useState({
        searchTerm: '',
        sort: 'desc'
    });
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermUrl = urlParams.get('searchTerm');
        const sortUrl = urlParams.get('sort');
        if(searchTermUrl){
            setSearchFeedback(searchTermUrl);
        }
        if(searchTermUrl || sortUrl){
            setSeacrhData({
                ...searchData,
                searchTerm: searchTermUrl,
                sort: sortUrl
            })
        }
        const fetchFeedbacks = async () => {
            try {
                setLoading(true);
                const seacrhQuery = urlParams.toString();
                const res = await fetch(`/Feedback/getFeedback?${seacrhQuery}`);
                if(!res.ok){
                    setLoading(false);
                    return;
                }
                if(res.ok){
                    const data = await res.json()
                    setFeedbacks(data.cus_feedback);
                    setLoading(false);
                    if(data.cus_feedback.length === 9){
                        setShowMore(true);
                    }
                    else{setShowMore(false)}
                }
            } catch (error) {
                setLoading(false);
                console.log(error.message);
            }
        };
        if(currentCustomer.adminType === 'customer'){
            fetchFeedbacks();
        }
    }, [location.search])

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const res = await fetch(`/Feedback/getFeedback`)
                const data = await res.json()
                if(res.ok){
                    setFeedbacks(data.cus_feedback);
                    if(data.cus_feedback.length < 9){
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if(currentCustomer.adminType === 'customer'){
            fetchFeedbacks();
        }
    }, [currentCustomer._id])

    const generatePDF = () => {
        const input = document.getElementById('feedbackTable');
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
          pdf.text('Feedback Report', pdfWidth / 2, 20, null, null, 'center');
          pdf.addImage(imgData, 'PNG', offsetX, offsetY + 30, imgWidth, imgHeight);
          pdf.save('feedback_report.pdf');
        });
      };

    const handleShowMore = async () => {
        const startIndex = feedbacks.length;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex)
        const seacrhQuery = urlParams.toString();
        try {
            const res = await fetch(`/Feedback/getFeedback?${seacrhQuery}`);
            const data =await res.json();
            if(res.ok){
                setFeedbacks((prev) => [...prev, ...data.cus_feedback]);
                if(data.cus_feedback.length < 9){setShowMore(false);}
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleRemoveFeedbacks = async () => {
        setShowModel(false);
        try {
            const res = await fetch(`/Feedback/deleteFeedback/${feedbackIdToDelete}`,
            {method: 'DELETE',}
        );
        const data = await res.json();
        if(!res.ok){
            console.log(data.message);
        }else{
            setFeedbacks((prev) => prev.filter((feedbacks) => feedbacks._id !== feedbackIdToDelete));
            setShowModel(false);
            if(data.cus_feedback.length < 9){setShowMore(false);}
        }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchFeedback);
        const seacrhQuery = urlParams.toString();
        navigate(`?${seacrhQuery}`);
    }

    const handleChange =(e) => {
        if(e.target.id === 'searchTerm'){
            setSeacrhData({
                ...searchData,
                searchTerm: e.target.value
            });
        }
        if(e.target.id === 'sort'){
            const sortOrder = e.target.value || 'desc';
            setSeacrhData({
                ...searchData,
                sort: sortOrder
            });
        }
    }
    const handleSearch = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchData.searchTerm);
        urlParams.set('sort', searchData.sort);
        const seacrhQuery = urlParams.toString();
        navigate(`?${seacrhQuery}`);
    }
    return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 mt-5'>
      {currentCustomer.adminType === 'customer' && feedbacks.length > 0 ? (
        <>
            <div className='flex justify-between'>
            {!searchData.searchTerm && (<button className="mb-10"
                    style={{
                        padding: "0.5rem 1rem",
                        fontSize: "1rem",
                        borderRadius: "0.375rem",
                        color: "linear-gradient(90deg, #EC4899, #FFB037)",
                        background: "transparent",
                        border: "1px solid #EC4899",
                        outline: "none",
                        opacity: loading ? "0.7" : "1",
                        pointerEvents: loading ? "none" : "auto",
                        cursor: loading ? "not-allowed" : "pointer",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background =
                        "linear-gradient(90deg, #EC4899, #FFB037)";
                        e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                        e.target.style.color = "black";
                    }} onClick={generatePDF}>
                    Download PDF
            </button>)}
            <form onSubmit={handleSubmit} className='mb-10' style={{textAlign: 'right'}}>
                <div style={{ position: 'absolute', right: 190 }}>
                    <input
                        className='shadow-md'
                        type='text'
                        placeholder='Search..'
                        value={searchFeedback}
                        onChange={(e) => setSearchFeedback(e.target.value)}
                        style={{
                            padding: '0.5rem 2rem 0.5rem 1rem',
                            borderRadius: '0.375rem',
                            borderWidth: '1px',
                            borderColor: '#e5e7eb',
                            backgroundColor: '#f9fafb',
                            width: '100%',
                            fontSize: '1rem',
                            outline: 'none',
                        }}
                    />
                    <AiOutlineSearch
                        onClick={handleSubmit}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '0.75rem',
                            transform: 'translateY(-50%)',
                            color: '#6b7280',
                        }}
                    />
                </div>
            </form></div>
            {searchData.searchTerm && (
            <div className='p-7'>
                <form className='flex flex-row' style={{textAlign: 'left'}} onSubmit={handleSearch}>
                    <div className='flex flex-1 flex-row items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                        <input
                            type='text'
                            placeholder='Search...'
                            id='searchTerm'
                            value={searchData.searchTerm}
                            onChange={handleChange}
                            style={{
                                padding: '0.75rem 1em',
                                borderRadius: '0.375rem',
                                borderWidth: '1px',
                                borderColor: '#e5e7eb',
                                width: '60%',
                                fontSize: '1rem',
                                outline: 'none',
                                boxShadow: 'none',
                            }}
                        />
                    </div>
                    <div className='flex flex-1 flex-row items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Sort:</label>
                        <select id='sort'
                                defaultValue={searchData.sort}
                                onChange={handleChange}
                                style={{
                                    padding: '0.75rem 1rem',
                                    borderRadius: '0.375rem',
                                    borderWidth: '1px',
                                    borderColor: '#e5e7eb',
                                    width: '60%',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    boxShadow: 'none',
                                }}
                        >
                            <option value='desc'>Latest</option>
                            <option value='asc'>Oldest</option>
                        </select>
                    </div>
                    <button 
                        className=' ml-24'
                        type='submit' 
                        disabled={loading} 
                        style={{
                            padding: '0.5rem 1rem',
                            fontSize: '1rem',
                            borderRadius: '0.375rem',
                            color: 'linear-gradient(90deg, #EC4899, #FFB037)',
                            background: 'transparent',
                            border: '1px solid #EC4899',
                            outline: 'none',
                            opacity: loading ? '0.7' : '1',
                            pointerEvents: loading ? 'none' : 'auto',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                        onMouseEnter={(e) => { 
                            e.target.style.background = 'linear-gradient(90deg, #EC4899, #FFB037)';
                            e.target.style.color = 'white';
                        }}
                        onMouseLeave={(e) => { 
                            e.target.style.background = 'transparent';
                            e.target.style.color = 'black';
                        }}>
                        {loading ? 'Loading...' : 'Apply filters'}
                    </button>
                </form>
            </div>)}
            {/* <Table hoverable className='shadow-md'>
                <Table.Head>
                    <Table.HeadCell>Date updated</Table.HeadCell>
                    <Table.HeadCell>User ID</Table.HeadCell>
                    <Table.HeadCell>Feedback details</Table.HeadCell>
                    <Table.HeadCell>Number of likes</Table.HeadCell>
                    <Table.HeadCell>Number of dislikes</Table.HeadCell>
                    <Table.HeadCell>Remove</Table.HeadCell>
                </Table.Head>
                {feedbacks.map((feedback) => (
                    <Table.Body className='divide-y' key={feedback._id}>
                        <Table.Row className='bg-white'>
                            <Table.Cell>{new Date(feedback.updatedAt).toLocaleDateString()}</Table.Cell>
                            <Table.Cell className='font-medium text-gray-900 '>{feedback.cus_id}</Table.Cell>
                            <Table.Cell>{feedback.cus_feedback}</Table.Cell>
                            <Table.Cell><div className='flex justify-center gap-5'>{feedback.numberOfLikes}<FaThumbsUp className='text-sm mt-0.5 text-green-400'/></div></Table.Cell>
                            <Table.Cell><div className='flex justify-center gap-5'>{feedback.numberOfDislikes}<FaThumbsDown className='text-sm mt-1 text-red-400'/></div></Table.Cell>
                            <Table.Cell>
                                <span onClick={() => {
                                    setShowModel(true);
                                    setFeedbackIdToDelete(feedback._id);
                                }} className='font-medium text-red-500 hover:underline cursor-pointer'>
                                    Delete
                                </span>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
            </Table> */}
            {!searchData.searchTerm && (
            <table id='feedbackTable' style={{borderCollapse: 'collapse', width: '100%', borderSpacing: 0}} className='shadow-md mt-2'>
                <thead>
                    <tr style={{backgroundColor: '#F3F4F6', borderBottom: '1px solid #E5E7EB'}}>
                    <th style={{padding: '10px', textAlign: 'left'}}>Date updated</th>
                    {/* <th style={{padding: '10px', textAlign: 'left'}}>User ID</th> */}
                    <th style={{padding: '10px', textAlign: 'left'}}>Feedback details</th>
                    <th style={{padding: '10px', textAlign: 'left'}}>Number of likes</th>
                    <th style={{padding: '10px', textAlign: 'left'}}>Number of dislikes</th>
                    <th style={{padding: '10px', textAlign: 'left'}}>Remove</th>
                    </tr>
                </thead>
                <tbody>
                {feedbacks.map((feedback) => (
                    <tr style={{backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB'}} key={feedback._id}>
                    <td style={{padding: '10px'}}>{new Date(feedback.updatedAt).toLocaleDateString()}</td>
                    {/* <td style={{padding: '10px', fontWeight: 'bold', color: '#4B5563'}}>{feedbackCustomer.cus_username}</td> */}
                    <td style={{padding: '10px'}}>{feedback.cus_feedback}</td>
                    <td style={{padding: '10px'}}>
                        <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                            {feedback.numberOfLikes}
                            <FaThumbsUp className='text-sm mt-1 text-green-400'/>
                        </div>
                    </td>
                    <td style={{padding: '10px'}}>
                        <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                            {feedback.numberOfDislikes}
                            <FaThumbsDown className='text-sm mt-1 text-red-400'/>
                        </div>
                    </td>
                    <td style={{padding: '10px'}}>
                        <span onClick={() => {
                            setShowModel(true);
                            setFeedbackIdToDelete(feedback._id);
                            }} style={{fontWeight: 'bold', color: '#EF4444', cursor: 'pointer'}} className='hover:underline'>
                            Delete
                         </span>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>)}
            {searchData.searchTerm && (
                <table style={{borderCollapse: 'collapse', width: '100%', borderSpacing: 0}} className='shadow-md mt-2'>
                <thead>
                    <tr style={{backgroundColor: '#F3F4F6', borderBottom: '1px solid #E5E7EB'}}>
                        <th style={{padding: '10px', textAlign: 'left'}}>Date updated</th>
                        <th style={{padding: '10px', textAlign: 'left'}}>User ID</th>
                        <th style={{padding: '10px', textAlign: 'left'}}>Feedback details</th>
                        <th style={{padding: '10px', textAlign: 'left'}}>Number of likes</th>
                        <th style={{padding: '10px', textAlign: 'left'}}>Number of dislikes</th>
                        <th style={{padding: '10px', textAlign: 'left'}}>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map((feedback) => (
                        <tr style={{backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB'}} key={feedback._id}>
                            <td style={{padding: '10px'}}>{new Date(feedback.updatedAt).toLocaleDateString()}</td>
                            <td style={{padding: '10px', fontWeight: 'bold', color: '#4B5563'}}>{feedback.cus_id}</td>
                            <td style={{padding: '10px'}}>{feedback.cus_feedback}</td>
                            <td style={{padding: '10px'}}>
                                <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                                    {feedback.numberOfLikes}
                                    <FaThumbsUp className='text-sm mt-1 text-green-400'/>
                                </div>
                            </td>
                            <td style={{padding: '10px'}}>
                                <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                                    {feedback.numberOfDislikes}
                                    <FaThumbsDown className='text-sm mt-1 text-red-400'/>
                                </div>
                            </td>
                            <td style={{padding: '10px'}}>
                                <span onClick={() => {
                                    setShowModel(true);
                                    setFeedbackIdToDelete(feedback._id);
                                }} style={{fontWeight: 'bold', color: '#EF4444', cursor: 'pointer'}} className='hover:underline'>
                                    Delete
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
            {
                showMore && (
                    <button onClick={handleShowMore} className='w-full text-teal-500 self-center tect-sm py-7'>Show more</button>
                )
            }
        </>
      ) : (
        <p>No feedbacks available in the system.</p>
      )}
      <Modal
        show={showModel}
        onClose={() => setShowModel(false)}>
            <Modal.Header/>
            <Modal.Body>
                <div className='text-center'>
                    <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 mb-4 mx-auto'/>
                    <h3 className='mb-5 text-lg text-gray-500 '>Are you sure you want to delete this feedback?</h3>
                    <div className='flex justify-center gap-4'>
                        <Button color='failure' onClick={handleRemoveFeedbacks}>Yes, I'm sure</Button>
                        <Button color='gray' onClick={() => setShowModel(false)}>Cancel</Button>
                    </div>
                </div>
            </Modal.Body>
      </Modal>
    </div>
  )
}
