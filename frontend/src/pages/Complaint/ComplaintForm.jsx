import React,{useState} from 'react';
import { SideBar } from '../../components/SideBar';

export default function ComplaintForm(){
    const [formData, setFormData] = useState({
        customer_id: '',
        order_id: '',
        payment_id: '',
        complaint_type: '',
        item_id: '',
        resolving_option: 'refund', // Default value
        complaint_img: null,
        quantity: '',
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8070/Complaint/complaint-add', formData);
            console.log(response.data); // Handle success response
        } catch (error) {
            console.error('Error submitting complaint:', error);
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
                        <label htmlFor="complaintId" className="block mb-2 font-bold">Complaint ID:</label>
                        <input type="text" id="complaintId" name="complaint_id" value={formData.customer_id} onChange={handleChange} className="w-full p-2 border border-gray-400 rounded-md" required />
                      </div>
                    </div>
                    <div className="mb-3">
                       <label htmlFor="accountHolder" className="block mb-2 font-bold">Account Holder:</label>
                       <input type="text" id="accountHolder" name="account_holder" value={formData.account_holder} onChange={handleChange} className="w-full p-2 border border-gray-400 rounded-md" required />
                    </div>
                    <div className="mb-3">
                       <label htmlFor="complaint_img" className="block mb-2 font-bold">Complaint Image</label>
                       <input type="file" id="complaint_img" name="complaint_img" onChange={handleFileChange} required />
                       {imagePreview && <img src={imagePreview} alt="Complaint Preview" style={{ maxWidth: '100%', marginTop: '10px'}} />}
                    </div>
                  </form>
                </div>
            </div>
        </div>
    )
}