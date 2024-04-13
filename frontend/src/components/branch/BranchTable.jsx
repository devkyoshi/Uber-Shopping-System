import { Card, Typography, Button } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Import Link from React Router

const TABLE_HEAD = [
  "Branch ID",
  "Branch Name",
  "Branch Location",
  "District",
  "",
];

export function BranchTable() {
  const [branchList, setBranchList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/Branch/branch-all"
        );
        setBranchList(response.data);
      } catch (error) {
        console.error("Error fetching Branch:", error);
        setErrorMessage("Error fetching Branch");
      }
    };

    fetchBranch();
  }, []);

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-center">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {branchList.map((branch, index) => (
            <tr key={index}>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {branch.branch_ID}
                </Typography>
              </td>
              <td className="p-4 bg-blue-gray-50/50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {branch.branch_name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {branch.branch_Location}
                </Typography>
              </td>
              <td className="p-4 bg-blue-gray-50/50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {branch.district}
                </Typography>
              </td>
              <td>
                <Button
                  className="hover:bg-black"
                  onClick={() => {
                    navigate("/driver", {
                      replace: true,
                      state: {
                        //Sending data
                        branch_ID: branch.branch_ID,
                        district: branch.district,
                      },
                    });
                  }}
                >
                  Add Driver
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
