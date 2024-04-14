import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { PlusCircleIcon, EyeIcon, CogIcon } from "@heroicons/react/24/solid";
import { ViewTasks } from "./ViewTasks";
import { ManageTask } from "./ManageTask";
import AddTask from "./AddTask";

export function TaskTab() {
  const [activeTab, setactiveTab] = useState("add");

  const tapMapping = {
    add: <AddTask />,
    view: <ViewTasks />,
    manage: <ManageTask />,
  };

  const data = [
    {
      label: "Add Task",
      value: "add",
      icon: PlusCircleIcon,
    },
    {
      label: "View Task",
      value: "view",
      icon: EyeIcon,
    },
    {
      label: "Manage Task",
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
