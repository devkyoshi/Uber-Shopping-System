import React,{useEffect, useState} from 'react'
import { SideBar } from '../../components/SideBar'
import {Typography} from '@material-tailwind/react'
import axios from 'axios'


export default function ComplaintAdmin(){

    const [complaints,setComplaints] = useState([]);

    const fetchComplaintData = async () =>{
      try {
        const response = await axios.get(`http://localhost:8070/Complaint/complaint-alladmin`);
        setComplaints(response.data)
        
      } catch (error) {
        console.error('Error fetching complaint data:', error);
        
      }

    }

    useEffect(() =>{
        fetchComplaintData();
    },[])

    return(
        <div className='main-layout'>
            <SideBar/>
            <div className='inner-layout'>
            <Typography variant="h5" color="blue-gray">
              Recent Complaints
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the last complaints
            </Typography>

            <table className="table-fixed w-full mt-4">
          <thead>
            <tr>
              
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td className="border border-blue-500 px-4 py-2">{complaint.complaint_img}</td>
                <td className="border border-blue-500 px-4 py-2">{complaint.order_id}</td>
                <td className="border border-blue-500 px-4 py-2">{complaint.payment_id}</td>
                {/* Add more table cells for other complaint details */}
              </tr>
            ))}
          </tbody>
        </table>

            </div>

        </div>
    )
}