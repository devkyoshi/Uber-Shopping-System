import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Card,
    Typography,
    Button,
    Input,
} from "@material-tailwind/react";

export function ManageTask() {
    const [tasks, setTasks] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [editTaskId, setEditTaskId] = useState(""); // State to track which task is being edited

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:8070/Task/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setErrorMessage("Error fetching tasks");
        }
    };

    const handleDelete = async (taskId, orderCount) => {
        console.log('taskId', taskId);
        try {
            const confirmDelete = window.confirm(`Are you sure you want to delete Task ${taskId} ? There are ${orderCount} orders associated with this task.`);
            if (confirmDelete) {
                await axios.delete(`http://localhost:8070/Task/delete-task/${taskId}`);
                console.log("Task deleted successfully");
                fetchTasks();
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            setErrorMessage("Error deleting task");
        }
    };
    

    const handleInputChange = (e, taskId, fieldName) => {
        const { value } = e.target;
        let filteredValue = value;
    
        // Apply input validation based on the field name
        switch (fieldName) {
            
            case "branch_id":
                filteredValue = value.replace(/[^a-zA-Z0-9\s]/g, "");
                break;
            case "driver_id":
                filteredValue = value.replace(/[^a-zA-Z0-9\s]/g, "");
                break;
            case "district":
                filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
                break;
            default:
                break;
        }
    
        setTasks(prevTasks => {
            return prevTasks.map(task => {
                if (task.task_id === taskId) {
                    console.log(`Updating ${fieldName} for task ID: ${task.task_id} to value: ${filteredValue}`);
                    return { ...task, [fieldName]: filteredValue };
                }
                return task;
            });
        });
    };
    

    const handleEdit = (taskId) => {
        setEditTaskId(taskId); // Set the task ID being edited
    };

    const handleSave = async (updatedTask) => {
        try {
            // Make a PUT request to update the task
            console.log("In function", updatedTask);
            await axios.put(`http://localhost:8070/Task/update-task/${updatedTask.task_id}`, updatedTask);
            console.log("Task updated successfully");
            setEditTaskId(""); // Reset edit task ID after saving
            fetchTasks(); // Fetch updated task list
        } catch (error) {
            console.error("Error updating task:", error);
            setErrorMessage("Error updating task");
        }
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
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                                variant="small"
                                readOnly
                                color="blue-gray"
                                style={{ fontWeight: "bolder" }}
                                className="font-normal leading-none opacity-70 text-center"
                            >
                                Task ID
                            </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                                variant="small"
                                readOnly
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
                                readOnly
                                color="blue-gray"
                                style={{ fontWeight: "bolder" }}
                                className="font-normal leading-none opacity-70 text-center"
                            >
                                Driver ID
                            </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                                variant="small"
                                readOnly
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
                                readOnly
                                color="blue-gray"
                                style={{ fontWeight: "bolder" }}
                                className="font-normal leading-none opacity-70 text-center"
                            >
                                Order Id
                            </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                                variant="small"
                                readOnly
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
                                readOnly
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
                                    value={task.task_id}
                                    onChange={(e) => handleInputChange(e, task.task_id, 'task_id')}
                                    readOnly // Disable input if not in edit mode
                                />
                            </td>
                            <td className="p-4">
                                <Input
                                    type="text"
                                    value={task.branch_id}
                                    onChange={(e) => handleInputChange(e, task.task_id, 'branch_id')}
                                    readOnly={editTaskId !== task.task_id} // Disable input if not in edit mode
                                />
                            </td>
                            <td className="p-4">
                                <Input
                                    type="text"
                                    value={task.driver_id}
                                    onChange={(e) => handleInputChange(e, task.task_id, 'driver_id')}
                                    readOnly={editTaskId !== task.task_id} // Disable input if not in edit mode
                                />
                            </td>
                            <td className="p-4">
                                <Input
                                    type="text"
                                    value={task.district}
                                    onChange={(e) => handleInputChange(e, task.task_id, 'district')}
                                    readOnly={editTaskId !== task.task_id} // Disable input if not in edit mode
                                />
                            </td>
                            <td className="p-4">
                                {/* Display order IDs as a list */}
                                <ul>
                                    {task.orders.map((order, index) => (
                                        <li key={index}>{order.order_id._id}</li>
                                    ))}
                                </ul>
                            </td>
                            <td className="p-4">
                                {editTaskId === task.task_id ? (
                                    <Button color="green" onClick={() => handleSave(task)}>
                                        Save
                                    </Button>
                                ) : (
                                    <Button color="blue" onClick={() => handleEdit(task.task_id)}>
                                        Update
                                    </Button>
                                )}
                            </td>
                            <td className="p-4">
                                <Button color="red" onClick={() => handleDelete(task.task_id, task.orders.length)} className="ml-2">
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
