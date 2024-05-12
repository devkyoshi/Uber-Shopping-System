import React from "react";
import AllTransactionsUI from "../pages/payment/PaymentAdminUI";
import PaymentStats from "../components/payment/PaymentStatus";

export default function PaymentAdminProfileDetail() {
  return (
    <div>
      <PaymentStats />
      <AllTransactionsUI />
    </div>
  );
}
