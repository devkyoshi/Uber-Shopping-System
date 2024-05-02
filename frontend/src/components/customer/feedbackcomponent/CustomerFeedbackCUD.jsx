import { Alert, Button, Modal, Spinner, Textarea } from 'flowbite-react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Feedback from './CustomerFeedbackRead'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import ShowCustomerFeedbacks from '../../../adminview/customer/ShowCustomerFeedbacks'

export default function CustomerFeedbackPortal() {
    const { currentCustomer } = useSelector(state => state.customer)
    const [feedback, setFeedback] = useState('');
    const [feedbacks, setFeedbacks] = useState([]);
    const [errorMessage,setErrorMesseage] = useState(null);
    const [submitFeedbackSuccess,setsubmitFeedbackSuccess] = useState(false);
    const [showModal,setShowModal] = useState(false);
    const [showMore,setShowMore] = useState(true);
    const [feedbackToDelete,setFeedbackToDelete] = useState(null);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        setsubmitFeedbackSuccess(null);
        setErrorMesseage(null);
        e.preventDefault();
        if (!feedback){
            setErrorMesseage('Please enter a feedback to submit.');
            setLoading(false);
            return;
        }
        else if(feedback.length > 400){
            setErrorMesseage('Your feedback is too long.');
            setLoading(false);
            return;
        }
        try {
            const res = await fetch('/Feedback/submitFeedback',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cus_feedback: feedback, cus_id: currentCustomer._id}),
            });
            const data = await res.json();
            if(res.ok) {
                setFeedback('');
                setsubmitFeedbackSuccess('You feedback has been submitted successfully');
                setFeedbacks([data, ...feedbacks]);
                setLoading(false);
            }
        } catch (error) {
            setErrorMesseage(error.message);
            setLoading(false);
        }
    };

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

    useEffect(() => {
        let errorMessageTimer;
        let submitFeedbackSuccessTimer;
    
        if (errorMessage) {
            errorMessageTimer = setTimeout(() => {
                setErrorMesseage(null);
            }, 3000); 
        }
    
        if (submitFeedbackSuccess) {
            submitFeedbackSuccessTimer = setTimeout(() => {
                setsubmitFeedbackSuccess(null);
            }, 3000); 
        }
    
        return () => {
            clearTimeout(errorMessageTimer);
            clearTimeout(submitFeedbackSuccessTimer);
        };
    }, [errorMessage, submitFeedbackSuccess]);

    useEffect(() => {
        const getfeedbacks = async () => {
            try {
                const res = await fetch('/Feedback/getFeedback');
                const data = await res.json();
                if(res.ok){
                    setFeedbacks(data.cus_feedback);
                    if(data.cus_feedback.length < 9){
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        getfeedbacks();
    },[currentCustomer._id])

    const handleLike = async (feedback_ID) => {
        if(!currentCustomer){
            navigate('/Customerlogin')
            return;
        }
        try {
            const res = await fetch(`/Feedback/likeFeedback/${feedback_ID}`,
        {
            method: 'PUT'
        })
        if(res.ok){
            const data = await res.json();
            setFeedbacks(feedbacks.map((feedback) => 
                feedback._id === feedback_ID ? {
                    ...feedback,
                    likes: data.likes,
                    numberOfLikes: data.likes.length,
                    dislikes: data.dislikes,
                    numberOfDislikes: data.dislikes.length,
                } : feedback
            ));
        }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDislike = async (feedback_ID) => {
        try {
            if(!currentCustomer){
                return;
            }
            const res = await fetch(`/Feedback/dislikeFeedback/${feedback_ID}`,
        {
            method: 'PUT'
        })
        if(res.ok){
            const data = await res.json();
            setFeedbacks(feedbacks.map((feedback) => 
                feedback._id === feedback_ID ? {
                    ...feedback,
                    likes: data.likes,
                    numberOfLikes: data.likes.length,
                    dislikes: data.dislikes,
                    numberOfDislikes: data.dislikes.length,
                } : feedback
            ));
        }
        } catch (error) {
            console.log(error.message);
        }
    };

    const changeFeedback = async (feedback, editFeedback) => {
        setFeedbacks(
            feedbacks.map((f) => 
                f._id === feedback._id ? {...f, cus_feedback: editFeedback} : f
            )
        );
    };

    const handleDelete = async (feedback_ID) => {
        try {
            if(!currentCustomer){
                navigate('/Customerlogin');
                return;
            }
            const res = await fetch(`/Feedback/deleteFeedback/${feedback_ID}`,{method: 'DELETE'});
            if(res.ok){
                const data = await res.json();
                setFeedbacks(feedbacks.filter((feedback) => feedback._id !== feedback_ID));
                setShowModal(false);
                if(data.cus_feedback.length < 9){setShowMore(false);}         
            }
        } catch (error) {
            console.log(error.message);
        }
    };

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
        <h1 className="text-4xl font-bold text-center mt-5 mb-11">Give Us Your Feedback</h1>
        {currentCustomer ? 
        (
            <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                <p>Signed in as:</p>
                <img className='h-5 w-5 rounded-full object-cover' src='https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png' alt=''/>
                <Link to={'/Customerprofile?tab=profile'} className='text-xs text-cyan-600 hover:underline'>
                    @{currentCustomer.cus_username}
                </Link>
            </div>
        ): 
        (
            <div className='flex gap-1 text-sm text-teal-500 my-5'>
                You must be signed in to give feedbacks.
                <Link className='text-blue-500 hover:underline' to={'/Customerlogin'}>Login</Link>
            </div>
        )}
        { currentCustomer&&
            (<form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3'>
                <Textarea 
                    placeholder='Add a feedback...'
                    rows='5'
                    maxLength='400'
                    onChange={(e) => setFeedback(e.target.value)}
                    value={feedback}
                />
                <div className='flex justify-between items-center mt-5'>
                    <p className='text-gray-500 text-sm'>{400-feedback.length} characters remaining</p>
                    {/* <Button outline gradientDuoTone='pinkToOrange' type='submit' disabled={loading}>{
                        loading ? (
                        <><Spinner size='sm'/><span className='pl-3'>Loading...</span></>
                        ) : 'Submit'
                        }
                    </Button> */}
                    <button 
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
                        {loading ? 'Loading...' : 'Submit'}
                    </button>
                </div>  
            </form>)
        }
        {feedbacks.length === 0 ? (
            <p className='text-sm my-5'>No feedbacks yet!</p>
        ): (
            <>
                <div className='text-sm my-5 flex items-center gap-2'>
                    <p>Feedbacks</p>
                    <div>
                        <p className='border border-gray-500 py-1 px-2 rounded-sm'>{feedbacks.length}</p>
                    </div>
                </div>
                
                {
                    feedbacks.map(feedback => (<Feedback key={feedback._id} feedback={feedback} onLike={handleLike} onDislike={handleDislike} onEdit={changeFeedback} 
                        onDelete={(feedback_ID) => {
                            setShowModal(true);
                            setFeedbackToDelete(feedback_ID);
                        }}/>))
                }
            </>
        )}
        {errorMessage && 
            (<Alert className='mt-5' color='failure'>
                {errorMessage}
            </Alert>)
        }
        {submitFeedbackSuccess && (
        <Alert color='success' className='mt-5'> {submitFeedbackSuccess} </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        >
            <Modal.Header/>
            <Modal.Body>
                <div className='text-center'>
                    <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 mb-4 mx-auto'/>
                    <h3 className='mb-5 text-lg text-gray-500 '>Are you sure you want to delete this feedback?</h3>
                    <div className='flex justify-center gap-4'>
                        <Button color='failure' onClick={() => handleDelete(feedbackToDelete)}>Yes, I'm sure</Button>
                        <Button color='gray' onClick={() => setShowModal(false)}>Cancel</Button>
                    </div>
                </div>
            </Modal.Body>
      </Modal>
      {
            showMore && (
                <button onClick={handleShowMore} className='w-full text-teal-500 self-center tect-sm py-7'>Show more</button>
            )
      }
    </div>
  )
}
