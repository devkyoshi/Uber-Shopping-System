import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { PlusCircleIcon, EyeIcon } from "@heroicons/react/24/solid";
import ViewDriverUI from "../../pages/driver/ViewDriverUI";
import AddDriverUI from "../../pages/driver/AddDriverUI";

export function DriverTab({ branch_ID, district }) {
  const [activeTab, setactiveTab] = useState("add");

  const tapMapping = {
    add: <AddDriverUI branch_ID={branch_ID} district={district} />,
    view: <ViewDriverUI  branch_ID={branch_ID} district={district}/>,
  };

  const data = [
    {
      label: "AddDriver",
      value: "add",
      icon: PlusCircleIcon,
    },
    {
      label: "ViewDriver",
      value: "view",
      icon: EyeIcon,
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
