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

  // Render loading indicator if data is still loading
  if (loading) {
    return <div>Loading drivers...</div>;
  }

  // Render UI
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th>Driver ID</th>
            <th>Available District</th>
            <th>Current Handover Money</th>
            <th>Vehicle Number</th>
            <th>Availability</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver._id}>
              <td>{driver._id}</td>
              <td>
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
              <td>
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
              <td>
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
              <td>
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
              <td>
                {editableDriverId === driver._id ? (
                  <Button
                    onClick={() => handleUpdate(driver._id)}
                    className="bg-green-700 hover:bg-green-900"
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleUpdateClick(driver._id)}
                    className="hover:bg-black"
                  >
                    Update
                  </Button>
                )}
              </td>
              <td>
                <Button
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
