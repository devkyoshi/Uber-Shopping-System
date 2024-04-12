import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
  Radio,
} from "@material-tailwind/react";

export function DriverForm(branch_ID) {
  const [driverDetails, setDriverDetails] = useState({
    branchID: "",
    driver_id: "",
    current_handover_money: "",
    vehicle_number: "",
    availability: "Available",
    available_district: "",
  });

  console.log(branch_ID);

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
            <Input
              type="text"
              size="lg"
              name="driver_id"
              value={driverDetails.driver_id}
              onChange={handleChange}
              placeholder="Enter Current Hand Over Money"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Available District
            </Typography>
            <Input
              type="text"
              size="lg"
              name="available_district"
              value={driverDetails.available_district}
              onChange={handleChange}
              placeholder="Enter Available Districts"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            {/* <Select
              label="Select Available District"
              className="w-72"
              name="available_district"
              value={driverDetails.available_district}
              onChange={handleChange}
            >
              <Option value="Colombo">Colombo</Option>
              <Option value="Gampaha">Gampaha</Option>
              <Option value="Kalutara">Kalutara</Option>
              <Option value="Kandy">Kandy</Option>
              <Option value="Matale">Matale</Option>
              <Option value="Nuwara Eliya">Nuwara Eliya</Option>
              <Option value="Galle">Galle</Option>
              <Option value="Matara">Matara</Option>
              <Option value="Hambantota">Hambantota</Option>
              <Option value="Jaffna">Jaffna</Option>
              <Option value="Kilinochchi">Kilinochchi</Option>
              <Option value="Mannar">Mannar</Option>
              <Option value="Mullaitivu">Mullaitivu</Option>
              <Option value="Vavuniya">Vavuniya</Option>
              <Option value="Batticaloa">Batticaloa</Option>
              <Option value="Ampara">Ampara</Option>
              <Option value="Trincomalee">Trincomalee</Option>
              <Option value="Kurunegala">Kurunegala</Option>
              <Option value="Puttalam">Puttalam</Option>
              <Option value="Anuradhapura">Anuradhapura</Option>
              <Option value="Polonnaruwa">Polonnaruwa</Option>
              <Option value="Badulla">Badulla</Option>
              <Option value="Monaragala">Monaragala</Option>
              <Option value="Ratnapura">Ratnapura</Option>
              <Option value="Kegalle">Kegalle</Option>
            </Select> */}

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
