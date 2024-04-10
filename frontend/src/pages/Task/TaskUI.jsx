import React from "react";
import { SideBar } from "../../components/SideBar";
import Task from "./Task";

export default function TaskUI() {
  const taskId = "6615ce6a66d9ecafbe566b0f"; // Example taskId
  const orderId = "66120fc9f7b97eacbe3cb331";
  const driverId = "6614cd0282951fe76eb0ecea";
  const branchID = "6611f62b50033ea2c700995b";

  return (
      <div className="inner-layout">
        <Task taskId={taskId} orderId={orderId} driverId={driverId} branchID={branchID} />
      </div>
  );
}
