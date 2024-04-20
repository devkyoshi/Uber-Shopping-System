import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  Typography,
  Select,
  MenuItem,
} from "@material-tailwind/react";

const TABLE_HEAD1 = [
  "Task ID",
  "Order ID",
  "Status",
  "PickUpImageURL",
  "PickUpTime",
];

const TABLE_HEAD2 = [
  "Task ID",
  "Order ID",
  "Status",
  "DeliveredImageURL",
  "DeliveredTime",
];

const TaskdriverTable = () => {
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState(null);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('http://localhost:8070/Driver/drivers');
      console.log('API Response:', response.data);

      if (!response.data || !Array.isArray(response.data)) {
        setError('Invalid response data');
        return;
      }

      // Filter drivers with availability "Available"
      const drivers = response.data.filter(driver => driver.availability === "Available");
      console.log('filter:', drivers);

      // Sort filtered drivers by available_district in alphabetical order
      const sortedDrivers = drivers.sort((a, b) => a.available_district.localeCompare(b.available_district));

      setDrivers(sortedDrivers); // Set filtered and sorted drivers to the drivers state
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data'); // Set error state
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleAddPickup = async (taskId, orderId) => {
    try {
      const response = await axios.put(`http://localhost:8070/add-pickup/${taskId}/${orderId}`, {
        status: 'picked up', // Set the status as needed
        pickup_image_url: 'URL_TO_PICKUP_IMAGE', // Provide the URL of the pickup image
      });
      console.log('Add Pickup Response:', response.data);
      // Optionally, update state or show a success message
    } catch (error) {
      console.error('Error adding pickup:', error);
      // Handle error: show error message or log
    }
  };

  const handleAddDelivered = async (taskId, orderId) => {
    try {
      const response = await axios.put(`http://localhost:8070/add-delivered/${taskId}/${orderId}`, {
        status: 'delivered', // Set the status as needed
        delivered_image_url: 'URL_TO_DELIVERED_IMAGE', // Provide the URL of the delivered image
      });
      console.log('Add Delivered Response:', response.data);
      // Optionally, update state or show a success message
    } catch (error) {
      console.error('Error adding delivered:', error);
      // Handle error: show error message or log
    }
  };

  if (error) {
    return <div>Error: {error}</div>; // Display error message if fetching data fails
  }

  return (
    <Card className="h-full w-full overflow-scroll">
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h4" color="blue-gray">
            Pick Up Delivery Details...
          </Typography>
        </div>

        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD1.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    style={{ fontWeight: "bolder" }}
                    className="font-normal leading-none opacity-70 text-center"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {drivers.map(driver => (
              <tr key={driver.driver_id}>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-center"
                  >
                    {driver.driver_id}
                  </Typography>
                </td>
                <td className="p-4 bg-blue-gray-50/50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-center"
                  >
                    {driver.branch_ID}
                  </Typography>
                </td>
                <td className="p-4">
                  <Select
                    value={driver.status}
                    onChange={(e) => {
                      const selectedStatus = e.target.value;
                      // Assuming you have a function to handle status change
                      handleStatusChange(driver.driver_id, selectedStatus);
                    }}
                  >
                    <MenuItem value="ongoing">Ongoing</MenuItem>
                    <MenuItem value="pickup">Pickup</MenuItem>
                    <MenuItem value="delivered">Delivering</MenuItem>
                  </Select>
                </td>
                <td className="p-4 bg-blue-gray-50/50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-center"
                  >
                    {driver.pickup_image_url}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-center"
                  >
                    {driver.pickup_time}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h4" color="blue-gray">
            Delivery Details...
          </Typography>
        </div>

        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD2.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    style={{ fontWeight: "bolder" }}
                    className="font-normal leading-none opacity-70 text-center"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {drivers.map(driver => (
              <tr key={driver.driver_id}>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-center"
                  >
                    {driver.driver_id}
                  </Typography>
                </td>
                <td className="p-4 bg-blue-gray-50/50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-center"
                  >
                    {driver.branch_ID}
                  </Typography>
                </td>
                <td className="p-4">
                  <Select
                    value={driver.status}
                    onChange={(e) => {
                      const selectedStatus = e.target.value;
                      // Assuming you have a function to handle status change
                      handleStatusChange(driver.driver_id, selectedStatus);
                    }}
                  >
                    <MenuItem value="ongoing">Ongoing</MenuItem>
                    <MenuItem value="pickup">Pickup</MenuItem>
                    <MenuItem value="delivered">Delivering</MenuItem>
                  </Select>
                </td>
                <td className="p-4 bg-blue-gray-50/50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-center"
                  >
                    {driver.delivered_time}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TaskdriverTable;
