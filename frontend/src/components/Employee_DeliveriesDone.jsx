import React from "react";
import TaskTable from "./taskdriver/taskdriverTable";
import { useSelector } from "react-redux";
import { TaskDriverTab } from "./taskdriver/taskdriverTab";

export default function Employee_DeliveriesDone() {
  const { currentUser } = useSelector((state) => state.user);

  console.log("Current Employee: ", currentUser._id);
  return (
    <div className="inner-layout mt-5 ml-2 mr-5">
      <TaskDriverTab user_id={currentUser._id} />
    </div>
  );
}
