import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { PlusCircleIcon, EyeIcon, CogIcon } from "@heroicons/react/24/solid";
import { ManageTask } from "./ManageTask";
import OrderTable from "./OrderTable";
import DriverTable from "./DriverTable";
import { Delivery } from "./Delivery";

export function TaskTab({ taskId }) {
  const [activeTab, setactiveTab] = useState("manage");

  const tapMapping = {
    manage: <ManageTask />,
    orders: <OrderTable />,
    drivers: <DriverTable />,
    delivery: <Delivery />,
  };

  const data = [
    {
      label: "Manage Task",
      value: "manage",
      icon: CogIcon,
    },
    {
      label: "Pending Orders",
      value: "orders",
      icon: PlusCircleIcon,
    },
    {
      label: "Available Drivers",
      value: "drivers",
      icon: PlusCircleIcon,
    },
    {
      label: "Settings",
      value: "delivery",
      icon: CogIcon,
    },
  ];

  const handleTab = (value) => {
    setactiveTab(value);
  };
  return (
    <Tabs value={activeTab}>
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value} onClick={() => handleTab(value)}>
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        <TabPanel value={activeTab}>{tapMapping[activeTab]}</TabPanel>
      </TabsBody>
    </Tabs>
  );
}
