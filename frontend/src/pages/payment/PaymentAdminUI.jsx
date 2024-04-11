import React from "react";
import { SideBar } from "../../components/SideBar";

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { PaymentAdminTable } from "../../components/payment/PaymentAdminTable";

export default function PaymentAdminUI() {
  return (
    <div className="main-layout ">
      <SideBar />
      <div className="inner-layout">
        <div>
          <PaymentAdminTable />
        </div>
      </div>
    </div>
  );
}
