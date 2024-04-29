import React from 'react'
import { BranchTab } from '../components/branch/BranchTab'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  BuildingOfficeIcon,
  ClipboardDocumentListIcon,
  
} from "@heroicons/react/24/solid";
import { TaskTab } from '../components/task/TaskTab';

export default function RouteAdminProfileDetail() {

  const data = [
    {
      label: "Branch",
      value: "branch",
      icon: BuildingOfficeIcon,
      component: BranchTab,
    },
    {
      label: "Task",
      value: "task",
      icon: ClipboardDocumentListIcon,
      component: TaskTab,
    },
   
  ];
  return (
    <div>
      <div>
      <Tabs value="branch">
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value}>
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, component: Component }) => (
          <TabPanel key={value} value={value}>
            <Component/>
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
      </div>
    </div>
  )
}
