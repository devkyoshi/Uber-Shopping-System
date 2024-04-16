import React from "react";
import { SideBar } from "../../components/SideBar";
import { TaskTab } from "../../components/task/TaskTab";

export default function TaskUI() {
  const taskId = "661c76e013fe261663285163"; // Example taskId
  const orderId = "66120fc9f7b97eacbe3cb331";
  const driverId = "6614cd0282951fe76eb0ecea";
  const branchID = "6611f62b50033ea2c700995b";

  return (
    <div className="main-layout bg">
      <SideBar />
        <div className="inner-layout">
          <TaskTab taskId={taskId} orderId={orderId} driverId={driverId} branchID={branchID} />
        </div>
      </div>
  );
}
