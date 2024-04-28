import React from "react";
import { SideBar } from "../../components/SideBar";

import { PaymentAdminTable } from "../../components/payment/PaymentAdminTable";

export default function AllTransactionsUI() {
  return (
    <div className="main-layout ">
      <div className="inner-layout">
        <div>
          <PaymentAdminTable />
        </div>
      </div>
    </div>
  );
}
