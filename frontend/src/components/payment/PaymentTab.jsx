import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
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
  const [activeTab, setActiveTab] = useState("add");
  const [cashPayment, setCashPayment] = useState(false);
  const [cardPayment, setCardPayment] = useState(false);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/Payment/payment/${orderId}`
        );
        const data = response.data;
        console.log(data);
        if (data.cashPayment) {
          setCashPayment(true);
        } else if (data.cardPayment) {
          setCardPayment(true);
        } else {
          setCashPayment(false);
          setCardPayment(false);
        }
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    console.log("Payments: ", cashPayment, cardPayment);
    fetchPaymentDetails();
    const intervalId = setInterval(fetchPaymentDetails, 10000);
    return () => clearInterval(intervalId);
  }, [orderId]);

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
    setActiveTab(value);
  };

  const isAddTabDisabled = cashPayment || cardPayment;

  return (
    <Tabs value={activeTab}>
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => handleTabClick(value)}
            disabled={value === "add" && isAddTabDisabled}
          >
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
