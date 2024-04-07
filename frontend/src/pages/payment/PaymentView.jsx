import React, { useState } from "react";
import { ViewTransaction } from "../../components/payment/ViewTransaction";
import { StepperPayment } from "../../components/payment/StepperPayment";
import { SideBar } from "../../components/SideBar";
import UpdatePaymentPage from "./UpdatePaymentPage";

export default function PaymentView() {
  const [paymentToUpdate, setPaymentToUpdate] = useState(null);

  const handleUpdatePayment = (payment) => {
    setPaymentToUpdate(payment);
    console.log(
      "Navigate to update payment page with payment details:",
      payment
    );
  };

  return (
    <div className="main-layout">
      <SideBar />
      <div className="inner-layout">
        <div>
          <StepperPayment activeStepParam={1} />
        </div>
        <div className="ml-32 pl-32">
          <ViewTransaction
            orderId={"66120fc9f7b97eacbe3cb331"}
            onUpdatePayment={handleUpdatePayment}
          />
          {paymentToUpdate && <UpdatePaymentPage payment={paymentToUpdate} />}
        </div>
      </div>
    </div>
  );
}
