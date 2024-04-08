import React,{useEffect, useState} from 'react'
import axios  from 'axios'
import {useSelector} from 'react-redux'
import {Button} from '@material-tailwind/react'

export default function Complaint(){
    const cusId = useSelector((state) => state.cusId);
    const [complaints,setComplaints] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8070/Complaint/complaint-all`)
        .then(response => {
            setComplaints(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:',error)
        })
    },[]);

    const deleteComplaint = async (id) =>{
        try{
            await axios.delete(`http://localhost:8070/Complaint/complaint-delete/${id}`);
            setComplaints(complaints.filter(complaint => complaint._id !== id));
        }catch(error){
            console.error('Error deleting complaint:',error);
        }
    }

    
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
                {complaints.map((Complaints) => (
                    <li key={Complaints._id} className='mb-2'>
                        <div className='border border-gray-400 bg-gray-300 p-4 rounded-lg items-center justify-between'>
                            <div className='flex'>
                               <strong className='mr-2'>Order ID : </strong>{Complaints.order_id}
                               <strong className='ml-10 mr-2'>Complaint Status : </strong>
                               <strong><div className='border border-gray-300 text-red-800 bg-white px-4 rounded-lg shadow-md'>
                                {Complaints.complaint_status}</div></strong>
                               <div className='ml-auto flex'>
                               <Button color='blue' ripple='light' className='w-30 mr-3 ' size='regular'>Edit</Button>
                               <Button onClick={() => deleteComplaint(Complaints._id)} color='red' ripple='light' className='w-30' size='regular'>Delete</Button>
                               </div>
                           </div>
                           <div className='flex'>
                               <div className='mr-5'>Item ID :  </div>{Complaints.item_id}
                               <div className='ml-10 mr-3'>Quantity : </div>{Complaints.quantity}
                           </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}