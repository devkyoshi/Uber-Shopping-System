import React from "react";
import { SideBar } from "../components/SideBar";
import { AllOrders } from "../components/viewOrderCom/AllOrders";


export default function AllOrdersPg() {
  return (
    <div>
      <div className="main-layout bg">
        <SideBar />
        <div className="inner-layout">
          <AllOrders />
        </div>
      </div>
    </div>
  );
}
