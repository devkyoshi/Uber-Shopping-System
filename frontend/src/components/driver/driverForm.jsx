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
    branchID: branch_ID,
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

  const handleChange = (e) => {
    if (e.target && e.target.name) {
      const { name, value } = e.target;
      setDriverDetails({ ...driverDetails, [name]: value });
    }
  };

  const handleSelectChange = (value, name) => {
    console.log("handleselect passed: ", value, name);
    setDriverDetails({ ...driverDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending data to mongo db: ", driverDetails);
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

  console.log("Available Drivers: ", availableDrivers);

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray" className="text-center">
        Add Driver
      </Typography>

      <div className="ml-48 pl-10">
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
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
              placeholder="Enter Current Hand Over Money"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Driver ID
            </Typography>
            <Select
              name="driver_id"
              value={driverDetails.driver_id}
              onChange={(value) => handleSelectChange(value, "driver_id")}
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

          <Button type="submit" className="mt-6" fullWidth>
            Add Driver
          </Button>
        </form>
      </div>
    </Card>
  );
}