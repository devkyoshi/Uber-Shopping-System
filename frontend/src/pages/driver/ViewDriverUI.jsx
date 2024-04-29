import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input, Button } from "@material-tailwind/react";

export default function ViewDriversUI({ branch_ID }) {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editableDriverId, setEditableDriverId] = useState(null);
  const [updatedDriverData, setUpdatedDriverData] = useState({
    available_district: "",
    current_handover_money: "",
    vehicle_number: "",
    availability: "",
  });

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
  }, [branch_ID]);

  const handleUpdateClick = (driverId) => {
    setEditableDriverId(driverId);
    const selectedDriver = drivers.find((driver) => driver.driver_id === driverId);
    if (selectedDriver) {
      setUpdatedDriverData({
        available_district: selectedDriver.available_district,
        current_handover_money: selectedDriver.current_handover_money,
        vehicle_number: selectedDriver.vehicle_number,
        availability: selectedDriver.availability,
      });
    }
  };

  const handleInputChange = (e, key) => {
    const { value } = e.target;
    setUpdatedDriverData({
      ...updatedDriverData,
      [key]: value,
    });
  };

  const handleUpdate = async (driverId) => {
    try {
      await axios.put(
        `http://localhost:8070/Driver/${branch_ID}/driver-update/${driverId}`,
        updatedDriverData
      );
      const updatedDrivers = drivers.map((driver) =>
        driver.driver_id === driverId ? { ...driver, ...updatedDriverData } : driver
      );
      setDrivers(updatedDrivers);
      setEditableDriverId(null);
    } catch (error) {
      console.error("Error updating driver:", error);
    }
  };

  const handleDelete = async (driverId) => {
    try {
      await axios.delete(
        `http://localhost:8070/Driver/${branch_ID}/driver-delete/${driverId}`
      );
      console.log("Driver", driverId);
      setDrivers(drivers.filter((driver) => driver.driver_id !== driverId));
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  if (loading) {
    return <div>Loading drivers...</div>;
  }

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
            <tr key={driver.driver_id}>
              <td>{driver.driver_id}</td>
              <td>
                {editableDriverId === driver.driver_id ? (
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
                {editableDriverId === driver.driver_id ? (
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
                {editableDriverId === driver.driver_id ? (
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
                {editableDriverId === driver.driver_id ? (
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
                {editableDriverId === driver.driver_id ? (
                  <Button
                    onClick={() => handleUpdate(driver.driver_id)}
                    className="bg-green-700 hover:bg-green-900"
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleUpdateClick(driver.driver_id)}
                    className="hover:bg-black"
                  >
                    Update
                  </Button>
                )}
              </td>
              <td>
                <Button
                  onClick={() => handleDelete(driver.driver_id)}
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
