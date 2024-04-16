import { Card, Typography, Button } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Import Link from React Router

const TABLE_HEAD = [
  "Task ID",
  "Branch ID",
  "Driver ID",
  "District",
  "Order ID"
];

export function TaskTable() {
  const [taskList, setTaskList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/Task/tasks"
        );
        console.log('data:', response);
        setTaskList(response.data);
      } catch (error) {
        console.error("Error fetching Task:", error);
        setErrorMessage("Error fetching Task");
      }
    };

    fetchTask();
  }, []);

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                    variant="small"
                    color="blue-gray"
                    style={{ fontWeight: "bolder" }}
                    className="font-normal leading-none opacity-70 text-center"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {taskList.map(task => (
            <tr key={task._id}>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {task.task_id}
                </Typography>
              </td>
              <td className="p-4 bg-blue-gray-50/50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {task.branch_id}
                </Typography>
              </td> 
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {task.driver_id}
                </Typography>
              </td>    
              <td className="p-4 bg-blue-gray-50/50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {task.district}
                </Typography>
              </td>
              
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {task.orders.map((order) => order.order_id._id).join(", ")}
                </Typography>   
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
