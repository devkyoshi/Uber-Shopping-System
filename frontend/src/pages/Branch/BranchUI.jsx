import React from "react";
import { SideBar } from "../../components/SideBar";
import Branch from "./Branch";

export default function BranchUI() {
  const branchID = "6615f2a45beb3dd29ad645b1"; // Example branchID
  
  return (
    <div className="main-layout bg">
      <SideBar />
      <div className="inner-layout">
        <Branch branchID={branchID} />
      </div>
    </div>
  );
}
