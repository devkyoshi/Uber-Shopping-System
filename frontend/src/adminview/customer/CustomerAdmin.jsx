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
          const res = await fetch('/customer/getusers?limit=4')
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
          const res = await fetch(`/Feedback/getFeedback?limit=4`)
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
      <div className='flex-wrap flex gap-10 justify-center mt-5'>
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
      <div className='flex flex-wrap gap-10 mt-5 py-3 mx-auto justify-center'>
        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent Users</h1>
            {/* <Button outline gradientDuoTone='pinkToOrange'><Link to={'/AdminLogin?tab=showfeedbacks'}>See all</Link></Button> */}
            <Link to={'/AdminLogin?tab=showfeedbacks'}><button 
              type='submit'  
              style={{
                padding: '0.5rem 1rem',
                fontSize: '1rem',
                borderRadius: '0.375rem',
                color: 'linear-gradient(90deg, #EC4899, #FFB037)',
                background: 'transparent',
                border: '1px solid #EC4899',
                outline: 'none',
              }}
              onMouseEnter={(e) => { 
                e.target.style.background = 'linear-gradient(90deg, #EC4899, #FFB037)';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => { 
                e.target.style.background = 'transparent';
                e.target.style.color = 'black';
              }}>
                See all
          </button></Link>
          </div>
          <table className='shadow-md' style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
            <tr style={{backgroundColor: '#F3F4F6'}}>
                <th style={{padding: '12px'}}>User image</th>
                <th style={{padding: '12px'}}>Username</th>
            </tr>
        </thead>
        <tbody>
            {customers && customers.map((customer, index) => (
                <tr style={{backgroundColor: '#FFFFFF'}} key={customer._id}>
                    <td style={{padding: '12px'}}>
                        <img src='https://th.bing.com/th/id/OIP.eU8MYLNMRBadK-YgTT6FJQHaHw?rs=1&pid=ImgDetMain' alt='user' style={{width: '40px', height: '30px', borderRadius: '50%', objectFit: 'cover', backgroundColor: '#D1D5DB'}} />
                    </td>
                    <td style={{padding: '12px', fontWeight: 'bold', color: '#4B5563'}}>
                        {customer.cus_username}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
          {/*<Table hoverable> 
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
          </Table>*/}
        </div>

        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent Feedbacks</h1>
            {/* <Button outline gradientDuoTone='pinkToOrange'><Link to={'/AdminLogin?tab=showfeedbacks'}>See all</Link></Button> */}
            <Link to={'/AdminLogin?tab=showfeedbacks'}><button 
              type='submit'  
              style={{
                padding: '0.5rem 1rem',
                fontSize: '1rem',
                borderRadius: '0.375rem',
                color: 'linear-gradient(90deg, #EC4899, #FFB037)',
                background: 'transparent',
                border: '1px solid #EC4899',
                outline: 'none',
              }}
              onMouseEnter={(e) => { 
                e.target.style.background = 'linear-gradient(90deg, #EC4899, #FFB037)';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => { 
                e.target.style.background = 'transparent';
                e.target.style.color = 'black';
              }}>
                See all
          </button></Link>
          </div>
          {/* <Table hoverable> 
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
          </Table> */}
          <table className='shadow-md' style={{borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{backgroundColor: '#F3F4F6'}}>
                <th style={{padding: '12px', textAlign: 'left'}}>Feedback</th>
                <th style={{padding: '12px'}}>Likes</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks && feedbacks.map((feedback) => (
                <tr style={{backgroundColor: '#FFFFFF'}} key={feedback._id}>
                  <td style={{padding: '12px', width: '400px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
                      {feedback.cus_feedback}
                  </td>
                  <td style={{padding: '12px', display: 'flex', alignItems: 'center', gap: '4px'}}>
                    {feedback.numberOfLikes}
                    <FaThumbsUp style={{fontSize: '0.875rem', marginBottom: '0.2rem', color: '#22C55E'}} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}
