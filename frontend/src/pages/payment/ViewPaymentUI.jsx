import React, { useState, useEffect } from "react";
import axios from "axios";
import cardPaymentImg from "../../img/cardPayment.jpg";
import cashPaymentImg from "../../img/cashPayment.jpg";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Spinner,
  List,
  ListItem,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function ViewPaymentUI({ orderId }) {
  const [cashPaymentDetails, setCashPaymentDetails] = useState(null);
  const [cardPaymentDetails, setCardPaymentDetails] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        <div className="flex animate-pulse flex-wrap items-center gap-8">
          <div className="grid h-36 w-36 place-items-center rounded-lg bg-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-12 w-12 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>
          <div className="w-max">
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-3 w-56 rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="paragraph"
              className="mb-2 h-2 w-72 rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="paragraph"
              className="mb-2 h-2 w-72 rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="paragraph"
              className="mb-2 h-2 w-72 rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="paragraph"
              className="mb-2 h-2 w-72 rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="paragraph"
              className="mb-2 h-2 w-72 rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="paragraph"
              className="mb-2 h-2 w-72 rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
          </div>
        </div>
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
    <div className="ml-5 pl-24">
      <Card className="w-full max-w-[48rem] flex-row">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 rounded-r-none"
        >
          <img
            src={imageUrl}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <div>
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
                  <Typography variant="h5">Cash Payment Details:</Typography>
                </div>
              )}
              <List style={{ listStyleType: "none", padding: "0" }}>
                {cashPaymentDetails && (
                  <>
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
              </List>
              {cardPaymentDetails && (
                <div style={{ marginBottom: "20px" }}>
                  <Typography variant="h5">Card Payment Details:</Typography>
                </div>
              )}
              <ul style={{ listStyleType: "none", padding: "0" }}>
                {cardPaymentDetails && (
                  <>
                    <li style={{ marginBottom: "5px" }}>
                      <strong>Email:</strong> {cardPaymentDetails.email}
                    </li>
                    <li style={{ marginBottom: "5px" }}>
                      <strong>Amount: Rs. </strong>{" "}
                      {cardPaymentDetails.payment_amount}
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

            <Button size="lg" fullWidth={true} onClick={() => navigate("/")}>
              Confirm Payment
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
