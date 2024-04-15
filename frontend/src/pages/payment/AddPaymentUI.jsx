import React, { useState, useEffect } from "react";
import PaymentForm from "../../components/payment/PaymentForm";
import axios from "axios";

//Crazy Ashan always angry

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
        <h2 className="ml-24 pl-24">
          Total Amount To be Paid:{" "}
          <span style={{ fontWeight: "bold", color: "#87A922" }}>
            Rs. {payment_amount}
          </span>
        </h2>
        <PaymentForm orderId={orderId} mode={"create"} />
      </div>
    </div>
  );
}
