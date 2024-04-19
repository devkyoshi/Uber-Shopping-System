import { Modal, Table, Button } from 'flowbite-react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux'

export default function ShowCustomerFeedbacks() {
    const { currentCustomer } = useSelector((state) => state.customer);
    const [feedbacks,setFeedbacks] = useState([]);
    const [showMore,setShowMore] = useState(true);
    const [showModel,setShowModel] = useState(false);
    const [feedbackIdToDelete,setFeedbackIdToDelete] = useState('');

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

    const handleShowMore = async () => {
        const startIndex = feedbacks.length;
        try {
            const res = await fetch(`/Feedback/getFeedback?startIndex=${startIndex}`);
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
    return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 mt-5'>
      {currentCustomer.adminType === 'customer' && feedbacks.length > 0 ? (
        <>
            <Table hoverable className='shadow-md'>
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
            </Table>
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
        onClose={() => setShowModel(false)}
        popup
        size='md'>
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
