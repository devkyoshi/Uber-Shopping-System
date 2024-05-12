
import React,{useState,useEffect } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import DashSidebar from '../../components/DashSidebar';

export default function DriverComplaintForm() {

 // Initialize useNavigate hook
 const navigate = useNavigate(); 

 // State variables to manage form data and image preview
 const [formData, setFormData] = useState({
     driver_id: '',
     market_name: '',
     district: '',
     branch: '',
     issue_type: '',
     resolving_option: '', 
     complaint_img: '',
     quantity: '',
     description:''
 });

 return(
  <div  className="min-h-screen flex flex-col md:flex-row">
  <div className='md:w-56' >
   <DashSidebar/>
   </div>
    <div className="inner-layout mt-5 ml-2 mr-5">
      issuegvhvjhbjhbj
    
    </div>
    </div>
 )

}
