import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { PlusCircleIcon, EyeIcon } from "@heroicons/react/24/solid";
import AddTaskDriverUI from "../../pages/taskdriver/AddTaskDriverUI";
import DriverReportIssueForm from "../../pages/taskdriver/DriverReportIssueForm";
import axios from "axios";

export function TaskDriverTab({ user_id }) {
  const [activeTab, setactiveTab] = useState("add");

  const tapMapping = {
    add: <AddTaskDriverUI user_id={user_id} />,
    view: <DriverReportIssueForm />,
  };

  const data = [
    {
      label: "Task Progress",
      value: "add",
      icon: PlusCircleIcon,
    },
    {
      label: "Make Complaint",
      value: "view",
      icon: EyeIcon,
    },
  ];

  const handleTab = async (value) => {
    setactiveTab(value);
    if (value === "add") {
      try {
        // Call the backend route to process orders
        const response = await axios.post(
          `http://localhost:8070/Task/orders/${user_id}`
        );
        console.log("Order processing response:", response.data);
        // Optionally, you can handle the response here
      } catch (error) {
        console.error("Error processing orders:", error);
        // Optionally, you can handle errors here
      }
    }
  };

  return (
    <Tabs value={activeTab}>
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => handleTab(value)}
            disabled={value === "view"}
          >
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
