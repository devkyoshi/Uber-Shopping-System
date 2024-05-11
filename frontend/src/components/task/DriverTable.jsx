import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  Typography,
} from "@material-tailwind/react";

const TABLE_HEAD = [
  "Driver ID",
  "Branch ID",
  "Availability",
  "District",
];

const DriverTable = () => {
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
  
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>; // Display error message if fetching data fails
  }

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
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
                  {driver.Emp_Name}
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
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal text-center"
                >
                  {driver.availability}
                </Typography>
              </td>    
              <td className="p-4 bg-blue-gray-50/50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal text-center"
                > 
                  {driver.available_district}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default DriverTable;
