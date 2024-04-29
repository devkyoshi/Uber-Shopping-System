import React, { useState } from "react";
import ComplaintAdmin from "../pages/Complaint/ComplaintAdmin";
import Performance from "../pages/Performance"
import { MenuItem} from "@material-tailwind/react";

export default function QualityAdminProfileDetail() {

  const [activeTab, setActiveTab] = useState('Component1');
  
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="p-5">
      <div className="flex space-x-4">
        
        <MenuItem
          className="wd"
          onClick={() => handleTabChange('Component1')}
        >
          Complaint
        </MenuItem>
        <MenuItem
          onClick={() => handleTabChange('Component2')}
        >
          Performance
        </MenuItem>
      </div>
      
      <div className="mt-5">
        {activeTab === 'Component1' ? <ComplaintAdmin /> : null}
        {activeTab === 'Component2' ? <Performance /> : null}
       
      </div>
    </div>
  );
}
