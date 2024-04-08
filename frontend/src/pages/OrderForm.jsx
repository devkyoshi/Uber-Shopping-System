import React from "react";
import { SideBar } from "../components/SideBar";
import { Footer } from "../components/Footer";
import { FormOrder } from "../components/orderForm/FormOrder";

export default function OrderForm() {
  return (
    <div>
      <div className="main-layout bg">
        <SideBar />
        <div className="inner-layout">
          <FormOrder />
        </div>
      </div>
      <Footer />
    </div>
  );
}
