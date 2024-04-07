import React,{useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import axios  from 'axios'
import {Button} from '@material-tailwind/react'

export default function Complaint(){
    const userId = useSelector((state) => state.userId);
    const [complaints,setComplaints] = useState([]);

    const previousComplaints = [
        {id:1,order_id:'666789898989asdf',complaint_status:'Pending',item_id:'666789898989asdf'},
        {id:2,order_id:'666789898989asdf',complaint_status:'Pending',item_id:'666789898989asdf'},
        {id:3,order_id:'666789898989asdf',complaint_status:'Pending',item_id:'666789898989asdf'}
    ]

    
    return(
        <div className='inner-layout'>
            <div className='bg-gray-700 text-white py-4 px-6 rounded-lg shadow-md'>
                <h3 className='text-xl font-semibold'>Complaints</h3>
            </div>
            <div className='flex justify-end mt-4'>
            <Button color='gray' ripple="light">New Complaint</Button>
            </div>
            <br/>
            <ul>
                {previousComplaints.map((Complaint) => (
                    <li key={Complaint.id} className='mb-2'>
                        <div className='bg-gray-300 text-gray py-3 px-6 rounded-lg shadow-md'>
                           <div className='flex'>
                               <strong className='mr-2'>Order ID : </strong>{Complaint.order_id}
                               <strong className='ml-10 mr-2'>Complaint Status : </strong>
                               <strong><div className='text-red-800'>{Complaint.complaint_status}</div></strong>
                               <div className='ml-auto flex'>
                               <Button color='blue' ripple='light' className='w-30 mr-3 ' size='regular'>Edit</Button>
                               <Button color='red' ripple='light' className='w-30' size='regular'>Delete</Button>
                               </div>
                           </div>
                           <strong className='mr-2'>Item ID : </strong>{Complaint.item_id}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}