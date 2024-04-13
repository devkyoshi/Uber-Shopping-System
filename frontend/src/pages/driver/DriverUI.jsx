import React from "react";
import { SideBar } from "../../components/SideBar";
import { DriverTab } from "../../components/driver/driverTab";
import { useLocation } from "react-router-dom";

export default function DriverUI() {
  const location = useLocation(); // Use useLocation hook to access location state
  const { branch_ID, district } = location.state; // Destructure branch_ID and district from location.state
  return (
    <div className="main-layout">
      <SideBar />
      <div className="inner-layout">
        <DriverTab branch_ID={branch_ID} district={district} />
      </div>
    </div>
  );
}
