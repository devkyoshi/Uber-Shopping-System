import React, { useState } from "react";
import ComplaintAdmin from "../pages/Complaint/ComplaintAdmin";
import Performance from "../pages/Performance";
import Issue from "../components/report/Issue";
import { MenuItem, Typography } from "@material-tailwind/react";

export default function QualityAdminProfileDetail() {
  const [activeTab, setActiveTab] = useState("Component1");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="p-5">
      <div className="flex space-x-4">
        <MenuItem
          className={`flex items-center gap-3 rounded-lg ${
            activeTab === "Component1" ? "bg-gray-200" : ""
          }`}
          onClick={() => handleTabChange("Component1")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            color="blue-gray"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>

          <Typography variant="h5" color="blue-gray" className="text-center">
            Complaint
          </Typography>
        </MenuItem>
        <MenuItem
          className={`flex items-center gap-3 rounded-lg ${
            activeTab === "Component2" ? "bg-gray-200" : ""
          }`}
          onClick={() => handleTabChange("Component2")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            color="blue-gray"
            stroke="currentColor"
            class="w-6 h-6 mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>

          <Typography variant="h5" color="blue-gray">
            {" "}
            Issues
          </Typography>
        </MenuItem>
        <MenuItem
          className={`flex items-center gap-3 rounded-lg ${
            activeTab === "Component3" ? "bg-gray-200" : ""
          }`}
          onClick={() => handleTabChange("Component3")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 mr-2"
            color="blue-gray"
            m
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
            />
          </svg>

          <Typography variant="h5" color="blue-gray">
            Performance
          </Typography>
        </MenuItem>
      </div>

      <div className="mt-5">
        {activeTab === "Component1" ? <ComplaintAdmin /> : null}
        {activeTab === "Component2" ? <Issue /> : null}
        {activeTab === "Component3" ? <Performance /> : null}
      </div>
    </div>
  );
}
