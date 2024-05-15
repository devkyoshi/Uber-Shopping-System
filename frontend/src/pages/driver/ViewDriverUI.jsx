import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input, Button } from "@material-tailwind/react";
import jsPDF from "jspdf";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [driverIdInput, setDriverIdInput] = useState("");
  const [selectedDriver, setSelectedDriver] = useState(null);

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
    const selectedDriver = drivers.find((driver) => driver._id === driverId);
    if (selectedDriver) {
      setUpdatedDriverData({ ...selectedDriver });
    }
  };

  const handleInputChange = (e, key) => {
    const { value } = e.target;
    setUpdatedDriverData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleUpdate = async (driverId) => {
    try {
      await axios.put(
        `http://localhost:8070/Driver/${branch_ID}/driver-update/${driverId}`,
        updatedDriverData,
        { headers: { "Content-Type": "application/json" } }
      );
      setDrivers((prevDrivers) =>
        prevDrivers.map((driver) =>
          driver._id === driverId ? updatedDriverData : driver
        )
      );
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
      setDrivers((prevDrivers) =>
        prevDrivers.filter((driver) => driver._id !== driverId)
      );
      console.log(
        "Driver removed successfully. branch ID: ",
        branch_ID,
        "Driver ID: ",
        driverId
      );
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  const handleSearchDriverId = () => {
    const selectedDriver = drivers.find(
      (driver) => driver._id === driverIdInput
    );
    if (selectedDriver) {
      setSelectedDriver(selectedDriver);
    } else {
      setSelectedDriver(null);
    }
  };

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.available_district
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      driver.current_handover_money
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      driver.vehicle_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.availability.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("Drivers Report", 15, 10);

    const reportData = filteredDrivers.map((driver, index) => [
      index + 1,
      driver._id,
      driver.available_district,
      driver.current_handover_money,
      driver.vehicle_number,
      driver.availability,
    ]);

    doc.autoTable({
      head: [
        [
          "#",
          "Driver ID",
          "Available District",
          "Current Handover Money",
          "Vehicle Number",
          "Availability",
        ],
      ],
      body: reportData,
    });

    doc.save("drivers_report.pdf");
  };

  if (loading) {
    return <div>Loading drivers...</div>;
  }

  return (
    <Card className="h-full w-full overflow-scroll p-5 ">
      <div className="inline-flex justify-end">
        <div className="mb-4">
          <Input
            value={searchQuery}
            label="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="ml-5">
          <Button
            onClick={generateReport}
            className="bg-blue-500 hover:bg-blue-700"
          >
            Generate PDF Report
          </Button>
        </div>
      </div>

      <table className="w-full table-auto text-left mb-5 ">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Driver ID
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Available District
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Current Handover Money
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Vehicle Number
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Availability
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Update
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredDrivers.map((driver) => (
            <tr key={driver._id}>
              <td className="p-4 border-b border-blue-gray-50">
                Driver_{driver._id.toString().slice(0, 5)}
              </td>
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
