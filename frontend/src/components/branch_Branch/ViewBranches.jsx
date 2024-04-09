import {
    Card,
    Typography,
} from "@material-tailwind/react";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function ViewBranches() {
    const [Branch, setBranch] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch all Branch from the database when the component mounts
    useEffect(() => {
        fetchBranch();
    }, []);

    const fetchBranch = async () => {
        try {
            const response = await axios.get("http://localhost:8070/Branch/branch-all");
            setBranch(response.data);
        } catch (error) {
            console.error("Error fetching Branch:", error);
            setErrorMessage("Error fetching Branch");
        }
    };

    return (
        <Card color="transparent" shadow={false}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h4" color="blue-gray">
                    All Branch
                </Typography>
            </div>

            {errorMessage && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4" role="alert">
                    <p>{errorMessage}</p>
                </div>
            )}

            <div className="mt-8">
                <ul>
                    {Branch.map(branch => (
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
                                        <Typography variant="subtitle1" color="gray">
                                            Branch Latitude: {branch.branch_Latitude}
                                        </Typography>
                                        <Typography variant="subtitle1" color="gray">
                                            Branch Longitude: {branch.branch_Longitude}
                                        </Typography>
                                        
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
