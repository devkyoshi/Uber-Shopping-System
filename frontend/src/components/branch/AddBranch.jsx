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
    // Apply handleChange only for the branch_name field
    if (name === "branch_ID") {
      const filteredValue = value.replace(/[^a-zA-Z0-9\s]/g, "");
      setFormData({
        ...formData,
        [name]: filteredValue,
      });
    } else if (name === "branch_name" || name === "branch_Location") {
      const filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
      setFormData({
        ...formData,
        [name]: filteredValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
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

    const isExists = branches.some(
      (branch) =>
        branch.branch_ID === formData.branch_ID ||
        (branch.branch_ID.toLowerCase() === formDataLowerCase.branch_ID &&
          branch.branch_Location.toLowerCase() ===
            formDataLowerCase.branch_Location)
    );

    if (isExists) {
      setErrorMessage("Branch ID or Branch Name and Location already exists.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8070/Branch/branch-add",
        formDataLowerCase
      );
      setFormData({
        branch_ID: "",
        branch_name: "",
        branch_Location: "",
        district: "",
      });
      window.alert("Branch added successfully!");
    } catch (error) {
      console.error("Error:", error);
      window.alert("Please Fill the Fields");
    }
  };

  return (
    <div className="mx-auto w-full">
      <Card color="transparent" shadow={false}>
        <Typography
          variant="h4"
          color="blue-gray"
          className="text-center pt-8 pb-3"
        >
          Make Branch
        </Typography>

        <div className="flex">
          <form className="mt-8 mb-2 w-full" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-8 ">
              <div className="flex flex-col gap-2">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Branch ID
                </Typography>
                <Input
                  size="lg"
                  value={formData.branch_ID}
                  onChange={handleChange}
                  name="branch_ID"
                  placeholder="Enter Branch ID"
                  className="mb-4"
                />
                <div className="mt-10">
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    District
                  </Typography>
                  <Select
                    id="district"
                    name="district"
                    value={{
                      label: formData.district,
                      value: formData.district,
                    }}
                    onChange={(selectedOption) =>
                      setFormData({
                        ...formData,
                        district: selectedOption.value,
                      })
                    }
                    onBlur={handleBlur}
                    options={districts.map((district) => ({
                      label: district,
                      value: district,
                    }))}
                    inputValue={inputValue}
                    onInputChange={(newInputValue) => {
                      const filteredValue = newInputValue.replace(
                        /[^a-zA-Z\s]/g,
                        ""
                      );
                      setInputValue(filteredValue);
                    }}
                    className="mb-4"
                    size="lg"
                  />
                </div>
              </div>
              <div className="flex flex-col flex-1 gap-2">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Branch Name
                </Typography>
                <Input
                  size="lg"
                  value={formData.branch_name}
                  onChange={handleChange}
                  name="branch_name"
                  placeholder="Enter Branch Name"
                  className="mb-4"
                />
                <div className="mt-10">
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    Branch Location
                  </Typography>
                  <Input
                    type="text"
                    size="lg"
                    value={formData.branch_Location}
                    onChange={handleChange}
                    name="branch_Location"
                    placeholder="Enter Branch Location"
                    className="mb-4"
                  />
                </div>
              </div>
            </div>

            {errorMessage && (
              <Typography variant="p" color="red" className="mt-2">
                {errorMessage}
              </Typography>
            )}
            <div className="flex justify-center">
              <Button type="submit" className="mt-16" size="lg">
                Add Branch
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
