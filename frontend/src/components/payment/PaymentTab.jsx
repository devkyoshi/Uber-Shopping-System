import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  CurrencyDollarIcon,
  EyeIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import AddPaymentUI from "../../pages/payment/AddPaymentUI";
import ViewPaymentUI from "../../pages/payment/ViewPaymentUI";
import PaymentSettingsUI from "./PaymentSettingsUI";

export function PaymentTab({ orderId }) {
  const [activeTab, setActiveTab] = useState("add"); // State to track the active tab

  // Mapping between tab values and corresponding components
  const tabComponentMapping = {
    add: <AddPaymentUI orderId={orderId} />,
    view: <ViewPaymentUI orderId={orderId} />,
    settings: <PaymentSettingsUI orderId={orderId} />,
  };

  const data = [
    {
      label: "Payment",
      value: "add",
      icon: CurrencyDollarIcon,
    },
    {
      label: "View Payment",
      value: "view",
      icon: EyeIcon,
    },
    {
      label: "Settings",
      value: "settings",
      icon: Cog6ToothIcon,
    },
  ];

  const handleTabClick = (value) => {
    setActiveTab(value); // Update the active tab based on clicked tab value
  };

  return (
    <Tabs value={activeTab}>
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value} onClick={() => handleTabClick(value)}>
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        <TabPanel value={activeTab}>{tabComponentMapping[activeTab]}</TabPanel>
      </TabsBody>
    </Tabs>
  );
}
