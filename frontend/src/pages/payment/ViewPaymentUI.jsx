import React, { useState, useEffect } from "react";
import axios from "axios";
import cardPaymentImg from "../../img/cardPayment.jpg";
import cashPaymentImg from "../../img/cashPayment.jpg";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Spinner,
} from "@material-tailwind/react";

export default function ViewPaymentUI({ orderId }) {
  const [cashPaymentDetails, setCashPaymentDetails] = useState(null);
  const [cardPaymentDetails, setCardPaymentDetails] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/Payment/payment/${orderId}`
        );
        const data = response.data;
        console.log("data:", data);
        setCashPaymentDetails(data.cashPayment);
        setCardPaymentDetails(data.cardPayment);
        setLoading(false);

        // Determine payment method and set image URL accordingly
        if (data.cashPayment) {
          setImageUrl(cashPaymentImg);
        } else if (data.cardPayment) {
          setImageUrl(cardPaymentImg);
        }
      } catch (error) {
        console.error("Error fetching payment details:", error);
        setError("An error occurred while fetching payment details.");
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!cashPaymentDetails && !cardPaymentDetails) {
    return (
      <div className="pl-16 ml-24">
        No payment details available for this order.
      </div>
    );
  }

  return (
    <div className="ml-24 pl-24">
      <Card className="w-full max-w-[26rem] shadow-lg">
        <CardHeader floated={false} color="blue-gray">
          <img src={imageUrl} alt="Payment" />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        </CardHeader>
        <CardBody>
          <div className="mb-3 flex-row items-center justify-between">
            <Typography
              variant="h5"
              color="blue-gray"
              className="font-medium pl-10 ml-5"
              style={{ fontWeight: "bold" }}
            >
              Payment Details for Order
            </Typography>
            <div className="items-center ml-10">
              Order ID:{" "}
              <span
                style={{ fontWeight: "bold", color: "#ff6666" }}
                className=""
              >
                {orderId}
              </span>
            </div>
          </div>
          <Typography color="blue-gray">
            {cashPaymentDetails && (
              <div style={{ marginBottom: "20px" }}>
                <h3>Cash Payment Details:</h3>
              </div>
            )}
            <ul style={{ listStyleType: "none", padding: "0" }}>
              {cashPaymentDetails && (
                <>
                  <li style={{ marginBottom: "5px" }}>
                    <strong>Payment Method:</strong> Cash Payment
                  </li>
                  <li style={{ marginBottom: "5px" }}>
                    <strong>Email:</strong> {cashPaymentDetails.email}
                  </li>
                  <li style={{ marginBottom: "5px" }}>
                    <strong>Amount: Rs. </strong>{" "}
                    {cashPaymentDetails.payment_amount}
                  </li>
                  <li style={{ marginBottom: "5px" }}>
                    <strong>District:</strong> {cashPaymentDetails.district}
                  </li>
                  <li style={{ marginBottom: "5px" }}>
                    <strong>Address:</strong> {cashPaymentDetails.address}
                  </li>
                  <li style={{ marginBottom: "5px" }}>
                    <strong>Postal Code:</strong>{" "}
                    {cashPaymentDetails.postal_code}
                  </li>
                  <li style={{ marginBottom: "5px" }}>
                    <strong>Paid Time:</strong> {cashPaymentDetails.paid_time}
                  </li>
                  <li style={{ marginBottom: "5px" }}>
                    <strong>Payment Status:</strong>{" "}
                    {cashPaymentDetails.payment_status}
                  </li>
                </>
              )}
            </ul>
            {cardPaymentDetails && (
              <div style={{ marginBottom: "20px" }}>
                <h3>Card Payment Details:</h3>
              </div>
            )}
            <ul style={{ listStyleType: "none", padding: "0" }}>
              {cardPaymentDetails && (
                <>
                  <li style={{ marginBottom: "5px" }}>
                    <strong>Payment Method:</strong> Card Payment
                  </li>
                  <li style={{ marginBottom: "5px" }}>
                    <strong>Email:</strong> {cardPaymentDetails.email}
                  </li>
                  <li style={{ marginBottom: "5px" }}>
                    <strong>Amount:</strong> {cardPaymentDetails.payment_amount}
                  </li>
                  <li style={{ marginBottom: "5px" }}>
                    <strong>Account Holder:</strong>{" "}
                    {cardPaymentDetails.account_holder}
                  </li>
                  <li style={{ marginBottom: "5px" }}>
                    <strong>Payment Status:</strong>{" "}
                    {cardPaymentDetails.payment_status}
                  </li>
                  <li style={{ marginBottom: "5px" }}>
                    <strong>Paid Time:</strong> {cardPaymentDetails.paid_time}
                  </li>
                </>
              )}
            </ul>
          </Typography>
        </CardBody>
        <CardFooter className="pt-3">
          <Button size="lg" fullWidth={true}>
            Confirm Payment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
