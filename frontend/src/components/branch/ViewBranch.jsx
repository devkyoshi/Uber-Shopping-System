import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography } from "@material-tailwind/react";

export function ViewBranch({ branchID }) {
  const [Branch, setBranch] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchBranch();
  }, [branchID]);

  const fetchBranch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8070/Branch/branch/${branchID}`
      );
      console.log("API Response:", response.data);
      setBranch(response.data);
    } catch (error) {
      console.error("Error fetching Branch:", error);
      setErrorMessage("Error fetching Branch");
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4" color="blue-gray">
          My Branch
        </Typography>
      </div>

      {errorMessage && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4"
          role="alert"
        >
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="mt-8">
        <ul>
          <li className="mb-4">
            <Card color="lightBlue">
              <div className="flex items-center justify-between p-4">
                <div>
                  <Typography variant="h6" color="blue-gray">
                    Branch ID: {Branch.branch_ID}
                  </Typography>
                  <Typography variant="subtitle1" color="gray">
                    Branch Name: {Branch.branch_name}
                  </Typography>
                  <Typography variant="subtitle1" color="gray">
                    Branch Location: {Branch.branch_Location}
                  </Typography>
                  <Typography variant="subtitle1" color="gray">
                    District: {Branch.district}
                  </Typography>
                  {/* <Typography variant="subtitle1" color="gray">
                    Branch Latitude: {Branch.branch_Latitude}
                  </Typography>
                  <Typography variant="subtitle1" color="gray">
                    Branch Longitude: {Branch.branch_Longitude}
                  </Typography> */}
                </div>
              </div>
            </Card>
          </li>
        </ul>
      </div>
    </Card>
  );
}
