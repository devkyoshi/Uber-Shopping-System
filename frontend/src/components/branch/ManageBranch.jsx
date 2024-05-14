import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography, Button, Input } from "@material-tailwind/react";

export function ManageBranch() {
  const [branches, setBranches] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchBranches();
  }, [refresh]);

  const fetchBranches = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8070/Branch/branch-all"
      );
      setBranches(
        response.data.map((branch) => ({
          ...branch,
          originalValues: { ...branch },
        }))
      );
      setRefresh(false);
    } catch (error) {
      console.error("Error fetching branches:", error);
      setErrorMessage("Error fetching branches");
    }
  };

  const handleDelete = async (branchId) => {
    try {
      const response = await axios.get(
        `http://localhost:8070/Driver/${branchId}/driver-all`
      );
      const drivers = response.data;

      if (drivers.length > 0) {
        const confirmDelete = window.confirm(
          `There are ${drivers.length} drivers in this branch. Are you sure you want to delete it?`
        );

        if (!confirmDelete) {
          return;
        }
      }

      await axios.delete(
        `http://localhost:8070/Branch/branch-delete/${branchId}`
      );
      console.log("Branch deleted successfully");
      setRefresh(true);
    } catch (error) {
      console.error("Error deleting Branch:", error);
      setErrorMessage("Error deleting Branch");
    }
  };

  const handleUpdate = async (updatedBranch) => {
    try {
      // Check if any field is null
      if (
        updatedBranch.branch_ID === "" ||
        updatedBranch.branch_name === "" ||
        updatedBranch.branch_Location === "" ||
        updatedBranch.district === ""
      ) {
        window.alert("Please fill in all fields.");
        return;
      }

      const response = await axios.put(
        `http://localhost:8070/Branch/branch-update/${updatedBranch._id}`,
        updatedBranch
      );
      window.alert("Branch updated successfully:");
      setRefresh(true);
    } catch (error) {
      console.error("Error updating branch:", error);
      setErrorMessage("Error updating branch");
    }
  };

  const handleInputChange = (e, branchId, fieldName) => {
    const { value } = e.target;
    let filteredValue = value;

    // Apply different validation based on the field name
    if (fieldName === "branch_ID" || fieldName === "branch_Location") {
      // Allow only alphanumeric characters and spaces
      filteredValue = value.replace(/[^a-zA-Z0-9\s]/g, "");
    } else if (fieldName === "branch_name" || fieldName === "district") {
      // Allow only alphabets and spaces
      filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
    }

    const updatedBranches = branches.map((branch) => {
      if (branch._id === branchId) {
        return {
          ...branch,
          [fieldName]: filteredValue,
        };
      }
      return branch;
    });
    setBranches(updatedBranches);
  };
  const resetToOriginalValues = (branchId) => {
    const updatedBranches = branches.map((branch) => {
      if (branch._id === branchId) {
        return {
          ...branch,
          ...branch.originalValues,
        };
      }
      return branch;
    });
    setBranches(updatedBranches);
  };

  const [editMode, setEditMode] = useState({});

  const toggleEditMode = (branchId) => {
    setEditMode((prevState) => ({
      ...prevState,
      [branchId]: !prevState[branchId],
    }));
  };

  const renderSaveOrEditButton = (branchId) => {
    if (editMode[branchId]) {
      return (
        <Button
          color="green"
          onClick={() => {
            handleSave(branchId);
            toggleEditMode(branchId);
          }}
        >
          Save
        </Button>
      );
    } else {
      return (
        <Button color="blue" onClick={() => toggleEditMode(branchId)}>
          Update
        </Button>
      );
    }
  };

  const handleSave = async (branchId) => {
    const updatedBranch = branches.find((branch) => branch._id === branchId);
    try {
      await handleUpdate(updatedBranch);
      resetToOriginalValues(branchId);
    } catch (error) {
      console.error("Error saving branch:", error);
      setErrorMessage("Error saving branch");
    }
  };

  return (
    <Card className="h-full w-full">
      <table className="w-full min-w-0 table-auto text-center">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 ">
              <Typography
                variant="small"
                color="blue-gray"
                style={{ fontWeight: "bolder" }}
                className="font-normal leading-none opacity-70 text-center"
              >
                Branch ID
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 pl-4">
              <Typography
                variant="small"
                color="blue-gray"
                style={{ fontWeight: "bolder" }}
                className="font-normal leading-none opacity-70 text-center"
              >
                Branch Name
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 pl-4">
              <Typography
                variant="small"
                color="blue-gray"
                style={{ fontWeight: "bolder" }}
                className="font-normal leading-none opacity-70 text-center"
              >
                Location
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 pl-4">
              <Typography
                variant="small"
                color="blue-gray"
                style={{ fontWeight: "bolder" }}
                className="font-normal leading-none opacity-70 text-center"
              >
                District
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 pl-4">
              <Typography
                variant="small"
                color="blue-gray"
                style={{ fontWeight: "bolder" }}
                className="font-normal leading-none opacity-70 text-center"
              >
                Update
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                style={{ fontWeight: "bolder" }}
                className="font-normal leading-none opacity-70 text-center"
              >
                Delete
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch) => (
            <tr key={branch._id}>
              <td className="pl-3">
                <Input
                  type="text"
                  value={branch.branch_ID}
                  onChange={(e) =>
                    handleInputChange(e, branch._id, "branch_ID")
                  }
                  disabled={!editMode[branch._id]}
                />
              </td>
              <td className="pl-3">
                <Input
                  type="text"
                  value={branch.branch_name}
                  onChange={(e) =>
                    handleInputChange(e, branch._id, "branch_name")
                  }
                  disabled={!editMode[branch._id]}
                />
              </td>
              <td className="pl-3">
                <Input
                  type="text"
                  value={branch.branch_Location}
                  onChange={(e) =>
                    handleInputChange(e, branch._id, "branch_Location")
                  }
                  disabled={!editMode[branch._id]}
                />
              </td>
              <td className="pl-3">
                <Input
                  type="text"
                  value={branch.district}
                  onChange={(e) => handleInputChange(e, branch._id, "district")}
                  disabled={!editMode[branch._id]}
                />
              </td>
              <td className="pl-4">{renderSaveOrEditButton(branch._id)}</td>
              <td className="p-4">
                <Button color="red" onClick={() => handleDelete(branch._id)}>
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
