import React from "react";
import { SideBar } from "../../components/SideBar";
import { PaymentTab } from "../../components/payment/PaymentTab";
import { useParams } from "react-router-dom";

export default function PaymentUI() {
  const { orderId } = useParams();
  return (
    <div className="main-layout bg">
      <SideBar />
      <div className="inner-layout">
        <div>
          <PaymentTab orderId={orderId} />
        </div>
      </div>
    </div>
  );
}
