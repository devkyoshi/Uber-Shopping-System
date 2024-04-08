import React from "react";
import PaymentForm from "../../components/payment/PaymentForm";

export default function AddPaymentUI({ orderId }) {
  return (
    <div>
      <div className="ml-24">
        <PaymentForm orderId={orderId} mode={"create"} />
      </div>
    </div>
  );
}
