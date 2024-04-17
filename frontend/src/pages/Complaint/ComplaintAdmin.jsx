import React, { useEffect, useState } from 'react';
import { SideBar } from '../../components/SideBar';
import { Button, Card, Typography } from '@material-tailwind/react';
import axios from 'axios';

export default function ComplaintAdmin() {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaintData = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/Complaint/complaint-alladmin`);
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaint data:', error);
    }
  };

  useEffect(() => {
    fetchComplaintData();
  }, []);

  return (
    <div className='main-layout'>
      <SideBar />
      <div className='inner-layout'>
        <Typography variant="h5" color="blue-gray">
          Recent Complaints
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          These are details about the last complaints
        </Typography>
        <br/>
        <div className="grid grid-cols-1 gap-4">
        {complaints.map((complaint, index) => (
          <Card key={index} className=" p-4">
            <div className="flex justify-center gap-4 bg-pink" >
              <img
                src={`http://localhost:8070/${complaint.imageURL}`}
                alt="Complaint Image"
                className="mb-4 rounded-lg w-64 h-auto"
                onError={(e) => console.error('Error loading image:', e.nativeEvent)} // Error handling for image loading
              />
              <img
                src={`http://localhost:8070/${complaint.imageURL}`}
                alt="Complaint Image"
                className="mb-4 rounded-lg w-64 h-auto"
                onError={(e) => console.error('Error loading image:', e.nativeEvent)} // Error handling for image loading
              />
              <img
                src={`http://localhost:8070/${complaint.imageURL}`}
                alt="Complaint Image"
                className="mb-4 rounded-lg w-64 h-auto"
                onError={(e) => console.error('Error loading image:', e.nativeEvent)} // Error handling for image loading
              />
            </div>
            <div className="text-center mb-4">
                <Typography color="gray">Order ID: {complaint.order_id}</Typography>
                <Typography color="gray">Item ID: {complaint.item_id}</Typography>
              </div>
            <div className="flex justify-center">
              <Button className='mr-5'>Refund</Button>
              <Button>Ignore</Button>
            </div>
          </Card>
        ))}
       </div>
      </div>
    </div>
  );
}

