import React from "react";
import { SideBar } from "../../components/SideBar";
import { StepperPayment } from "../../components/payment/StepperPayment";

export default function UpdatePaymentPage() {
  return (
    <div className="main-layout">
      <SideBar />
      <div className="inner-layout">
        <div>
          <StepperPayment activeStepParam={0} />
        </div>
        <div className="ml-24"></div>
      </div>
    </div>
  );
}
