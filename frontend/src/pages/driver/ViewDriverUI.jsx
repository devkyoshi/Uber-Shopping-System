import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input, Button } from "@material-tailwind/react";



export default function ViewDriversUI({ branch_ID }) {
  // State for storing drivers data
  const [drivers, setDrivers] = useState([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for tracking editable driver
  const [editableDriverId, setEditableDriverId] = useState(null);
  // State for storing updated driver data
  const [updatedDriverData, setUpdatedDriverData] = useState({
    available_district: "",
    current_handover_money: "",
    vehicle_number: "",
    availability: "",
  });
 // State for search query
 const [searchQuery, setSearchQuery] = useState("");
 // State for entered driver ID
 const [driverIdInput, setDriverIdInput] = useState("");
 // State for selected driver details
 const [selectedDriver, setSelectedDriver] = useState(null);


 
  // Fetch drivers data when branch ID changes
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8070/Driver/drivers/${branch_ID}`
        );
        setDrivers(response.data.drivers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching drivers:", error);
        setLoading(false);
      }
    };

    if (branch_ID && branch_ID.trim() !== "") {
      fetchDrivers();
    }
    console.log("Fetched drivers:", drivers);
  }, [branch_ID]);

  // Handle click on update button
  const handleUpdateClick = (driverId) => {
    setEditableDriverId(driverId);
    const selectedDriver = drivers.find((driver) => driver._id === driverId);

    if (selectedDriver) {
      setUpdatedDriverData({
        ...selectedDriver,
      });
    }

    console.log("Selected driver:", selectedDriver);
  };

  // Handle input change
  const handleInputChange = (e, key) => {
    const { value } = e.target;
    setUpdatedDriverData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  // Handle update operation
  const handleUpdate = async (driverId) => {
    console.log("prev", updatedDriverData);
    try {
      await axios.put(
        `http://localhost:8070/Driver/${branch_ID}/driver-update/${driverId}`,
        updatedDriverData,
        { headers: { "Content-Type": "application/json" } } // Ensure proper content type
      );
      setDrivers((prevDrivers) =>
        prevDrivers.map((driver) =>
          driver._id === driverId ? updatedDriverData : driver
        )
      );

      console.log("Driver ID prev: ", driverId);
      setEditableDriverId(null);
      console.log("Updated driver data:", updatedDriverData);
    } catch (error) {
      console.error("Error updating driver:", error);
    }
  };

  // Handle delete operation
  const handleDelete = async (driverId) => {
    try {
      await axios.delete(
        `http://localhost:8070/Driver/${branch_ID}/driver-delete/${driverId}`
      );
      setDrivers((prevDrivers) =>
        prevDrivers.filter((driver) => driver._id !== driverId)
      );
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  

// Handle search for specific driver ID
const handleSearchDriverId = () => {
  const selectedDriver = drivers.find((driver) => driver._id === driverIdInput);
  if (selectedDriver) {
    setSelectedDriver(selectedDriver);
  } else {
    setSelectedDriver(null);
  }
};

// Filter drivers based on search query
const filteredDrivers = drivers.filter((driver) =>
driver._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
driver.available_district.toLowerCase().includes(searchQuery.toLowerCase()) ||
driver.current_handover_money.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
driver.vehicle_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
driver.availability.toLowerCase().includes(searchQuery.toLowerCase())
);

  // Render loading indicator if data is still loading
  if (loading) {
    return <div>Loading drivers...</div>;
  }

  // Render UI
  return (
    <Card className="h-full w-full overflow-scroll p-5 ">
      
        {/* Search bar section */}
  <div className="w-full md:w-1/4 mt-4 md:mt-0 md:ml-auto mb-5">
    <Input
      
      value={searchQuery}
      label="search"
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
     
      
      <table  className="w-full  table-auto text-left mb-5">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Driver ID</th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Available District</th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Current Handover Money</th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Vehicle Number</th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Availability</th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Update</th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Delete</th>
          </tr>


           
        </thead>
        <tbody className="text-center ">
          
          {filteredDrivers.map((driver) => (
            <tr key={driver._id} >
              <td className="p-4 border-b border-blue-gray-50">{driver._id}</td>
              <td className="p-4 border-b border-blue-gray-50">
                {editableDriverId === driver._id ? (
                  <Input
                    type="text"
                    value={updatedDriverData.available_district}
                    onChange={(e) => handleInputChange(e, "available_district")}
                  />
                ) : (
                  driver.available_district
                )}
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                {editableDriverId === driver._id ? (
                  <Input
                    type="text"
                    value={updatedDriverData.current_handover_money}
                    onChange={(e) =>
                      handleInputChange(e, "current_handover_money")
                    }
                  />
                ) : (
                  driver.current_handover_money
                )}
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                {editableDriverId === driver._id ? (
                  <Input
                    type="text"
                    value={updatedDriverData.vehicle_number}
                    onChange={(e) => handleInputChange(e, "vehicle_number")}
                  />
                ) : (
                  driver.vehicle_number
                )}
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                {editableDriverId === driver._id ? (
                  <Input
                    type="text"
                    value={updatedDriverData.availability}
                    onChange={(e) => handleInputChange(e, "availability")}
                  />
                ) : (
                  driver.availability
                )}
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                {editableDriverId === driver._id ? (
                  <Button
                    onClick={() => handleUpdate(driver._id)}
                    className="bg-green-700 hover:bg-green-900"
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                  size="sm"
                    onClick={() => handleUpdateClick(driver._id)}
                    className="hover:bg-black"
                  >
                    Update
                  </Button>
                )}
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Button
                 size="sm"
                  onClick={() => handleDelete(driver._id)}
                  className="bg-red-700 hover:bg-red-900"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}


