import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Card,
    Typography,
    Button,
    Input,
} from "@material-tailwind/react";

export function ManageTask({ taskId }) {
    const [tasks, setTasks] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:8070/Task/get-all-tasks");
            setTasks(response.data);
            setRefresh(false);
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
            setRefresh(true);
        } catch (error) {
            console.error("Error deleting task:", error);
            setErrorMessage("Error deleting task");
        }
    };

    const handleUpdate = async (updatedTask) => {
        try {
            const response = await axios.put(`http://localhost:8070/Task/update-task/${updatedTask._id}`, updatedTask);
            console.log("Task updated successfully:", response.data);
            fetchTasks();
            setRefresh(true);
        } catch (error) {
            console.error("Error updating task:", error);
            setErrorMessage("Error updating task");
        }
    };

    const handleInputChange = (e, taskId, fieldName) => {
        const updatedTasks = tasks.map(task => {
            if (task._id === taskId) {
                console.log(`Updating ${fieldName} for task ID: ${taskId} to value: ${e.target.value}`);
                return { ...task, [fieldName]: e.target.value };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    return (
        <Card className="h-full w-full overflow-scroll">
            {errorMessage && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4" role="alert">
                    <p>{errorMessage}</p>
                </div>
            )}
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
                                Task ID
                            </Typography>
                        </th>
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
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 ">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                style={{ fontWeight: "bolder" }}
                                className="font-normal leading-none opacity-70 text-center"
                            >
                                Order ID
                            </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 ">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                style={{ fontWeight: "bolder" }}
                                className="font-normal leading-none opacity-70 text-center"
                            >
                                Driver ID
                            </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 ">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                style={{ fontWeight: "bolder" }}
                                className="font-normal leading-none opacity-70 text-center"
                            >
                                District
                            </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 ">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                style={{ fontWeight: "bolder" }}
                                className="font-normal leading-none opacity-70 text-center"
                            >
                                Update
                            </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 ">
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
                    {tasks.map(task => (
                        <tr key={task._id} className="mb-4">
                            <td className="p-4">
                                <Input
                                    type="text"
                                    readOnly
                                    value={task.task_id}
                                    onChange={(e) => handleInputChange(e, task._id, 'task._id')}
                                />
                            </td>
                            <td className="p-4">
                                <Input
                                    type="text"
                                    readOnly
                                    value={task.branch_id}
                                    onChange={(e) => handleInputChange(e, task._id, 'branch_id')}
                                />
                            </td>
                            <td className="p-4">
                                <Input
                                    type="text"
                                    readOnly
                                    value={task.order_id}
                                    onChange={(e) => handleInputChange(e, task._id, 'order_id')}
                                />
                            </td>
                            <td className="p-4">
                                <Input
                                    type="text"
                                    value={task.driver_id}
                                    onChange={(e) => handleInputChange(e, task._id, 'driver_id')}
                                />
                            </td>
                            <td className="p-4">
                                <Input
                                    type="text"
                                    readOnly
                                    value={task.nearest_town}
                                    onChange={(e) => handleInputChange(e, task._id, 'district')}
                                />
                            </td>
                            <td className="p-4">
                                <Button color="blue" onClick={() => handleUpdate(task)}>
                                    Update
                                </Button>
                            </td>
                            <td className="p-4">
                                <Button color="red" onClick={() => handleDelete(task._id)} className="ml-2">
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
