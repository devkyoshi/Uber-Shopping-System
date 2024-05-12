
import React,{useState,useEffect } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import axios from 'axios'
import {useNavigate,useParams} from 'react-router-dom'
import { useSelector } from 'react-redux';
import DashSidebar from '../../components/DashSidebar';
import { Textarea ,TextInput, Label } from "flowbite-react";

 export default function DriverComplaintForm() {

  const {item_name,sm_name} = useParams();

 // Initialize useNavigate hook
 const navigate = useNavigate(); 

 // State variables to manage form data and image preview
 const [formData, setFormData] = useState({
     driver_id: '',
     market_name: '',
     sm_location:'',
     sm_latitude:'',
     sm_longitude: '',
     issue_type: '',
     description:''
 });


    const [uploading, setUploading] = useState(false);
    const {currentCustomer} = useSelector((state)=>state.customer)
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
      setFormData({ ...formData, market_name:sm_name, item_name:item_name});
  });

     // Function to handle changes in form inputs
     const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
 const handleSubmit = async (e) => {

    // Prevent default form submission behavior
    e.preventDefault();

    // Validate form inputs before submission
    if (!isValidForm()) return;

    try {
        // Set uploading state to true during form submission
        setUploading(true);

        // Prepare form data for submission
        const formDataToSend = new FormData();
        formDataToSend.append('driver_id', currentCustomer._id);
        formDataToSend.append('market_name', formData.market_name);
        formDataToSend.append('sm_location', formData.sm_location);
        formDataToSend.append('sm_latitude', formData.sm_latitude);
        formDataToSend.append('sm_longitude', formData.sm_longitude);
        formDataToSend.append('issue_type', formData.issue_type);
        formDataToSend.append('item_name', formData.item_name);
        formDataToSend.append('description', formData.description);


        // Send form data to server
        const response = await axios.post('http://localhost:8070/Report/quality-report-add', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });

        // Display success message upon successful submission
        setSuccessMessage(response.data.message);

         // Redirect user to complaint page after submission
        navigate('/complaint')

        
    } catch (error) {
      // Handle errors during form submission
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An error occurred, please try again later.');
      }
    } finally {
        setUploading(false); // Reset uploading state after submission
    }
};

 return(
     <div  className="min-h-screen flex flex-col md:flex-row">
        <div className='md:w-56' >
         <DashSidebar/>
        </div>
        <div className="inner-layout mt-5 ml-2 mr-5">
          <Typography
           variant="h1"
           className="mt-2 text-center font-semibold text-3xl mb-20"
          >
          Report Issue
         </Typography>
        <form onSubmit={handleSubmit} className=" flex flex-col mb-2 gap-4 ">
        <div className="flex flex-row gap-7 ml-5 mr-5">
        <div className="flex flex-col flex-1 gap-2">
        <div>
          <Label htmlFor="customerId" className="block mb-2 font-bold">Driver Name:</Label>
          <TextInput type="text" id="customerId" name="driver_id" value={formData.driver_id} onChange={handleChange} className="w-full p-1" required readOnly />
        </div>
        <div>
          <Label htmlFor="itemName" className="block mb-2 font-bold">Item Name:</Label>
          <TextInput type="text" id="itemName" name="issue_type" value={formData.item_name} onChange={handleChange} className="w-full p-1" required readOnly />
        </div>
        <div>
          <Label htmlFor="issueType" className="block mb-2 font-bold">Issue Type:</Label>
          <TextInput type="text" id="issueType" name="issue_type" value={formData.issue_type} onChange={handleChange} className="w-full p-1" required readOnly />
        </div>
        <div>
          <Label htmlFor="supmarketDescription" className="block mb-2 font-bold">Description:</Label>
          <Textarea type="text" id="supmarketDescription" name="description" value={formData.description} onChange={handleChange} className="w-full p-2 " required readOnly />
        </div>
        
        </div>
        <div className="flex flex-col flex-1 gap-2">
        <div>
          <Label htmlFor="supmarketName" className="block mb-2 font-bold">Supmarket Name:</Label>
          <TextInput type="text" id="supmarketName" name="market_name" value={formData.market_name} onChange={handleChange} className="w-full p-1 " required readOnly />
        </div>
        <div>
          <Label htmlFor="supmarketLocation" className="block mb-2 font-bold">Supmarket Location:</Label>
          <TextInput type="text" id="supmarketLocation" name="sm_location" value={formData.sm_location} onChange={handleChange} className="w-full p-1" required readOnly />
        </div>
        <div className="grid grid-cols-2 flex-1 gap-2">
        <div>
          <Label htmlFor="supmarketLatitude" className="block mb-2 font-bold">Supmarket Latitude:</Label>
          <TextInput type="text" id="supmarketLatitude" name="sm_latitude" value={formData.sm_latitude} onChange={handleChange} className="w-full p-1" required readOnly />
        </div>
        <div >
          <Label htmlFor="supmarketLongitude" className="block mb-2 font-bold">Supmarket Longitude:</Label>
          <TextInput type="text" id="supmarketLongitude" name="sm_longitude" value={formData.sm_longitude} onChange={handleChange} className="w-full p-1" required readOnly />
        </div>
        </div>
        </div>
        
        </div>

        <Button size="sm" type="submit" disabled={uploading} className="bg-custom-gradient w-40 h-10 mx-auto mt-5 text-white py-2 px-4  border border-transparent rounded-md hover:bg-custom-gradient transition duration-300">
            {uploading ? 'Uploading...' : 'Submit'}
       </Button>
        </form>
    
        </div>
    </div>
 )

}
