import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  EyeIcon,
  Cog6ToothIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import AddPromotion from "../../pages/promotion/AddPromotion";
import ViewPromotion from "../../pages/promotion/ViewPromotion";
import PromotionSetting from "../../pages/promotion/PromotionSetting";

export function PromotionTab({ supermarketId }) {
  const [activeTab, setactiveTab] = useState("add");
  const tapMapping = {
    add: <AddPromotion supermarketId={supermarketId} />,
    view: <ViewPromotion supermarketId={supermarketId} />,
    Setting: <PromotionSetting />,
  };
  const data = [
    {
      label: "Promotion Item",
      value: "add",
      icon: PlusCircleIcon,
    },
    {
      label: "Promotion View",
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
