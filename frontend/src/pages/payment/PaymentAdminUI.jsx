import React from "react";
import { SideBar } from "../../components/SideBar";

import { PaymentAdminTable } from "../../components/payment/PaymentAdminTable";

export default function AllTransactionsUI() {
  return (
    <div>
      <PaymentAdminTable />
    </div>
  );
}
