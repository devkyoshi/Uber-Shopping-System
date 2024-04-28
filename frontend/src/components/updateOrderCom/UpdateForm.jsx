import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateForm() {
  const {order_id} = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customer_id: '',
    total_amount: '',
    order_status: '',
    additional_notes: '',
    delivery_Distance: '',
    delivery_Charges: ''
  });

  const [uploading, setUploading] = useState();

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/order/${order_id}`);

      const fetchedOrder = response.data;
      setFormData({
        customer_id:fetchedOrder.customer_id,
        total_amount:fetchedOrder.total_amount,
        order_status:fetchedOrder.order_status,
        additional_notes:fetchedOrder.additional_notes,
        delivery_Distance:fetchedOrder.delivery_Distance,
        delivery_Charges:fetchedOrder.delivery_Charges
      })

    }catch(error) {
      console.error('Error in Order fetching: ', error);
    }
  };

  // function to handle changes in form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  // function - handle form submission
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

      console.log(formDataToSend);

      const response = await axios.put(`http://localhost:8070/order/order-update/${order_id}`, formDataToSend,{
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      console.log(response.data);
      navigate('/myOrder');

    } catch (error) {
      console.error('Error in submitting updated order: ', error);
    }finally {
      setUploading(false);
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h4" color="blue-gray">
          Make your Changes
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
              readOnly
              name="customer_id"
              value={formData.customer_id}
              onChange={handleChange}
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
                label="Ongoing"
                onChange={(e) => handleChange(e)}
                checked={formData.order_status === 'Ongoing'}
              />
              <Checkbox
                name="order_status"
                value="Delivered"
                label="Delivered"
                onChange={(e) => handleChange(e)}
                checked={formData.order_status === 'Delivered'}
              />
              <Checkbox
                name="order_status"
                value="Picked"
                label="Picked"
                onChange={(e) => handleChange(e)}
                checked={formData.order_status === 'Picked'}
              />
            </div>

            {/* Additional Notes Input */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Additional Notes
            </Typography>
            <Input
              type="text"
              size="lg"
              onChange={handleChange}
              name="additional_notes"
              value={formData.additional_notes}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />

            {/* Distance Input */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Distance
            </Typography>
            <Input
              type="number"
              size="lg"
              name="delivery_Distance"
              value={formData.delivery_Distance}
              readOnly
              onChange={handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />

            {/* Delivery Charges */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Delivery Charges
            </Typography>
            <Input
              type="number"
              size="lg"
              name="delivery_Charges"
              value={formData.delivery_Charges}
              readOnly
              onChange={handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />

            {/* Total Amount Input */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Total Amount
            </Typography>
            <Input
              type="number"
              size="lg"
              name="total_amount"
              value={formData.total_amount}
              readOnly
              onChange={handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />

          </div>

          {/* Button for submitting the form */}
          <Button 
            type="submit"
            disabled={uploading}
            className="mt-6" 
            fullWidth
            >
            {uploading? 'Confirming...' : 'Confirm Changes'}
          </Button>
        </form>
      </div>
    </Card>
  );
}