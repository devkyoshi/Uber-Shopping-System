import React from "react";
import { DriverForm } from "../../components/driver/driverForm";

export default function AddDriverUI({ district, branch_ID }) {
  return <DriverForm district={district} branch_ID={branch_ID} />;
}
