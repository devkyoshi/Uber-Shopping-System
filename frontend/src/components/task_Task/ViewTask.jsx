import {
    Card,
    Typography,
} from "@material-tailwind/react";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function ViewTask({ taskId }) {
    const [task, setTask] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch the task from the database when the component mounts or taskId changes
    useEffect(() => {
        fetchTask();
    }, [taskId]);
 
    const fetchTask = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/Task/get-task/${taskId}`);
            console.log("API Response:", response.data);
            setTask(response.data);
        } catch (error) {
            console.error("Error fetching task:", error);
            setErrorMessage("Error fetching task");
        }
    };

    if (!task) {
        return (
            <Card color="transparent" shadow={false}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h4" color="blue-gray">
                        My Task
                    </Typography>
                </div>

                {/* Dropdown notification for error message */}
                {errorMessage && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4" role="alert">
                        <p>{errorMessage}</p>
                    </div>
                )}

                <div className="mt-8">
                    <Typography variant="subtitle1" color="gray">
                        Loading...
                    </Typography>
                </div>
            </Card>
        );
    }

    return (
        <Card color="transparent" shadow={false}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h4" color="blue-gray">
                    My Task
                </Typography>
            </div>

            {/* Dropdown notification for error message */}
            {errorMessage && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4" role="alert">
                    <p>{errorMessage}</p>
                </div>
            )}

            <div className="mt-8">
                <ul>
                    <Card color="lightBlue">
                        <div className="flex items-center justify-between p-4">
                            <div>
                                {/* <Typography variant="h6" color="blue-gray">
                                    Order ID: {task.order_id}
                                </Typography> */}
                                <Typography variant="h6" color="blue-gray">
                                    Driver ID: {task.driver_id}
                                </Typography>
                                <Typography variant="subtitle1" color="gray">
                                    Task Status: {task.task_status}
                                </Typography>
                                <Typography variant="subtitle1" color="gray">
                                    Route: {task.route}
                                </Typography>
                            </div>
                        </div>
                    </Card>
                </ul>
            </div>
        </Card>
    );
}
