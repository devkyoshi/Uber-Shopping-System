import React, { useState } from "react";
import ComplaintAdmin from "../pages/Complaint/ComplaintAdmin";
import Performance from "../pages/Performance"
import Issue from "../components/report/Issue"
import { MenuItem, Typography} from "@material-tailwind/react";

export default function QualityAdminProfileDetail() {

  const [activeTab, setActiveTab] = useState('Component1');
  
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="p-5">
      <div className="flex space-x-4">
        
        <MenuItem
          className="flex items-center gap-3 rounded-lg "
          onClick={() => handleTabChange('Component1')}
        >
        <Typography variant="h6">
        Complaint
        </Typography>
        </MenuItem>
        <MenuItem
          className="flex items-center rounded-lg"
          onClick={() => handleTabChange('Component2')}
        >
          <Typography variant="h6">
          Issues
          </Typography>
        </MenuItem>
        <MenuItem
          className="flex items-center rounded-lg"
          onClick={() => handleTabChange('Component3')}
        >
          <Typography variant="h6">
          Performance
          </Typography>
        </MenuItem>
      </div>
      
      <div className="mt-5">
        {activeTab === 'Component1' ? <ComplaintAdmin /> : null}
        {activeTab === 'Component2' ? <Issue /> : null}
        {activeTab === 'Component3' ? <Performance /> : null}
      </div>
    </div>
  );
}
