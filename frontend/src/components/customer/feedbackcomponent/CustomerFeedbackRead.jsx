import React, { useState } from 'react'
import { useEffect } from 'react'
import moment from 'moment'
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Button, Textarea } from 'flowbite-react'

export default function Feedback({ feedback, onLike, onDislike, onEdit, onDelete }) {
    const { currentCustomer } = useSelector((state) => state.customer)
    const [feedbackCustomer,setfeedbackCustomer] = useState({});
    const [editedFeedback,setEditedFeedback] = useState(feedback.cus_feedback);
    const [editing,setEditing] = useState(false);
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/Feedback/${feedback.cus_id}`);
                const data = await res.json();
                if(res.ok){
                    setfeedbackCustomer(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getUser();
    },[feedback]);

    const handleEdit = (() => {
        setEditing(true);
        setEditedFeedback(feedback.cus_feedback);
    });

    const handleSave = async () => {
        try {
            const res = await fetch(`/Feedback/editFeedback/${feedback._id}`,{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    content: editedFeedback
                })
            });
            if(res.ok){
                setEditing(false);
                onEdit(feedback, editedFeedback);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
  return (
    <div className='flex p-4 border-b text-sm'>
        <div className='flex-shrink-0 mr-3'>
            <img className='w-10 h-10 rounded-full bg-gray-200' src='https://th.bing.com/th/id/OIP.eU8MYLNMRBadK-YgTT6FJQHaHw?rs=1&pid=ImgDetMain' alt={currentCustomer.cus_username}></img>
        </div>
        <div className='flex-1'>
            <div className='flex items-center mb-1'>
                <span className='font-bold mr-1 text-xs truncate'>{feedbackCustomer ? `@${feedbackCustomer.cus_username}` : 'anonymous user'}</span>
                <span className='text-gray-500 text-xs'>{moment(feedback.createdAt).fromNow()}</span>
            </div>
            {editing ? (
                <>
                    <Textarea className='mb-2'
                        value={editedFeedback}
                        onChange={(e) => setEditedFeedback(e.target.value)}
                     />
                     <div className='flex justify-end gap-2 text-xs'>
                        <Button type='button' size='sm' gradientDuoTone='pinkToOrange' onClick={handleSave}>
                            Save
                        </Button>
                        <Button type='button' size='sm' gradientDuoTone='pinkToOrange' outline onClick={() => setEditing(false)}>
                            Cancel
                        </Button>
                     </div>
                </>
            ): (
                <>
                    <p className='text-gray-500 mb-2'>{feedback.cus_feedback}</p>
                    <div className='flex items-center pt-2 text-xs border-t max-w-fit gap-2'>
                        <button type='button' onClick={() => onLike(feedback._id)} className={`text-gray-500 hover:text-blue-500 ${currentCustomer && feedback.likes.includes(currentCustomer._id) && !feedback.dislikes.includes(currentCustomer._id) && '!text-blue-500'}`}>
                            <FaThumbsUp className='text-sm'/>
                        </button>
                        <p className='text-gray-400'>{
                            feedback.numberOfLikes > 0 && feedback.numberOfLikes + " " + (feedback.numberOfLikes === 1 ? "Like" : "Likes")
                        }</p>
                        <button type='button' onClick={() => onDislike(feedback._id)} className={`text-gray-500 hover:text-red-500 ${currentCustomer && feedback.dislikes.includes(currentCustomer._id) && !feedback.likes.includes(currentCustomer._id) && '!text-red-500'}`}>
                            <FaThumbsDown className='text-sm'/>
                        </button>
                        <p className='text-gray-400'>{
                            feedback.numberOfDislikes > 0 && feedback.numberOfDislikes + " " + (feedback.numberOfDislikes === 1 ? "Disike" : "Dislikes")
                        }</p>
                        {
                            currentCustomer && (currentCustomer._id === feedback.cus_id || currentCustomer.adminType === 'customer') && (
                            <><button type='button' onClick={handleEdit} className='text-gray-400 hover:text-blue-500'>
                                Edit
                            </button>
                            <button type='button' onClick={() => onDelete(feedback._id)} className='text-gray-400 hover:text-red-500'>
                                Delete
                            </button></>)
                        }
                    </div>
                </>
            )
            }
        </div>
    </div>
  )
}
