import React from "react";
import payImg from "../img/payment_img.jpg";
import PaymentForm from "../components/payment/PaymentForm";
import { SideBar } from "../components/SideBar";
import { StepperPayment } from "../components/payment/StepperPayment";

export default function Payment() {
  return (
    <div className="main-layout">
      <SideBar />
      <div className="inner-layout">
        <div>
          <StepperPayment activeStepParam={0} />
        </div>
        <div className="ml-24">
          <PaymentForm />
        </div>
      </div>
    </div>
  );
}
