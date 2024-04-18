import React, { useEffect, useState } from 'react';
import { SideBar } from '../../components/SideBar'; // Importing SideBar component
import { Button, Card, CardBody, CardFooter, Typography } from '@material-tailwind/react'; // Importing Material Tailwind React components
import axios from 'axios'; // Importing Axios for HTTP requests

export default function ComplaintAdmin() {

  // State to store complaints data
  const [complaints, setComplaints] = useState([]);

  // Function to fetch complaint data from the server
  const fetchComplaintData = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/Complaint/complaint-alladmin`);
      setComplaints(response.data); // Setting complaints data in state
    } catch (error) {
      console.error('Error fetching complaint data:', error);
    }
  };

  useEffect(() => {
    // Fetching complaint data when component mounts
    fetchComplaintData();
  }, []);

  return (
    <div className='main-layout'>
      {/* Rendering SideBar component */}
      <SideBar />
      <div className='inner-layout '>
        <Typography variant="h5" color="blue-gray">
          Recent Complaints
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          These are details about the last complaints
        </Typography>
        <br/>
        <div className="grid grid-cols-1 gap-3">
          {/* Mapping over complaints data and rendering cards for each complaint */}
          {complaints.map((complaint, index) => (
            <Card key={index} className="p-4 bg-gradient-to-r from-pink-50 via-red-50 to-orange-50 border border-gray-300">
              <CardBody>
                <div className="grid grid-cols-3 gap-3">
                  {/* Rendering complaint image */}
                  <div className="flex flex-col items-center">
                    <img
                      src={`http://localhost:8070/${complaint.imageURL}`}
                      alt="Complaint Image"
                      className="rounded-lg w-64 h-auto"
                      onError={(e) => console.error('Error loading image:', e.nativeEvent)} // Error handling for image loading
                    />
                    <Typography color="gray">Complaint image</Typography>
                  </div>
                  {/* Rendering pickup image */}
                  <div className="flex flex-col items-center">
                    <img
                      src={`http://localhost:8070/${complaint.imageURL}`}
                      alt="Pickup Image"
                      className="rounded-lg w-64 h-auto"
                      onError={(e) => console.error('Error loading image:', e.nativeEvent)} // Error handling for image loading
                    />
                    <Typography color="gray">Pickup image</Typography>
                  </div>
                  {/* Rendering delivery image */}
                  <div className="flex flex-col items-center">
                    <img
                      src={`http://localhost:8070/${complaint.imageURL}`}
                      alt="Delivery Image"
                      className="rounded-lg w-64 h-auto"
                      onError={(e) => console.error('Error loading image:', e.nativeEvent)} // Error handling for image loading
                    />
                    <Typography color="gray">Delivery image</Typography>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                {/* Rendering details for the complaint */}
                <div className="grid grid-cols-2 gap-3 mb-3 justify-center">
                  <div className="flex flex-col items-center">
                    <Typography color="gray">Order ID: <scan>{complaint.order_id}</scan></Typography>
                    <Typography color="gray">Item ID : <scan>{complaint.item_id}</scan></Typography>
                  </div>
                  <div className="flex flex-col items-center">
                    <Typography color="gray">Customer ID: <scan>{complaint.customer_id}</scan></Typography>
                    <Typography color="gray">Payment ID : <scan>{complaint.payment_id}</scan></Typography>
                  </div>
                </div>
                <div className="flex flex-wrap justify-start mb-5 gap-10">
                  <Typography color="gray">{complaint.description}</Typography>
                </div>
                <div className="flex justify-end">
                  {/* Rendering buttons based on resolving_option */}
                  {complaint.resolving_option==='refund' && (<Button color='blue-gray' className='w-30 mr-3 mt-3 text-base py-2 border border-transparent'>Refund</Button>)}
                  {complaint.resolving_option==='replacement' && (<Button color='blue-gray' className='w-30 mr-3 mt-3 text-base py-2 border border-transparent'>Order</Button>)}
                  <Button className='bg-red-900 w-30 mr-3 mt-3 text-base py-2 border border-transparent'>Ignore</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
