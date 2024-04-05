import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";

import React, { useState } from 'react';
import axios from 'axios';


  export function FormOrder() {

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
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:8070/Order/order-add", formData); //api thingy (address)
          console.log(response.data); // You can handle the response as needed
        } catch (error) {
          console.error("Error:", error);
        }
      };


    return (
       <Card color="transparent" shadow={false}>
         <div style={{ display: 'flex', justifyContent: 'center' }}>
         <Typography variant="h4" color="blue-gray ">
          Make Order
        </Typography>
         </div>
        
        <div className="flex items-center justify-center h-full">
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 center" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-5">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Customer ID
            </Typography>
            <Input
              size="lg"
              value={formData.customer_id}
              onChange={handleChange}
              name="customer_id"
              placeholder="Enter Your Customer ID"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Purchase Amount
            </Typography>
            <Input
              size="lg"
              value={formData.purchase_amount}
              onChange={handleChange}
              name="purchase_amount"
              placeholder="Enter Your Purchase Amount"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Total Amount
            </Typography>
            <Input
              type="text"
              size="lg"
              value={formData.total_amount}
              onChange={handleChange}
              name="total_amount"
              placeholder="Enter Total Amount"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Order Status
            </Typography>
            <Input
              type="text"
              size="lg"
              value={formData.order_status}
              onChange={handleChange}
              name="order_status"
              placeholder="Enter Total Amount"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Additional Notes
            </Typography>
            <Input
              type="text"
              size="lg"
              value={formData.additional_notes}
              onChange={handleChange}
              name="additional_notes"
              placeholder="Enter Total Amount"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Delivery Charges
            </Typography>
            <Input
              type="text"
              size="lg"
              value={formData.charges}
              onChange={handleChange}
              name="charges"
              placeholder="Enter Charges"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Distance
            </Typography>
            <Input
              type="text"
              size="lg"
              placeholder="Enter Distance"
              value={formData.distance}
              onChange={handleChange}
              name="distance"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          
          <Button type="submit" className="mt-6" fullWidth>
            Add Order
          </Button>
         
        </form>
        </div>
        
       
      </Card>
    );
  }