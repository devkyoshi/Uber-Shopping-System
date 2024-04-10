import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import React, { useState } from 'react';
import axios from 'axios';

export function AddTask() {

  const [formData, setFormData] = useState({
    driver_id: "",  
    task_status: "",
    order_id: "",
    route: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

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
      const response = await axios.post("http://localhost:8070/Task/add-task", formData); //api thingy (address)
      console.log(response.data); // You can handle the response as needed
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h4" color="blue-gray ">
          Make Task
        </Typography>
      </div>
      
      <div className="flex items-center justify-center h-full">
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 center" onSubmit={handleSubmit}>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="mb-1 flex flex-col gap-5">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
              Order ID
            </Typography>
            <Input
              size="lg"
              value={formData.order_id}
              onChange={handleChange}
              name="order_id"
              placeholder="Order ID"
              className="border-t-blue-gray-200 focus:border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Driver ID
            </Typography>
            <Input
              size="lg"
              value={formData.driver_id}
              onChange={handleChange}
              name="driver_id"
              placeholder="Driver ID"
              className="border-t-blue-gray-200 focus:border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Task Status
            </Typography>
            <Input
              size="lg"
              value={formData.task_status}
              onChange={handleChange}
              name="task_status"
              placeholder="Task Status"
              className="border-t-blue-gray-200 focus:border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Route
            </Typography>
            <Input
              type="text"
              size="lg"
              value={formData.route}
              onChange={handleChange}
              name="route"
              placeholder="Route"
              className="border-t-blue-gray-200 focus:border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Add Task
          </Button>
        </form>
      </div>
    </Card>
  );
}
