import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export function FormOrder() {
  const [formData, setFormData] = useState({
    customer_id: '',
    total_amount: '',
    order_status: '',
    additional_notes: '',
    delivery_Charges: '',
    delivery_Distance: ''
  });
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // function to handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value}) 
  }

  // function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);

      const formDataToSend = new FormData();
      formDataToSend.append('customer_id', formData.customer_id);
      formDataToSend.append('total_amount', formData.total_amount);
      formDataToSend.append('order_status', formData.order_status);
      formDataToSend.append('additional_notes', formData.additional_notes);
      formDataToSend.append('delivery_Distance', formData.delivery_Distance);
      formDataToSend.append('delivery_Charges', formData.delivery_Charges);

      const response = await axios.post('http://localhost:8070/order/order-add', formDataToSend,{
        headers: {
          'Content-Type': 'multipart/form-data' 
        },
      });

      // handle success response
      console.log(response.data);
      // navigate to the home page after the success placement
      navigate('/details');

    } catch(error) {
      // handling errors
      console.error('Error in order placement: ', error);
    } finally {
      // reset uploading
      setUploading(false);
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h4" color="blue-gray">
          Make Order
        </Typography>
      </div>

      <div className="flex items-center justify-center h-full">
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 center" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-5">

            {/* Customer ID Input */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Customer ID
            </Typography>
            <Input
              size="lg"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            
            {/* Order Status Input */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Order Status
            </Typography>
            <div className="inline-flex items-center">

              {/* Checkboxes */}
              <Checkbox
                name="order_status"
                value="Ongoing"
                onChange={handleChange}
                label="Ongoing"
              />
              <Checkbox
                name="order_status"
                value="Delivered"
                onChange={handleChange}
                label="Delivered"
              />
              <Checkbox
                name="order_status"
                value="Picked"
                onChange={handleChange}
                label="Picked"
              />
            </div>

            {/* Additional Notes Input */}
            <Typography variant="h6"color="blue-gray" className="-mb-3">
              Additional Notes
            </Typography>
            <Input
              type="text"
              size="lg"
              onChange={handleChange}
              name="additional_notes"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />

            {/* Distance Input */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Distance
            </Typography>
            <Input
              type="text"
              size="lg"
              onChange={handleChange}
              name="delivery_Distance"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            
            {/* Delivery Charges */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Delivery Charges
            </Typography>
            <Input
              type="text"
              size="lg"
              onChange={handleChange}
              name="delivery_Charges"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />

            {/* Total Amount Input */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Total Amount
            </Typography>
            <Input
              type="text"
              size="lg"
              onChange={handleChange}
              name="total_amount"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            
          </div>

          {/* Button for submitting the form */}
          <Button type="submit"
          disabled={uploading}
          className="mt-6" 
          onClick={()=>{navigate('/details', {replace: true, state:{customer_id: formData.customer_id, total_amount: formData.total_amount, order_status: formData.order_status, additional_notes: formData.additional_notes, delivery_Distance: formData.delivery_Distance, delivery_Charges: formData.delivery_Charges}})}}
          fullWidth
          >
            {uploading ? 'placing...': 'Place Order'}
          </Button>
        </form>
      </div>
    </Card>
  );
}