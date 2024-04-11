import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DriverTable = () => {
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8070/Branch/branch-all');
        console.log('API Response:', response.data);

        // Filter drivers with driver_status "Available"
        const availableDrivers = response.data.filter(driver => driver.driver_status === "Available");
        
        // Sort filtered drivers by available_district in alphabetical order
        const sortedDrivers = availableDrivers.sort((a, b) => a.available_district.localeCompare(b.available_district));

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
    <div>
      <h1>Available Driver Table</h1>
      <table>
        <thead>
          <tr>
            <th>Driver ID</th>
            <th>Available District</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map(driver => (
            <tr key={driver._id}>
              <td>{driver._id}</td>
              <td>{driver.available_district}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverTable;
