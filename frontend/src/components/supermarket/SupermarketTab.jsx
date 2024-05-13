import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import AddSupermarket from "../../pages/supermarket/AddSupermarket";
import ViewSupermarket from "../../pages/supermarket/ViewSupermarket";
import SettingSupermarketUI from "../../pages/supermarket/SettingSupermarketUI";

export function SupermarketTab() {
  const [activeTab, setactiveTab] = useState("add");

  const tapMapping = {
    add: <AddSupermarket />,
    view: <ViewSupermarket />,
    settings: <SettingSupermarketUI />,
  };
  const data = [
    {
      label: "Register",
      value: "add",
      icon: Square3Stack3DIcon,
    },
    {
      label: "View Supermarket",
      value: "view",
      icon: UserCircleIcon,
    },
    {
      label: "Item & Promotion",
      value: "settings",
      icon: Cog6ToothIcon,
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
