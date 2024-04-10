import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const DriverTable = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8070/Branch/branch-all');
        console.log('API Response:', response.data);

        // Flatten the nested drivers array from the API response
        const allDrivers = response.data.flatMap(branch => branch.drivers.map(driver => ({
          ...driver,
          district: branch.district // Assigning the district from the branch to each driver
        })));

        // Filter drivers by availability and then sort by district in alphabetical order
        const filteredDrivers = allDrivers.filter(driver => driver.availability === 'Available');
        const sortedDrivers = filteredDrivers.sort((a, b) => a.district.localeCompare(b.district));
        
        setDrivers(sortedDrivers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchData();
  }, []);

  return (
    <div>
      <h1>Available Driver Table</h1>
      <table>
        <thead>
          <tr>
            <th>Driver ID</th>
            <th>District</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map(driver => (
            <tr key={driver._id}>
              <td>{driver._id}</td>
              <td>{driver.district}</td> {/* Correctly displaying the district from the branch */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverTable;
