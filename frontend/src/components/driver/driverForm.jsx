import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Input,
  Button,
  Typography,
  Radio,
  Option,
  Select,
} from "@material-tailwind/react";

export function DriverForm({ branch_ID, district }) {
  const [driverDetails, setDriverDetails] = useState({
    branchID: "",
    driver_id: "",
    current_handover_money: "",
    vehicle_number: "",
    availability: "Available",
    available_district: district,
  });

  const [availableDrivers, setAvailableDrivers] = useState([]);

  useEffect(() => {
    fetchAvailableDrivers();
  }, []);

  const fetchAvailableDrivers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8070/Driver/available-drivers"
      );
      setAvailableDrivers(response.data);
    } catch (error) {
      console.error("Error fetching available drivers:", error);
      // handle error
    }
  };

  const handleKeyPress = (e) => {
    // If the pressed key is not a letter, digit, or '@', prevent the default action
    if (!/[a-zA-Z0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    if (e.target && e.target.name) {
      const { name, value } = e.target;
      
      setDriverDetails({ ...driverDetails, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8070/Driver/${branch_ID}/driver-add`,
        driverDetails
      );
      console.log(response.data); // handle success message
    } catch (error) {
      console.error("Error adding driver:", error);
      // handle error
    }
  };

  return (
    <div className="mx-auto w-full">
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray" className="text-center pt-8 pb-3">
        Add Driver
      </Typography>

      <div className="flex">
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 max-w-screen-lg"
        >
          <div className="flex flex-row gap-8 p-l-10">
          <div className="flex flex-col flex-1 gap-2">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Branch ID
            </Typography>
            <Input
              type="text"
              size="lg"
              name="branchID"
              readOnly
              value={branch_ID}
              placeholder="Branch ID"
              style={{ width: '360px' }}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Availability
            </Typography>

            <Radio
              name="availability"
              label="Available"
              value="Available"
              checked={driverDetails.availability === "Available"}
              onChange={handleChange}
            />
            <Radio
              name="availability"
              label="Unavailable"
              value="Unavailable"
              checked={driverDetails.availability === "Unavailable"}
              onChange={handleChange}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Current Hand Over Money
            </Typography>
            <Input
              type="text"
              size="lg"
              name="current_handover_money"
              value={driverDetails.current_handover_money}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter Current Hand Over Money"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
       </div>
           <div className="flex flex-col flex-1 gap-2">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Driver ID
            </Typography>
            <Select
              name="driver_id"
              value={driverDetails.driver_id}
              onChange={handleChange}
              style={{ width: '360px' }}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            >
              {availableDrivers.map((driver) => (
                <Option key={driver._id} value={driver._id}>
                  {driver.username}
                </Option>
              ))}
            </Select>

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Available District
            </Typography>
            <Input
              type="text"
              size="lg"
              name="available_district"
              value={district}
              onChange={handleChange}
              readOnly
              placeholder="Enter Available Districts"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Vehicle Number
            </Typography>
            <Input
              type="text"
              size="lg"
              name="vehicle_number"
              value={driverDetails.vehicle_number}
              onChange={handleChange}
              placeholder="Enter Vehicle Number"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
          </div>
          </div>
          <Button type="submit" className="mt-6" fullWidth  >
            Add Driver
          </Button>
        </form>

      </div>
    </Card>
    </div>
  );
}
