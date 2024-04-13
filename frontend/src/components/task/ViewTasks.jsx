import {
    Card,
    Typography,
} from "@material-tailwind/react";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function ViewTasks() {
    const [tasks, setTasks] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch all tasks from the database when the component mounts
    useEffect(() => {
        fetchTasks();
    }, []);
 
    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:8070/Task/get-all-tasks");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setErrorMessage("Error fetching tasks");
        }
    };

    return (
        <Card color="transparent" shadow={false}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h4" color="blue-gray">
                    All Tasks
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
                    {tasks.map(task => (
                        <li key={task._id} className="mb-4">
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
                        </li>
                    ))}
                </ul>
            </div>
        </Card>
    );
}
