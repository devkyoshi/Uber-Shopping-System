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
  EyeIcon,
} from "@heroicons/react/24/solid";
import ViewDriverUI from "../../pages/driver/ViewDriverUI";
import AddDriverUI from "../../pages/driver/AddDriverUI";
 
export function DriverTab() {

const[activeTab,setactiveTab] = useState("add");

const tapMapping ={
    add: <AddDriverUI/>,
    view:<ViewDriverUI branchID={"661760bc280cf4734d2cb9d2"}/>
}

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
  }
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