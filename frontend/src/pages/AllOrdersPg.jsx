import React from "react";
import { SideBar } from "../components/SideBar";
import { AllOrders } from "../components/viewOrderCom/AllOrders";
import { useParams } from "react-router-dom";

export default function AllOrdersPg() {
  const { customerId } = useParams();
  console.log("Customer ID Found", customerId);
  return (
    <div>
      <div className="main-layout bg">
      
        <div className="inner-layout">
          <AllOrders customerId={customerId} />
        </div>
      </div>
    </div>
  );
}
