import React from "react";
import { SideBar } from "../../components/SideBar";
import Branch from "./Branch";

export default function BranchUI() {
  const branchID = "6614c1b511a0f59b432c8b9f"; // Example branchID
  
  return (
    <div className="main-layout bg">
      <SideBar />
      <div className="inner-layout">
        <Branch branchID={branchID} />
      </div>
    </div>
  );
}
