import { Button, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { FaThumbsUp } from 'react-icons/fa';
import { HiAnnotation, HiArrowNarrowUp, HiOutlineUserGroup } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function CustomerAdminProfileDetail() {
  const [customers,setCustomers] = useState([]);
  const [feedbacks,setFeedbacks] = useState([]);
  const [totalCustomers,setTotalCustomers] = useState(0);
  const [totalFeedbacks,setTotalFeedbacks] = useState(0);
  const [lastMonthCustomers,setLastMonthCustomers] = useState(0);
  const [lastMonthFeedbacks,setLastMonthFeedbacks] = useState(0);
  const { currentCustomer } = useSelector((state) => state.customer);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
          const res = await fetch('/customer/getusers?limit=5')
          const data = await res.json()
          if(res.ok){
            setCustomers(data.users);
            setTotalCustomers(data.totalUsers);
            setLastMonthCustomers(data.lastMonthUsers);
          }
      } catch (error) {
          console.log(error.message);
      }
    };

    const fetchFeedbacks = async () => {
      try {
          const res = await fetch(`/Feedback/getFeedback?limit=5`)
          const data = await res.json()
          if(res.ok){
              setFeedbacks(data.cus_feedback);
              setTotalFeedbacks(data.totalFeedbacks);
              setLastMonthFeedbacks(data.lastMonthFeedbacks);
          }
      } catch (error) {
          console.log(error.message);
      }
  };
    if(currentCustomer.adminType === 'customer'){
      fetchUsers();
      fetchFeedbacks();
    }
  }, [currentCustomer])

  return (
    <div className='p-3 md:mx-auto'>
      <div className='flex-wrap flex gap-10 justify-center mt-10'>
      <div className='flex flex-col p-3 gap-4 md:w-96 w-full rounded-md shadow-md'>
        <div className='flex justify-between'>
          <div>
            <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
            <p className='text-2xl'>{totalCustomers}</p>
          </div>
          <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg'/>
        </div>
        <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp/>
              {lastMonthCustomers}
            </span>
            <div className='text-gray-500'>Last Month</div>
          </div>
      </div>
      <div className='flex flex-col p-3 gap-4 md:w-96 w-full rounded-md shadow-md'>
        <div className='flex justify-between'>
          <div>
            <h3 className='text-gray-500 text-md uppercase'>Total Feedbacks</h3>
            <p className='text-2xl'>{totalFeedbacks}</p>
          </div>
          <HiAnnotation className='bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg'/>
        </div>
        <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp/>
              {lastMonthFeedbacks}
            </span>
            <div className='text-gray-500'>Last Month</div>
          </div>
      </div>
      </div>
      <div className='flex flex-wrap gap-10 mt-10 py-3 mx-auto justify-center'>
        <div className='flex flex-col w-full md:w-auto shadow-md p-3 rounded-md'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent Users</h1>
            <Button outline gradientDuoTone='pinkToOrange'><Link to={'/AdminLogin?tab=showusers'}>See all</Link></Button>
          </div>
          <Table hoverable> 
            <Table.Head>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {customers && customers.map((customer) => (
              <Table.Body key={customer._id} className='divide-y'>
                <Table.Row className='bg-white '>
                  <Table.Cell>
                    <img src='https://th.bing.com/th/id/OIP.eU8MYLNMRBadK-YgTT6FJQHaHw?rs=1&pid=ImgDetMain' alt='user' className='bg-gray-500 w-10 h-10 rounded-full'/>
                  </Table.Cell>
                  <Table.Cell>
                    {customer.cus_username}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>
        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent Feedbacks</h1>
            <Button outline gradientDuoTone='pinkToOrange'><Link to={'/AdminLogin?tab=showfeedbacks'}>See all</Link></Button>
          </div>
          <Table hoverable> 
            <Table.Head>
              <Table.HeadCell>Feedback</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            {feedbacks && feedbacks.map((feedback) => (
              <Table.Body key={feedback._id} className='divide-y'>
                <Table.Row className='bg-white '>
                  <Table.Cell className='w-96'>
                    {feedback.cus_feedback}
                  </Table.Cell>
                  <Table.Cell className='flex gap-2'>
                    {feedback.numberOfLikes}
                    <FaThumbsUp className='text-sm mt-0.5 text-green-400'/>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>
      </div>
    </div>
  )
}
