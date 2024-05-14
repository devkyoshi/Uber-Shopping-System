import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

export function SupermarketForm() {
  const [formData, setFormData] = useState({
    sm_name: "",
    sm_location: "",
    sm_latitude: "",
    sm_longitude: "",
    agreedTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    // Regular expression to match alphanumeric characters and space
    const regex = /^[a-zA-Z0-9\s.]*$/;

    // If the input matches the regex, update state
    if (regex.test(value) || value === "") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === "agreedTerms" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.agreedTerms) {
        alert("Please agree to the Terms and Conditions.");
      } else {
        const response = await axios.post(
          "http://localhost:8070/Supermarket/supermarket-add",
          {
            sm_name: formData.sm_name,
            sm_location: formData.sm_location,
            sm_latitude: formData.sm_latitude,
            sm_longitude: formData.sm_longitude,
          }
        );
        alert("Supermarket added to supermarket successfully!");
        console.log("Supermarket registered successfully:", response.data);
        // Optionally, you can redirect the user to another page or show a success message
      }
    } catch (error) {
      console.error("Error registering supermarket:", error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray" className="text-center">
        Register Supermarket
      </Typography>

      <div className="item-center justify-center ">
        <form className="mt-8 mb-2 sm:w-full" onSubmit={handleSubmit}>
          <div className="flex flex-wrap justify-between w-full">
            {/* First Column */}
            <div className="w-full md:w-1/2">
              <div className="mb-6 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Supermarket Name
                </Typography>
                <Input
                  required
                  type="text"
                  size="lg" // Change text box size to xl
                  placeholder="Enter supermarket name"
                  className="w-full md:w-4/5 !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="sm_name"
                  value={formData.sm_name}
                  onChange={handleChange}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Supermarket Location
                </Typography>
                <Input
                  size="lg" // Change text box size to xl
                  placeholder="Enter location"
                  className="w-full md:w-4/5 !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="sm_location"
                  value={formData.sm_location}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Second Column */}
            <div className="w-full md:w-1/2">
              <div className="mb-6 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Latitude
                </Typography>
                <Input
                  type="number"
                  size="lg" // Change text box size to xl
                  placeholder="Enter latitude"
                  className="w-full md:w-4/5 !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="sm_latitude"
                  value={formData.sm_latitude}
                  onChange={handleChange}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Longitude
                </Typography>
                <Input
                  type="number"
                  size="lg" // Change text box size to xl
                  placeholder="Enter longitude"
                  className="w-full md:w-4/5 !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="sm_longitude"
                  value={formData.sm_longitude}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
            name="agreedTerms"
            checked={formData.agreedTerms}
            onChange={handleChange}
          />
          <Button type="submit" className="mt-6" fullWidth>
            Add Supermarket
          </Button>
        </form>
      </div>
    </Card>
  );
}
