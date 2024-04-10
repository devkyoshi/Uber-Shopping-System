import {
    Card,
    Typography,
    Button,
    Input,
} from "@material-tailwind/react";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function ManageTask({taskId}) {
    const [tasks, setTasks] = useState([]);
    const [refresh, setRefersh] = useState([false]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchTasks(); 
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:8070/Task/get-all-tasks");
            setTasks(response.data);
            setRefersh(false);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setErrorMessage("Error fetching tasks");
        }
    };

    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`http://localhost:8070/Task/delete-task/${taskId}`);
            console.log("Task deleted successfully");
            fetchTasks();
            setRefersh(true);
        } catch (error) {
            console.error("Error deleting task:", error);
            setErrorMessage("Error deleting task");
        }
    };

    const handleUpdate = async (updatedTask) => {
        try {
            const response = await axios.put(`http://localhost:8070/Task/update-task/${taskId}`, updatedTask);
            console.log("Task updated successfully:", response.data);
            fetchTasks();
            setRefersh(true);
        } catch (error) {
            console.error("Error updating task:", error);
            setErrorMessage("Error updating task");
        }
    };

    const handleInputChange = (e, taskId, fieldName) => {
        const updatedTasks = tasks.map(task => {
            if (task._id === taskId) {
                console.log(`Updating ${fieldName} for task ID: ${taskId} to value: ${e.target.value}`);  // Debugging line
                return { ...task, [fieldName]: e.target.value };
            }
            return task;
        });
        setTasks(updatedTasks);
    };
    

    return (
        <Card color="transparent" shadow={false}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h4" color="blue-gray">
                    Manage Tasks
                </Typography>
            </div>

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
                                        <div className="flex mt-2">
                                            {/* <Input
                                                size="sm"
                                                value={task.order_id}
                                                onChange={(e) => handleInputChange(e, task._id, 'order_id')}
                                                className="mr-2"
                                            /> */}
                                            <Input
                                                size="sm"
                                                value={task.driver_id}
                                                readOnly
                                                className="mr-2"
                                            />
                                            <Input
                                                size="sm"
                                                value={task.task_status}
                                                onChange={(e) => handleInputChange(e, task._id, 'task_status')}
                                                className="mr-2"
                                            />
                                            <Input
                                                size="sm"
                                                value={task.route}
                                                onChange={(e) => handleInputChange(e, task._id, 'route')}
                                                className="mr-2"
                                            />
                                            <Button color="blue" onClick={() => handleUpdate(task)}>
                                                Update
                                            </Button>
                                            <Button color="red" onClick={() => handleDelete(task._id)} className="ml-2">
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
