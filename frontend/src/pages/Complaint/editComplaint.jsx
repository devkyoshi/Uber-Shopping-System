import React,{useState,useEffect} from 'react';
import { SideBar } from '../../components/SideBar';
import { Button } from '@material-tailwind/react';
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'

export default function editComplaint(){

    const {complaintId} = useParams();

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
    const [imageURL, setImageURL] = useState('');
    

    useEffect(() => {
        fetchComplaintData(); // Fetch complaint data when component mounts
    }, []);

    const fetchComplaintData = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/Complaint/complaint/${complaintId}`);

            // Set the fetched complaint data into the form data state
            
            const fetchedComplaint = response.data;
            setFormData({
                customer_id:fetchedComplaint.customer_id,
                order_id: fetchedComplaint.order_id,
                payment_id: fetchedComplaint.payment_id,
                complaint_type: fetchedComplaint.complaint_type,
                item_id: fetchedComplaint.item_id,
                resolving_option: fetchedComplaint.resolving_option, 
                complaint_img: fetchedComplaint.complaint_img,
                quantity: fetchedComplaint.quantity,
                description: fetchedComplaint.description,
            })

            const imageURL = `http://localhost:8070/${fetchedComplaint.imageURL}`;
            setImageURL(imageURL);
            
            
        } catch (error) {
            console.error('Error fetching complaint data:', error);
        }
    };

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

         //Each attribute of the complaint form is stored as a key-value pair in this object.
         // Construct FormData object to send form data to the server
          const formDataToSend = new FormData();
          formDataToSend.append('customer_id', formData.customer_id);
          formDataToSend.append('order_id', formData.order_id);
          formDataToSend.append('payment_id', formData.payment_id);
          formDataToSend.append('complaint_type', formData.complaint_type);
          formDataToSend.append('item_id', formData.item_id);
          formDataToSend.append('resolving_option', formData.resolving_option);
          formDataToSend.append('complaint_img', formData.complaint_img);
          formDataToSend.append('quantity', formData.quantity);
          formDataToSend.append('description', formData.description);

          console.log(formDataToSend)
          
          const response = await axios.put(`http://localhost:8070/Complaint/complaint-update/${complaintId}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Ensure correct content type for FormData
                },
            });
          
           // Handle success response
          console.log(response.data);

          // Navigate to the complaint page upon successful submission
          navigate(`/complaint`);

        } catch (error) {
            // Handle errors
            console.error('Error submitting complaint:', error);
        } finally {
          // Reset uploading state after submission
          setUploading(false);
      }
    };


    return(
        <div className='main-layout'>
          <SideBar/>
            <div className='inner-layout'>
              <h1 className="text-4xl font-semibold mb-9 ml-3 ">Complaint Form</h1>
                <div className=" container mx-auto mt-5 bg-gradient-to-r from-pink-50 via-red-50 to-orange-50 rounded-lg border border-gray-300">
                <br/>
                  <form onSubmit={handleSubmit} className=" max-w-screen-md mx-auto w-full ">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label htmlFor="orderId" className="block mb-2 font-bold">Order ID:</label>
                        <input type="text" id="orderId" name="order_id" value={formData.order_id} onChange={handleChange} className="w-full p-2 bg-red-45 border border-gray-400 rounded-md" required />
                      </div>
                      <div>
                        <label htmlFor="customerId" className="block mb-2 font-bold">Customer ID:</label>
                        <input type="text" id="customerId" name="customer_id" value={formData.customer_id} onChange={handleChange} className="w-full p-2 border border-gray-400 rounded-md" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label htmlFor="paymentId" className="block mb-2 font-bold">Payment ID:</label>
                        <input type="text" id="paymentId" name="payment_id" value={formData.payment_id} onChange={handleChange} className="w-full p-2 bg-red-45 border border-gray-400 rounded-md" required />
                      </div>
                      <div>
                        <label htmlFor="itemId" className="block mb-2 font-bold">Item ID:</label>
                        <input type="text" id="itemId" name="item_id" value={formData.item_id} onChange={handleChange} className="w-full p-2 border border-gray-400 rounded-md" required />
                      </div>
                    </div>
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
                       {imageURL && <img src={imageURL} alt="Complaint Image" style={{ maxWidth: '50%', marginTop: '10px' }} />}
                    </div>
                    {/* Button to submit the form */}
                    <Button type="submit" disabled={uploading} className="bg-gradient-to-r from-pink-300 via-red-300 to-orange-300 text-white py-2 px-4 w-30 mt-3 text-base border border-transparent rounded-md hover:bg-gradient-to-r from-pink-600 via-red-600 to-orange-600 transition duration-300">
                            {uploading ? 'Uploading...' : 'Save'}
                    </Button>
                  </form>
                  <br/>
                </div>
            </div>
        </div>
    )
}