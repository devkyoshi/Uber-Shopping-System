import React from "react";
import { SideBar } from "../../components/SideBar";
import { DriverTab } from "../../components/driver/driverTab";
import { useParams } from "react-router-dom"; // Import useParams

export default function DriverUI() {
  const { branchID } = useParams();
  const stringedBranchID = JSON.stringify(branchID);
  return (
    <div className="main-layout">
      <SideBar />
      <div className="inner-layout">
        <DriverTab branch_ID={stringedBranchID} />
      </div>
    </div>
  );
}
