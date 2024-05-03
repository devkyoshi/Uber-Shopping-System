import React,{useState,useEffect } from 'react';
import { SideBar } from '../../components/SideBar';
import { Button } from '@material-tailwind/react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function ComplaintForm(){

    // Initialize useNavigate hook
    const navigate = useNavigate(); 

    // State variables to manage form data and image preview
    const [formData, setFormData] = useState({
        customer_id: '',
        order_id: '',
        payment_id: '',
        complaint_type: '',
        item_id: '',
        resolving_option: '', 
        complaint_img: '',
        quantity: '',
        description:''
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const {currentCustomer} = useSelector((state)=>state.customer)
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
      setFormData({ ...formData, customer_id: currentCustomer._id});
  }, [currentCustomer]);

    // Function to handle changes in form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to handle file input change and display image preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, complaint_img: file });

        //Display image preview
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          setUploading(true);
  
          const formDataToSend = new FormData();
          formDataToSend.append('customer_id', currentCustomer._id);
          formDataToSend.append('order_id', formData.order_id);
          formDataToSend.append('payment_id', formData.payment_id);
          formDataToSend.append('complaint_type', formData.complaint_type);
          formDataToSend.append('item_id', formData.item_id);
          formDataToSend.append('resolving_option', formData.resolving_option);
          formDataToSend.append('complaint_img', formData.complaint_img);
          formDataToSend.append('quantity', formData.quantity);
          formDataToSend.append('description', formData.description);
  
          const response = await axios.post('http://localhost:8070/Complaint/complaint-add', formDataToSend, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              },
          });
  
          console.log(response.data); // Log the response to see what it contains
  
          if (response.status === 200) { // Check status code directly
              setSuccessMessage(response.data); // Set success message
              setErrorMessage(''); // Clear error message
              navigate(`/complaint`); // Navigate to complaint page
          } else {
              setSuccessMessage(''); // Clear success message
              setErrorMessage(response.data.error); // Set error message from response
          }
      } catch (error) {
          console.error('Error submitting complaint:', error);
          setErrorMessage('An error occurred while submitting the complaint.');
          setSuccessMessage('');
      } finally {
          setUploading(false); // Reset uploading state after submission
      }
  };
  


    return(
        <div className='main-layout'>
          <SideBar/>
            <div className='inner-layout'>
              <h1 className="text-4xl font-semibold mb-4 ml-3 ">Complaint Form</h1>
                <div className=" container mx-auto mt-5 bg-gray-100 rounded-lg border border-gray-300">
                <br/>
                  <form onSubmit={handleSubmit} className=" max-w-screen-md mx-auto w-full ">
                    <div className="grid grid-cols-2 gap-7 mb-3">
                      <div>
                        <div className="mb-3">
                        <label htmlFor="orderId" className="block mb-2 font-bold">Order ID:</label>
                        <input type="text" id="orderId" name="order_id" value={formData.order_id} onChange={handleChange} className="w-full p-1 bg-red-45 border border-gray-400 rounded-md" required />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="customerId" className="block mb-2 font-bold">Customer ID:</label>
                        <input type="text" id="customerId" name="customer_id" value={formData.customer_id} onChange={handleChange} className="w-full p-1 border border-gray-400 rounded-md" required readOnly />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="paymentId" className="block mb-2 font-bold">Payment ID:</label>
                        <input type="text" id="paymentId" name="payment_id" value={formData.payment_id} onChange={handleChange} className="w-full p-1 bg-red-45 border border-gray-400 rounded-md" required />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="itemId" className="block mb-2 font-bold">Item ID:</label>
                        <input type="text" id="itemId" name="item_id" value={formData.item_id} onChange={handleChange} className="w-full p-1 border border-gray-400 rounded-md" required />
                        </div>
                      </div>
                    <div >
                    <div className="mb-3">
                       <label htmlFor="complaintType" className="block mb-2 font-bold">Complaint Type:</label>
                       <select id="complaintType" name="complaint_type" value={formData.complaint_type} onChange={handleChange} className="w-full p-2 bg-white border border-gray-400 rounded-md" required>
                         <option value="">---Select Complaint Type---</option>
                         <option value="Expired">Item is expired</option>
                         <option value="Damaged">Item is damaged</option>
                         <option value="WrongItem">Not what I ordered</option>
                       </select>
                    </div>
                    <div className="mb-3">
                       <label htmlFor="resolvingOption" className="block mb-2 font-bold">Resolving Option:</label>
                       <select id="resolving_option" name="resolving_option" value={formData.resolving_option} onChange={handleChange} className="w-full p-2 bg-white border border-gray-400 rounded-md" required>
                         <option value="">---Select Resolving Option---</option>
                         <option value="refund">Refund</option>
                         <option value="replacement">Replacement</option>
                       </select>
                    </div>
                    <div className="mb-3">
                       <label htmlFor="quantity" className="block mb-2 font-bold">Quantity :</label>
                       <input type="text" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full p-2 border border-gray-400 rounded-md" required />
                    </div>
                    <div className="mb-3">
                       <label htmlFor="description" className="block mb-2 font-bold">Description :</label>
                       <textarea type="text" id="description" name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border border-gray-400 rounded-md" required />
                    </div>
                    <div className="mb-3">
                       <label htmlFor="complaint_img" className="block mb-2 font-bold">Complaint Image :</label>
                       <input type="file" id="complaint_img" name="complaint_img" onChange={handleFileChange} required />
                       {imagePreview && <img src={imagePreview} alt="Complaint Preview" style={{maxWidth: '50%', marginTop: '10px'}} />}
                    </div>
                    </div>
                    </div>
                    <div className="text-red-800 mb-4">{errorMessage}</div>
                    <div className="text-green-500 mb-4">{successMessage}</div>
                    {/* Button to submit the form */}
                    <Button type="submit" disabled={uploading} className="bg-custom-gradient text-white py-2 px-4 w-30 mt-3 text-base border border-transparent rounded-md hover:bg-custom-gradient transition duration-300">
                            {uploading ? 'Uploading...' : 'Submit'}
                    </Button>
                    
                  </form>
                  <br/>
                </div>
            </div>
        </div>
    )
}