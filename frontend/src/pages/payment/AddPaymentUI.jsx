import React, { useState, useEffect } from "react";
import PaymentForm from "../../components/payment/PaymentForm";
import axios from "axios";
import { Typography } from "@material-tailwind/react";

export default function AddPaymentUI({ orderId }) {
  const [error, setError] = useState(null);
  const [payment_amount, setTotalAmount] = useState("");

  useEffect(() => {
    const fetchPaymentAmount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/Payment/payment/${orderId}`
        );
        const { totalAmount } = response.data;
        console.log(response.data);
        setTotalAmount(totalAmount);
      } catch (error) {
        setError("Error fetching payment amount");
      }
    };
    fetchPaymentAmount();
  }, [orderId]);

  return (
    <div>
      <div className="ml-24">
        <Typography variant="h5" className="text-center mb-2">
          Total Amount To be Paid:{" "}
          <span style={{ fontWeight: "bold", color: "#87A922" }}>
            Rs. {payment_amount}
          </span>
        </Typography>
        <PaymentForm orderId={orderId} mode={"create"} />
      </div>
    </div>
  );
}
