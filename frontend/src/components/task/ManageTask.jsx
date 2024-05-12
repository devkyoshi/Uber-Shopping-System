import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Typography,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";

export function ManageTask() {
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [editTaskId, setEditTaskId] = useState(""); // State to track which task is being edited
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [selectedDriverId, setSelectedDriverId] = useState("");

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
    console.log("taskId", taskId);
    try {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete Task ${taskId} ? There are ${orderCount} orders associated with this task.`
      );
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

  const handleBranchId = async (branchId) => {
    try {
      const response = await axios.get(
        `http://localhost:8070/Task/${branchId}/driver-all`
      );
      setAvailableDrivers(response.data);
    } catch (error) {}
  };

  const handleEdit = (taskId, branchId) => {
    setEditTaskId(taskId);
    handleBranchId(branchId);
    console.log("Branch ID:", branchId);
  };

  const handleSave = async (updatedTask) => {
    try {
      updatedTask.driver_id = selectedDriverId;
      // Make a PUT request to update the task
      console.log("In function", updatedTask);
      await axios.put(
        `http://localhost:8070/Task/update-task/${updatedTask.task_id}`,
        updatedTask
      );
      window.alert("Task updated successfully");
      setEditTaskId(""); // Reset edit task ID after saving
      fetchTasks(); // Fetch updated task list
    } catch (error) {
      console.error("Error updating task:", error);
      setErrorMessage("Error updating task");
    }
  };

  return (
    <Card className="h-full w-full">
      {errorMessage && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4"
          role="alert"
        >
          <p>{errorMessage}</p>
        </div>
      )}
      <table className="w-full min-w-min table-auto text-left">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 pl-4">
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
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 pl-4">
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
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 pl-4">
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
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 pl-4">
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
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 pl-4">
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
          {tasks.map((task) => (
            <tr key={task._id} className="mb-4">
              <td className="pl-3">
                <Input
                  type="text"
                  value={task.branch_id}
                  readOnly // Disable input if not in edit mode
                />
              </td>
              <td className="pl-3">
                {editTaskId === task.task_id ? (
                  <Select
                    name="driver_id"
                    value={selectedDriverId} // Use selectedDriverId state
                    onChange={(value) => setSelectedDriverId(value)} // Update selected driver ID
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  >
                    {availableDrivers.map((driver) => (
                      <Option key={driver.driverId} value={driver.driverId}>
                        {driver.driverName}
                      </Option>
                    ))}
                  </Select>
                ) : (
                  <Input
                    type="text"
                    value={task.driver_name}
                    readOnly={editTaskId !== task.task_id} // Disable input if not in edit mode
                  />
                )}
              </td>
              <td className="pl-3">
                <Input
                  type="text"
                  value={task.district}
                  readOnly // Disable input if not in edit mode
                />
              </td>
              <td className="pl-3 pb-4 pt-4">
                {/* Display order IDs as a list */}
                <ul>
                  {task.orders.map((order, index) => (
                    <li key={index}>{order.order_id._id}</li>
                  ))}
                </ul>
              </td>
              <td className="pl-3">
                {editTaskId === task.task_id ? (
                  <Button color="green" onClick={() => handleSave(task)}>
                    Save
                  </Button>
                ) : (
                  <Button
                    color="blue"
                    onClick={() => handleEdit(task.task_id, task.branch_id)}
                  >
                    Update
                  </Button>
                )}
              </td>
              <td className="pl-3 pr-3">
                <Button
                  color="red"
                  onClick={() => handleDelete(task.task_id, task.orders.length)}
                >
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
