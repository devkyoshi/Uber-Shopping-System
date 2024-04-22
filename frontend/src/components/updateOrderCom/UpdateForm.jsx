import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function UpdateForm() {

  const [formData, setFormData] = useState({
      customer_id: "",
      purchase_amount: "",
      total_amount: "",
      order_status: "",
      additional_notes: "",
      delivery: {
        charges: "",
        distance: ""
      }
    });

    const navigate = useNavigate();
  
    const handleChange = (e) => { // this uses for what?
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:8070/Order/update", formData); //api thingy (address)
        console.log(response.data); // You can handle the response as needed
      } catch (error) {
        console.error("Error:", error);
      }
    };

  // design starts from here
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
                value={formData.customer_id}
                onChange={handleChange}
                readOnly
                placeholder="Enter Your Customer ID"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

          {/**Order status part */}
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Order Status
          </Typography>
          <div className="inline-flex items-center">

            {/* Checkboxes */}
            <Checkbox
              checked={formData.order_status === "Ongoing"}
              onChange={handleChange}
              name="order_status"
              value="Ongoing"
              readOnly
              label="Ongoing"
            />
            <Checkbox
              checked={formData.order_status === "Delevered"}
              onChange={handleChange}
              name="order_status"
              value="Delevered"
              readOnly
              label="Delivered"
            />
            <Checkbox
              checked={formData.order_status === "Picked"}
              onChange={handleChange}
              name="order_status"
              value="Picked"
              readOnly
              label="Picked"
            />
          </div>

          {/* Additional Notes Input - need to increase the height of the */} 
            <Typography variant="h6" color="blue-gray" className="-mb-3">
                Additional Notes
              </Typography>
              <Input
                type="text"
                size="lg"
                value={formData.additional_notes}
                onChange={handleChange}
                name="additional_notes"
                placeholder="Enter Additional Notes"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 h-8"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
             />

            {/* Distance Input */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
                Distance
              </Typography>
              <Input
                type="text"
                size="lg"
                value={formData.delivery.distance}
                onChange={handleChange}
                name="delivery.distance"
                placeholder="Enter Distance"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

            {/* Delivery Charges Display */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
                Delivery Charges
              </Typography>
              <Input
                size="lg"
                value={formData.delivery.charges}
                onChange={handleChange}
                readOnly
                placeholder="Delivery Charges"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

            {/* Total Amount Display */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
                Total Amount
              </Typography>
              <Input
                size="lg"
                value={formData.total_amount}
                onChange={handleChange}
                readOnly
                placeholder="Total Amount"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

        </div>
        
        <Button type="submit" className="mt-6" fullWidth>
          Confirm Changes
        </Button>

        <Button onClick={()=>{navigate("/myOrder",{replace: true})}} className="bg-gray-300 text-black hover:bg-gray-500 mt-3" fullWidth>
          Cancel
        </Button>
       
      </form>
      </div>
    </Card>
  );
}