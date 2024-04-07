import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const TestHandler = (payments, navigate) => {
  navigate("/payment_update", { state: { payments: payments } });
};

export function ViewTransaction({ orderId }) {
  // Destructure orderId from props
  const [payments, setPayments] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/Payment/payments/${orderId}`
        );
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchPayments();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (!payments) {
    return <div>Error: Failed to fetch payments</div>; // Show error message
  }

  return (
    <Card className="mt-6 max-w-96 pl-2 shadow-lg">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2 ml-20 mb-5">
          Payment Details
        </Typography>

        <div>
          <div>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {/* Include a unique key for each list item */}
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>OrderID</strong>
                <span className="pl-2">: {orderId}</span>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>Email</strong>{" "}
                <span className="pl-2">: {payments.card_payment.email}</span>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>Account Holder</strong>
                <span className="pl-2">
                  : {payments.card_payment.account_holder}
                </span>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>Amount</strong> : {payments.card_payment.payment_amount}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>Status</strong> : {payments.card_payment.payment_status}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>Paid Time</strong> : {payments.card_payment.paid_time}
              </li>
            </ul>
          </div>
        </div>
      </CardBody>
      <CardFooter className="pt-0 inline-flex">
        <Button
          className="hover:bg-gray-900"
          onClick={() => TestHandler(payments, navigate)}
        >
          Update Payment
        </Button>
        <div className="pl-24">
          <Button className="bg-red-600 hover:bg-red-900">
            Cancel Payment
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
