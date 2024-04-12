import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button } from "@material-tailwind/react"; // Assuming you have a Button component imported

const ViewDriverUI = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false); // Changed initial state to false
  const [branchId, setBranchId] = useState(""); // Changed to camelCase for consistency

  const fetchData = async () => {
    try {
      setLoading(true); // Set loading state to true before fetching data
      const response = await axios.get(
        `http://localhost:8070/Driver/drivers/${branchId}` // Updated endpoint to match backend route
      );
      console.log(response.data);
      setDrivers(response.data.drivers); // Assuming response.data.drivers contains an array of drivers
      setLoading(false); // Set loading state to false after data is fetched
    } catch (error) {
      console.error("Error fetching drivers:", error);
      setLoading(false); // Set loading state to false in case of error
    }
  };

  useEffect(() => {
    if (branchId.trim() !== "") { // Check if branchId is not empty before fetching data
      fetchData();
    }
  }, [branchId]); // Fetch data whenever branchId changes

  const handleBranchInputChange = (event) => {
    setBranchId(event.target.value);
  };

  return (
    <div>
      <div className="w-72">
        <Input
          label="Branch ID"
          value={branchId}
          placeholder="Enter Branch ID"
          onChange={handleBranchInputChange}
        />
      </div>
      <Button onClick={fetchData} color="blue">Fetch Drivers</Button>
      {loading ? (
        <p>Loading drivers...</p>
      ) : drivers.length === 0 ? (
        <p>No drivers found for this branch.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Driver ID</th>
              <th>Available District</th>
              <th>Current Handover Money</th>
              <th>Vehicle Number</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.driver_id}>
                <td>{driver.driver_id}</td>
                <td>{driver.available_district}</td>
                <td>{driver.current_handover_money}</td>
                <td>{driver.vehicle_number}</td>
                <td>{driver.availability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewDriverUI;
