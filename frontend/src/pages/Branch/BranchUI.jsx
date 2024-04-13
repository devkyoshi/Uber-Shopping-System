import React from "react";
import { SideBar } from "../../components/SideBar";
import { BranchTab } from "../../components/branch_Branch/BranchTab";

export default function BranchUI() {
  const branchID = "6615f2a45beb3dd29ad645b1"; // Example branchID

  return (
    <div className="main-layout bg">
      <SideBar />
      <div className="inner-layout">
        <BranchTab />
      </div>
    </div>
  );
}
