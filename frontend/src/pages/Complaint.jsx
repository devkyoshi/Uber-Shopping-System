import React,{useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import axios  from 'axios'
import {Button} from '@material-tailwind/react'

export default function Complaint(){
    const userId = useSelector((state) => state.userId);
    const [complaints,setComplaints] = useState([]);

    
    return(
        <div className='inner-layout'>
            <div className='bg-gray-700 text-white py-4 px-6 rounded-lg shadow-md'>
                <h3 className='text-xl font-semibold'>Complaints</h3>
            </div>
            <div className='flex justify-end mt-4'>
            <Button color='gray' ripple="light">New Complaint</Button>
            </div>
        </div>
    )
}