import {
    Card,
    Typography,
    Button,
    Input,
} from "@material-tailwind/react";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function ManageBranch() {
    const [branches, setBranches] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [refresh, setRefresh] = useState(false);              // <-- Add refresh state

    useEffect(() => {
        fetchBranches();
    }, [refresh]);                                              // <-- Trigger fetchBranches when refresh state changes

    const fetchBranches = async () => {
        try {
            const response = await axios.get("http://localhost:8070/Branch/branch-all");
            setBranches(response.data);
            setRefresh(true); // <-- Reset refresh state
        } catch (error) {
            console.error("Error fetching branches:", error);
            setErrorMessage("Error fetching branches");
        }
    };

    const handleDelete = async (branchId) => {
        try {
            await axios.delete(`http://localhost:8070/Branch/branch-delete/${branchId}`);
            console.log("Branch deleted successfully");
            setRefresh(true); // <-- Set refresh state to true to trigger re-render
        } catch (error) {
            console.error("Error deleting Branch:", error);
            setErrorMessage("Error deleting Branch");
        }
    };

    const handleUpdate = async (updatedBranch) => {
        try {
            const response = await axios.put(`http://localhost:8070/Branch/branch-update/${updatedBranch._id}`, updatedBranch);
            console.log("Branch updated successfully:", response.data);
            setRefresh(true); // <-- Set refresh state to true to trigger re-render
        } catch (error) {
            console.error("Error updating branch:", error);
            setErrorMessage("Error updating branch");
        }
    };

    const handleInputChange = (e, branchId, fieldName) => {
        const updatedBranches = branches.map(branch => {
            if (branch._id === branchId) {
                console.log(`Updating ${fieldName} for branch ID: ${branchId} to value: ${e.target.value}`);  // Debugging line
                return { ...branch, [fieldName]: e.target.value };
            }
            return branch;
        });
        setBranches(updatedBranches);
    };

    return (
        <Card color="transparent" shadow={false}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h4" color="blue-gray">
                    Manage Branches
                </Typography>
            </div>

            {errorMessage && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4" role="alert">
                    <p>{errorMessage}</p>
                </div>
            )}

            <div className="mt-8">
                <ul>
                    {branches.map(branch => (
                        <li key={branch._id} className="mb-4">
                            <Card color="lightBlue">
                                <div className="flex items-center justify-between p-4">
                                    <div>
                                        <Typography variant="h6" color="blue-gray">
                                            Branch ID: {branch.branch_ID}
                                        </Typography>
                                        <Typography variant="subtitle1" color="gray">
                                            Branch Name: {branch.branch_name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="gray">
                                            Branch Location: {branch.branch_Location}
                                        </Typography>
                                        <Typography variant="subtitle1" color="gray">
                                            District: {branch.district}
                                        </Typography>
                                        {/* <Typography variant="subtitle1" color="gray">
                                            Branch Latitude: {branch.branch_Latitude}
                                        </Typography>
                                        <Typography variant="subtitle1" color="gray">
                                            Branch Longitude: {branch.branch_Longitude}
                                        </Typography> */}
                                        <div className="flex mt-2">
                                            <Input
                                                size="sm"
                                                value={branch.branch_ID}
                                                onChange={(e) => handleInputChange(e, branch._id, 'branch_ID')}
                                                className="mr-2"
                                            />
                                            <Input
                                                size="sm"
                                                value={branch.branch_name}
                                                onChange={(e) => handleInputChange(e, branch._id, 'branch_name')}
                                                className="mr-2"
                                            />
                                            <Input
                                                size="sm"
                                                value={branch.branch_Location}
                                                onChange={(e) => handleInputChange(e, branch._id, 'branch_Location')}
                                                className="mr-2"
                                            />
                                            <Input
                                                size="sm"
                                                value={branch.district}
                                                onChange={(e) => handleInputChange(e, branch._id, 'district')}
                                                className="mr-2"
                                            />
                                            {/* <Input
                                                size="sm"
                                                value={branch.branch_Latitude}
                                                onChange={(e) => handleInputChange(e, branch._id, 'branch_Latitude')}
                                                className="mr-2"
                                            />
                                            <Input
                                                size="sm"
                                                value={branch.branch_Longitude}
                                                onChange={(e) => handleInputChange(e, branch._id, 'branch_Longitude')}
                                                className="mr-2"
                                            /> */}
                                            <Button color="blue" onClick={() => handleUpdate(branch)}>
                                                Update
                                            </Button>
                                            <Button color="red" onClick={() => handleDelete(branch._id)} className="ml-2">
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
        </Card>
    );
}
