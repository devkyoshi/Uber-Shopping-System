import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  
  import React, { useState } from 'react';
  import axios from 'axios';
  
  const districts = [ 
    "Ampara",
    "Anuradhapura",
    "Badulla",
    "Batticaloa",
    "Colombo",
    "Galle",
    "Gampaha",
    "Hambantota",
    "Jaffna",
    "Kalutara",
    "Kandy",
    "Kegalle",
    "Kilinochchi",
    "Kurunegala",
    "Mannar",
    "Matale",
    "Matara",
    "Monaragala",
    "Mullaitivu",
    "Nuwara Eliya",
    "Polonnaruwa",
    "Puttalam",
    "Ratnapura",
    "Trincomalee",
    "Vavuniya",
];

  export function AddBranch() {
  
    const [formData, setFormData] = useState({
        _id: "",
        branch_ID: "",
        branch_name: "",
        branch_Location: "",
        district: "",
        branch_Latitude: "",
        branch_Longitude: ""
    });
  
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post("http://localhost:8070/Branch/branch-add", formData); //api thingy (address)
        console.log(response.data); // You can handle the response as needed
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    return (
    <Card color="transparent" shadow={false}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h4" color="blue-gray ">
                Make Branch
            </Typography>
        </div>

        <div className="flex items-center justify-center h-full">
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 center" onSubmit={handleSubmit}>
                <div className="mb-1 flex flex-col gap-5">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Branch ID
                    </Typography>
                    <Input
                        size="lg"
                        value={formData.branch_ID}
                        onChange={handleChange}
                        name="branch_ID"
                        placeholder="Enter Branch ID"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Branch Name
                    </Typography>
                    <Input
                        size="lg"
                        value={formData.branch_name}
                        onChange={handleChange}
                        name="branch_name"
                        placeholder="Enter Branch Name"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Branch Location
                    </Typography>
                    <Input
                        type="text"
                        size="lg"
                        value={formData.branch_Location}
                        onChange={handleChange}
                        name="branch_Location"
                        placeholder="Enter Branch Location"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        District
                    </Typography>
                    <Input
                        type="text"
                        size="lg"
                        value={formData.district}
                        onChange={handleChange}
                        name="district"
                        placeholder="Enter District"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    />
                    {/* <Select
                        value={formData.district}
                        onChange={handleChange}
                        placeholder="Select a district"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        menuProps={{ className: "h-48" }}
                    >
                        {districts.map((district, index) => (
                            <Option key={index} value={district}>
                                <div className="flex items-center gap-x-2">
                                    {district}
                                </div>
                            </Option>
                        ))}
                    </Select> */}

                    
                    {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Branch Latitude
                    </Typography>
                    <Input
                        type="text"
                        size="lg"
                        value={formData.branch_Latitude}
                        onChange={handleChange}
                        name="branch_Latitude"
                        placeholder="Enter Branch Latitude"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Branch Longitude
                    </Typography>
                    <Input
                        type="text"
                        size="lg"
                        value={formData.branch_Longitude}
                        onChange={handleChange}
                        name="branch_Longitude"
                        placeholder="Enter Branch Longitude"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    /> */}
                </div>
                <Button type="submit" className="mt-6" fullWidth>
                    Add Branch
                </Button>
            </form>
        </div>
    </Card>
    );
  }
  