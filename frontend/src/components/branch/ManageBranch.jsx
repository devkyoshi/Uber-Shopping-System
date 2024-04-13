import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
            const response = await axios.get("http://localhost:8070/Branch/branch-all");
            setBranches(response.data.map(branch => ({ ...branch, originalValues: { ...branch } })));  
            setRefresh(false);
        } catch (error) {
            console.error("Error fetching branches:", error);
            setErrorMessage("Error fetching branches");
        }
    };

    const handleDelete = async (branchId) => {
        try {
            const response = await axios.get(`http://localhost:8070/Driver/${branchId}/driver-all`);
            const drivers = response.data;
    
            if (drivers.length > 0) {
                const confirmDelete = window.confirm(`There are ${drivers.length} drivers in this branch. Are you sure you want to delete it?`);
                
                if (!confirmDelete) {
                    return;
                }
            }
    
            await axios.delete(`http://localhost:8070/Branch/branch-delete/${branchId}`);
            console.log("Branch deleted successfully");
            setRefresh(true);
        } catch (error) {
            console.error("Error deleting Branch:", error);
            setErrorMessage("Error deleting Branch");
        }
    };

    const handleUpdate = async (updatedBranch) => {
        try {
            const response = await axios.put(`http://localhost:8070/Branch/branch-update/${updatedBranch._id}`, updatedBranch);
            console.log("Branch updated successfully:", response.data);
            setRefresh(true);
        } catch (error) {
            console.error("Error updating branch:", error);
            setErrorMessage("Error updating branch");
        }
    };

    const handleInputChange = (e, branchId, fieldName) => {
        const updatedBranches = branches.map(branch => {
            if (branch._id === branchId) {
                return { 
                    ...branch,
                    [fieldName]: e.target.value 
                };
            }
            return branch;
        });
        setBranches(updatedBranches);
    };

    const resetToOriginalValues = (branchId) => {
        const updatedBranches = branches.map(branch => {
            if (branch._id === branchId) {
                return { 
                    ...branch,
                    ...branch.originalValues  
                };
            }
            return branch;
        });
        setBranches(updatedBranches);
    };

    return (
        <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 ">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                style={{ fontWeight: "bolder" }}
                                className="font-normal leading-none opacity-70 text-center"
                            >
                                Branch ID
                            </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                style={{ fontWeight: "bolder" }}
                                className="font-normal leading-none opacity-70 text-center"
                            >
                                Branch Name
                            </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                style={{ fontWeight: "bolder" }}
                                className="font-normal leading-none opacity-70 text-center"
                            >
                                Location
                            </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                style={{ fontWeight: "bolder" }}
                                className="font-normal leading-none opacity-70 text-center"
                            >
                                District
                            </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
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
                    {branches.map(branch => (
                        <tr key={branch._id}>
                            <td className="p-4">
                                <Input
                                    type="text"
                                    value={branch.branch_ID}
                                    onChange={(e) => handleInputChange(e, branch._id, 'branch_ID')}
                                />
                            </td>
                            <td className="p-4">
                                <Input
                                    type="text"
                                    value={branch.branch_name}
                                    onChange={(e) => handleInputChange(e, branch._id, 'branch_name')}
                                    
                                />
                            </td>
                            <td className="p-4">
                                <Input
                                    type="text"
                                    value={branch.branch_Location}
                                    onChange={(e) => handleInputChange(e, branch._id, 'branch_Location')}
                                />
                            </td>
                            <td className="p-4">
                                <Input                      
                                    type="text"
                                    value={branch.district}
                                    onChange={(e) => handleInputChange(e, branch._id, 'district')}
                                />
                            </td>
                            <td className="p-4">
                                <Button color="blue" onClick={() => { handleUpdate(branch); resetToOriginalValues(branch._id); }}>
                                    Update
                                </Button>
                            </td>
                            <td className="p-4">
                                <Button color="red" onClick={() => handleDelete(branch._id)} className="ml-2">
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
