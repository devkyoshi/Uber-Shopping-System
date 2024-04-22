import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function FormOrder() {
  const [formData, setFormData] = useState({
    customer_id: "123", // Example customer ID
    total_amount: "", // Will be calculated later
    order_status: "Ongoing", // Ongoing status selected
    additional_notes: "",
    delivery: {
      charges: "", // Will be calculated later
      distance: "" // Will be input by the user
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    // Calculate total amount based on delivery charges
    const calculateTotalAmount = () => {
      const total = parseFloat(formData.delivery.charges) || 0;
      setFormData(prevState => ({
        ...prevState,
        total_amount: total.toFixed(2)
      }));
    };

    // Automatically calculate delivery charges based on distance
    const calculateDeliveryCharges = () => {
      const distance = parseFloat(formData.delivery.distance) || 0;
      const charges = distance * 2; // Example calculation
      setFormData(prevState => ({
        ...prevState,
        delivery: {
          ...prevState.delivery,
          charges: charges.toFixed(2)
        }
      }));
    };

    calculateTotalAmount();
    calculateDeliveryCharges();
  }, [formData.delivery.distance]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8070/Order/order-add", formData);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
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
              value={formData.customer_id}
              readOnly
              placeholder="Enter Your Customer ID"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            
            {/* Order Status Input */}
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
                label="Ongoing"
              />
              <Checkbox
                checked={formData.order_status === "Delevered"}
                onChange={handleChange}
                name="order_status"
                value="Delevered"
                label="Delivered"
              />
              <Checkbox
                checked={formData.order_status === "Picked"}
                onChange={handleChange}
                name="order_status"
                value="Picked"
                label="Picked"
              />
            </div>

            {/* Additional Notes Input */}
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
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
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
              readOnly
              placeholder="Total Amount"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          {/* Button for submitting the form */}
          <Button type="submit" className="mt-6" fullWidth>
            Add Order
          </Button>
        </form>
      </div>
    </Card>
  );
}
