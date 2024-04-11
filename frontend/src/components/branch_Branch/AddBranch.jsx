import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

export function AddBranch() {
  const [formData, setFormData] = useState({
    branch_ID: "",
    branch_name: "",
    branch_Location: "",
    district: "",
  });

  const [districts, setDistricts] = useState([]);
  const [branches, setBranches] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const branchResponse = await axios.get(
          "http://localhost:8070/Branch/branch-all"
        );
        const branchesData = branchResponse.data;
        setBranches(branchesData);

        const districtValues = [
          ...new Set(branchesData.map((branch) => branch.district)),
        ];
        setDistricts(districtValues);
      } catch (error) {
        console.error("Error fetching branches:", error);
        setErrorMessage("Error fetching branches. Please try again.");
      }
    };

    fetchBranches();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      setFormData({ ...formData, district: selectedOption.value });
    }
  };

  const handleBlur = () => {
    if (inputValue) {
      setFormData({ ...formData, district: inputValue });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataLowerCase = {
      ...formData,
      branch_ID: formData.branch_ID.toLowerCase(),
      branch_Location: formData.branch_Location.toLowerCase(),
    };

    // Check for duplicate branch ID or branch Name and Location
    const isExists = branches.some(
      (branch) =>
        branch.branch_ID === formData.branch_ID ||
        (branch.branch_ID.toLowerCase() === formDataLowerCase.branch_ID &&
          branch.branch_Location.toLowerCase() === formDataLowerCase.branch_Location)
    );

    if (isExists) {
      setErrorMessage("Branch ID or Branch Name and Location already exists.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8070/Branch/branch-add",
        formDataLowerCase // Use formDataLowerCase here
      );
      console.log(response.data);
      setFormData({
        branch_ID: "",
        branch_name: "",
        branch_Location: "",
        district: "",
      });
      setErrorMessage("Branch added successfully!");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error adding branch. Please try again.");
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4" color="blue-gray ">
          Make Branch
        </Typography>
      </div>

      <div className="flex items-center justify-center h-full">
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 center"
          onSubmit={handleSubmit}
        >
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Branch ID
          </Typography>
          <Input
            size="lg"
            required
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

          <div className="mb-1 flex flex-col gap-5">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              District
            </Typography>
            <Select
              id="district"
              name="district"
              value={{ label: formData.district, value: formData.district }}
              onChange={handleSelectChange}
              onBlur={handleBlur}
              options={districts.map((district) => ({
                label: district,
                value: district,
              }))}
              placeholder="Enter or select district"
              inputValue={inputValue}
              onInputChange={(newInputValue) => setInputValue(newInputValue)}
              isClearable={false}
            />
          </div>

          {errorMessage && (
            <Typography variant="p" color="red" className="mt-2">
              {errorMessage}
            </Typography>
          )}
          <Button type="submit" className="mt-6" fullWidth>
            Add Branch
          </Button>
        </form>
      </div>
    </Card>
  );
}
