import React from "react";
import payImg from "../img/payment_img.jpg";
import PaymentForm from "../components/payment/PaymentForm";

export default function Payment() {
  return (
    <div className="inner-layout flex items-center justify-center">
      <PaymentForm />
      <img
        src={payImg}
        alt="Description"
        className="ml-4"
        style={{ height: "40rem", width: "40rem" }}
      />
    </div>
  );
}
