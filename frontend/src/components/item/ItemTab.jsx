import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { PlusCircleIcon, EyeIcon, CogIcon } from "@heroicons/react/24/solid";
import AddItemUI from "../../pages/item/AddItemUI";
import ItemsSettingsUI from "../../pages/item/ItemsSettingsUI";
import { ViewItemsUI } from "../../pages/item/ViewItemsUI";

export function ItemTab({ supermarketId }) {
  const [activeTab, setactiveTab] = useState("add"); //Set Active Tab Variable

  const tabMapping = {
    add: <AddItemUI supermarketId={supermarketId} />,
    view: <ViewItemsUI supermarketId={supermarketId} />,
    settings: <ItemsSettingsUI />,
  };

  const data = [
    {
      label: "Add Item",
      value: "add",
      icon: PlusCircleIcon,
    },
    {
      label: "View Item",
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
        <TabPanel value={activeTab}>{tabMapping[activeTab]}</TabPanel>
      </TabsBody>
    </Tabs>
  );
}
