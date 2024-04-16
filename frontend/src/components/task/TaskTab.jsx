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
import { TaskTable } from "./TaskTable";
import OrderTable from "./OrderTable";
import DriverTable from "./DriverTable";
import AddTask from "./AddTask";

export function TaskTab({taskId}) {
  const [activeTab, setactiveTab] = useState("add");

  const tapMapping = {
    add: <AddTask />,
    view: <TaskTable />,
    manage: <ManageTask />,
    orders: <OrderTable/>,
    drivers: <DriverTable/>
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
