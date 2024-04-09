import React from "react";
import { SideBar } from "../../components/SideBar";
import { PaymentTab } from "../../components/paymentComponent/PaymentTab";

export default function PaymentUI() {
  return (
    <div className="main-layout">
      <SideBar />
      <div className="inner-layout">
        <div>
          {/* TODO:this should be changed: Order ID should be passed */}
          <PaymentTab orderId={"66120fc9f7b97eacbe3cb331"} />
        </div>
      </div>
    </div>
  );
}
