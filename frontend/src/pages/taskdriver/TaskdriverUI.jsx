import React from "react";
import { SideBar } from "../../components/SideBar";
import { TaskDriverTab } from "../../components/taskdriver/taskdriverTab";
import { Typography } from "@material-tailwind/react";

export default function TaskdriverUI() {
  return (
    <div className="main-layout">
      <SideBar />
      <div className="inner-layout">
        <TaskDriverTab />
      </div>
    </div>
  );
}
