import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { SideBar } from '../../components/SideBar';

export default function RefundForm() {
    const { complaintId ,orderId} = useParams(); // Get complaintId and itemId from route parameters
    const navigate  = useNavigate(); // Access the history object

    const [formData, setFormData] = useState({
        order_id: '', 
        complaint_id:'',
        account_holder: '',
        account_sort_code: '',
        account_number: '',
        amount: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Update the complaintId and itemId when component mounts
    useEffect(() => {
        setFormData({ ...formData, complaint_id: complaintId,order_id:orderId});
    }, [complaintId,orderId]);

    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:8070/Refund/refund-add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const responseData = await response.json();
            console.log(responseData);
            if (response.ok) {
                setSuccessMessage(responseData);
                setErrorMessage('');
                // Set formSubmitted to true to disable the button
                setFormSubmitted(true); 
                // Redirect to success page after successful form submission
                navigate(`/complaint`);
            } else {
                setSuccessMessage('');
                setErrorMessage(responseData.message);
            }

        } catch (error) {
            setErrorMessage('An error occurred while processing your request.');
            setSuccessMessage('');
        }
    }

    return (
    <div className='main-layout'>
        <SideBar/>
     <div className="inner-layout">
     <h1 className="text-4xl font-semibold mb-9 ml-3 ">Refund Form</h1>
        <div className=" container mx-auto mt-5 bg-gray-100 rounded-lg border border-gray-300">
            <br/>
           
            <form onSubmit={handleSubmit} className=" max-w-screen-md mx-auto w-full ">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label htmlFor="orderId" className="block mb-2 font-bold">Order ID:</label>
                    <input type="text" id="orderId" name="order_id" value={formData.order_id} onChange={handleChange} className="w-full p-2 bg-red-45 border border-gray-400 rounded-md" required />
                  </div>
                  <div>
                    <label htmlFor="complaintId" className="block mb-2 font-bold">Complaint ID:</label>
                    <input type="text" id="complaintId" name="complaint_id" value={formData.complaint_id} onChange={handleChange} className="w-full p-2 border border-gray-400 rounded-md" required />
                  </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="accountHolder" className="block mb-2 font-bold">Account Holder:</label>
                    <input type="text" id="accountHolder" name="account_holder" value={formData.account_holder} onChange={handleChange} className="w-full p-2 border border-gray-400 rounded-md" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="accountSortCode" className="block mb-2 font-bold">Account Sort Code:</label>
                    <input type="text" id="accountSortCode" name="account_sort_code" value={formData.account_sort_code} onChange={handleChange} className="w-full p-2 border border-gray-400 rounded-md" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="accountNumber" className="block mb-2 font-bold">Account Number:</label>
                    <input type="text" id="accountNumber" name="account_number" value={formData.account_number} onChange={handleChange} className="w-full p-2 border border-gray-400 rounded-md" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="block mb-2 font-bold">Amount:</label>
                    <input type="Number" id="amount" name="amount" value={formData.amount} onChange={handleChange} className="w-full p-2 border border-gray-400 rounded-md" />
                </div>
                <div className='flex justify-end'>
                <div className="text-red-800 mb-4">{errorMessage}</div>
                <div className="text-green-500 mb-4">{successMessage}</div>
                 </div>
                <Button type="submit" disabled={formSubmitted} className="bg-custom-gradient text-white py-2 px-4 w-30 mt-3 text-base border border-transparent rounded-md hover:bg-custom-gradient transition duration-300">Submit</Button>
            </form>
            
            <br/><br/>
        </div>
      </div>
    </div>
    )
}
