import React from "react";
import PaymentForm from "./PaymentForm";

export default function PaymentSettingsUI({ orderId }) {
  return (
    <div>
      <div className="ml-24">
        <PaymentForm orderId={orderId} mode={"update"} />
      </div>
    </div>
  );
}
