import React, { useState, useEffect } from "react";
import axios from "axios";

const PaymentTable = ({ orderId }) => {
  const [payments, setPayments] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/Payment/payments/${orderId}`
        ); // Assuming this endpoint returns payment details for a specific order
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, [orderId]);

  if (!payments) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Payment Details for Order {orderId}</h2>
      <div>
        <h3>Card Payment:</h3>
        <ul>
          <li>
            <strong>Email:</strong> {payments.card_payment.email}
          </li>
          <li>
            <strong>Account Number:</strong>{" "}
            {payments.card_payment.account_number}
          </li>
          <li>
            <strong>Expiration:</strong> {payments.card_payment.exp}
          </li>
          <li>
            <strong>CVC:</strong> {payments.card_payment.cvc}
          </li>
          <li>
            <strong>Account Holder:</strong>{" "}
            {payments.card_payment.account_holder}
          </li>
          <li>
            <strong>Amount:</strong> {payments.card_payment.payment_amount}
          </li>
          <li>
            <strong>Status:</strong> {payments.card_payment.payment_status}
          </li>
          <li>
            <strong>Paid Time:</strong> {payments.card_payment.paid_time}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PaymentTable;
