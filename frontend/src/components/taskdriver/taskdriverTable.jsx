import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography } from "@material-tailwind/react";

const TaskdriverTable = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/Driver/tasks/6614cd0282951fe76eb0ecea`
        );
        setTasks(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError(error.message || "An error occurred while fetching tasks");
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <Card className="h-full w-full overflow-scroll">
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h4" color="blue-gray">
            My Tasks
          </Typography>
        </div>
        <Typography variant="h6" color="blue-gray" className="p-10">
          Task ID: {tasks.task_id}
        </Typography>
      </div>
    </Card>
  );
};

export default TaskdriverTable;
