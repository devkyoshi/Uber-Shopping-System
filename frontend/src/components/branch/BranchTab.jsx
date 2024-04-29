import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { PlusCircleIcon, EyeIcon, CogIcon } from "@heroicons/react/24/solid";
import { AddBranch } from "./AddBranch";
import { ManageBranch } from "./ManageBranch";
import { BranchTable } from "./BranchTable";

export function BranchTab() {
  const [activeTab, setactiveTab] = useState("add");

  const tapMapping = {
    add: <AddBranch />,
    view: <BranchTable />,
    manage: <ManageBranch />,
  };

  const data = [
    {
      label: "Add Branch",
      value: "add",
      icon: PlusCircleIcon,
    },
    {
      label: "View Branch",
      value: "view",
      icon: EyeIcon,
    },
    {
      label: "Manage Branch",
      value: "manage",
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
