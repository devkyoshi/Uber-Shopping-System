import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  PlusCircleIcon,
  EyeIcon
} from "@heroicons/react/24/solid";
import AddTaskDriverUI from "../../pages/taskdriver/AddTaskDriverUI";
import ViewTaskDriverUI from "../../pages/taskdriver/ViewTaskDriverUI";

 
export function TaskDriverTab() {
const [activeTab,setactiveTab]=useState("add");

  const tapMapping = {
    add: <AddTaskDriverUI />,
    view: <ViewTaskDriverUI/>
  };


  const data = [
    {
      label: "Task Progress",
      value: "add",
      icon: PlusCircleIcon,
     
    },
    {
      label: "My Information",
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