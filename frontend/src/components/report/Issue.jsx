import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, Input, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Issue() {
  const { currentCustomer } = useSelector((state) => state.customer);
  const [issues, setIssues] = useState([]); // State to store complaints
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const navigate = useNavigate();

  // Display Previous Complaints
  useEffect(() => {
    axios
      .get(`http://localhost:8070/Report/quality-report-read`)
      .then((response) => {
        setIssues(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const deleteComplaint = async (id) => {
    // Display a confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Issue report?"
    );

    // Check if the user confirmed the deletion
    if (confirmDelete) {
      try {
        // Send DELETE request to the backend
        await axios.delete(
          `http://localhost:8070/Report/quality-report-delete/${id}`
        );

        // After successful deletion, update the complaints list
        setIssues(issues.filter((issue) => issue._id !== id));
      } catch (error) {
        console.error("Error deleting complaint:", error);
      }
    } else {
      // User canceled the deletion
      console.error("Deletion canceled");
    }
  };

  // Handle change in search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter complaints based on search term
  const filteredIssues = issues.filter((issue) => {
    return issue.market_name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <div>
        <Typography variant="h5" color="blue-gray">
          Recent Reported Issues
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          These are details about the last report issues
        </Typography>
        <br />

        <div className="flex justify-end mt-4 gap-2 ">
          {/* Search input */}
          <div className="flex w-full shrink-0 md:w-max bg-gray-100 rounded-xl shadow-md">
            <Input
              label="Search"
              color="blue-gray"
              className="w-full md:w-72 "
              icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <br />
        <ul>
          {/* List of filtered complaints */}
          {filteredIssues.map((Issues) => (
            <li key={Issues._id} className="mb-2">
              <div className="border border-gray-300 bg-gray-100 p-4 rounded-lg items-center justify-between">
                <div className="flex flex-wrap text-center gap-">
                  <div className="flex items-center gap-5">
                    {/* Market Name */}
                    <div className="mr-1">
                      <Typography>Market Name : </Typography>
                    </div>
                    <div>
                      <Typography variant="h6">{Issues.market_name}</Typography>
                    </div>
                    {/* Location */}
                    <div className="ml-8 mr-1">
                      <Typography>Location: </Typography>
                    </div>
                    <div className="mr-4">
                      <Typography>{Issues.sm_location}</Typography>
                    </div>
                    {/* Item Name */}
                    <div className="mr-2">
                      <Typography>Item Name : </Typography>
                    </div>
                    <div>
                      <Typography variant="h6">{Issues.item_name}</Typography>
                    </div>
                  </div>

                  {/* Edit and Ignore buttons */}
                  <div className="ml-auto flex">
                    <Button
                      onClick={() => deleteComplaint(Issues._id)}
                      color="red"
                      ripple="light"
                      className="w-30 mt-3  py-2 px-4 text-base border border-transparent bg-red-500"
                      size="regular"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                {/* issue_type and description and driver id*/}
                <div className="grid grid-rows-2 mb-1 gap-2">
                  <div className="flex items-center">
                    {/* issue_type */}
                    <Typography
                      color="blue-gray"
                      className="mr-2 text-gray-400"
                    >
                      Issue Type :{" "}
                    </Typography>
                    <Typography color="blue-gray" className="text-gray-400">
                      {Issues.issue_type}
                    </Typography>
                  </div>
                  <div className="flex items-center">
                    {/* description */}
                    <Typography
                      color="blue-gray"
                      className="mr-2 text-gray-400"
                    >
                      Description :{" "}
                    </Typography>
                    <Typography color="blue-gray" className="text-gray-400">
                      {Issues.description}
                    </Typography>
                  </div>
                  <div className="flex items-center">
                    {/* description */}
                    <Typography
                      color="blue-gray"
                      className="mr-2 text-gray-400"
                    >
                      Driver ID :{" "}
                    </Typography>
                    <Typography color="blue-gray" className="text-gray-400">
                      driver_{Issues.driver_id.toString().slice(0, 5)}
                    </Typography>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
