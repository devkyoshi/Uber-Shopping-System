import React from "react";
import payImg from "../img/payment_img.jpg";
import PaymentForm from "../components/payment/PaymentForm";

export default function Payment() {
  return (
    <div className="main-layout flex ">
      <div className="flex ">
        {" "}
        {/* Wrap PaymentForm and Image in a container */}
        <PaymentForm />
        <img
          src={payImg}
          alt="Description"
          className="ml-4 mt-40"
          style={{ height: "40rem", width: "40rem" }}
        />
      </div>
    </div>
  );
}
