import React from "react";
import { SideBar } from "../../components/SideBar";
import { PaymentTab } from "../../components/payment/PaymentTab";

export default function PaymentUI() {
  return (
    <div className="main-layout bg">
      <SideBar />
      <div className="inner-layout">
        <div>
          {/* TODO:this should be changed: Order ID should be passed */}
          <PaymentTab orderId={"661796ad2801abcc349b736a"} />
        </div>
      </div>
    </div>
  );
}
