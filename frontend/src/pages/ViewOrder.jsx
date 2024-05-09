import React from "react";
import { OrdersTable } from "../components/viewOrderCom/OrdersTable";
import { DeliveryCard } from "../components/viewOrderCom/DeliveryCard";
import { NoteCard } from "../components/viewOrderCom/NoteCard";
import { useParams } from "react-router-dom";
import { SideBar } from "../components/SideBar";

export default function ViewOrder() {
  const { orderId } = useParams(); // Get the orderId parameter from the URL
  console.log("Order ID passed: ", orderId);
  return (
    <div className="main-layout">
      <SideBar />
      <div className="inner-layout bg">
        <div className="flex flex-wrap pb-3 justify-center">
          <OrdersTable orderId={orderId} />
        </div>
      </div>
    </div>
  );
}
