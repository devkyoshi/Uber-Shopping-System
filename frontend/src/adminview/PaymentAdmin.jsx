import React from "react";
import AllTransactionsUI from "../pages/payment/PaymentAdminUI";
import PaymentStats from "../components/payment/PaymentStatus";
import { Typography } from "@material-tailwind/react";

export default function PaymentAdminProfileDetail() {
  return (
    <div className="p-5 rounded-lg">
      <Typography variant="h3" className="text-center mb-5" color="blue-gray">
        Payment Admin DashBoard
      </Typography>
      <PaymentStats />
      <AllTransactionsUI />
    </div>
  );
}
