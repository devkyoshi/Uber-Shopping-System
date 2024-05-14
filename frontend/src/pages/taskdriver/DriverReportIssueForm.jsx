import React, { useState, useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea, TextInput, Label, Select } from "flowbite-react";
import DashSidebar from "../../components/DashSidebar";
import { useSelector } from "react-redux";

export default function DriverComplaintForm() {
  const { currentUser } = useSelector((state) => state.user);
  const { item_name, sm_name } = useParams();
  const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/Supermarket/supermarket/locations/${formData.market_name}`
        );
        setFormData({ ...formData, sm_location: response.data.locations });
      } catch (error) {
        console.error("Error fetching supermarket locations:", error);
        // Handle error appropriately
      }
    };

    fetchLocations();
  }, [sm_name]);

  const [formData, setFormData] = useState({
    driver_id: currentUser._id,
    market_name: sm_name,
    sm_location: "",
    item_name: item_name,
    issue_type: "",
    description: "",
  });

  const handleKeyPress = (e) => {
    // If the pressed key is not a letter, digit, or '@', prevent the default action
    if (!/[a-zA-Z0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);

      const response = await axios.post(
        "http://localhost:8070/Report/quality-report-add",
        formData
      );

      setSuccessMessage(response.data.message);
      navigate("/Dashboard?tab=Employee_DeliveriesDone");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An error occurred, please try again later.");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar />
      </div>
      <div className="inner-layout mt-5 ml-2 mr-5">
        <Typography
          variant="h1"
          className="mt-2 text-center font-semibold text-3xl mb-5"
          color="blue-gray"
        >
          Report Issue
        </Typography>
        <form onSubmit={handleSubmit} className="flex flex-col mb-2 gap-4">
          <div className="flex flex-row gap-7 ml-5 mr-5">
            <div className="flex flex-col flex-1 gap-2">
              <div>
                <Label htmlFor="customerId" className="block mb-2 font-bold">
                  Driver Name:
                </Label>
                <TextInput
                  type="text"
                  id="customerId"
                  name="driver_id"
                  value={currentUser.Emp_Name}
                  onChange={handleChange}
                  className="w-full p-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="itemName" className="block mb-2 font-bold">
                  Item Name:
                </Label>
                <TextInput
                  type="text"
                  id="itemName"
                  name="item_name"
                  value={formData.item_name}
                  onChange={handleChange}
                  className="w-full p-1"
                  required
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="issueType" className="block mb-2 font-bold">
                  Issue Type:
                </Label>
                <Select
                  type="text"
                  id="issueType"
                  name="issue_type"
                  value={formData.issue_type}
                  onChange={handleChange}
                  className="w-full p-1"
                  required
                >
                  <option value="">---Select Issue Type---</option>
                  <option value="unavilable">Item is unavilable</option>
                  <option value="Removed">Item is Removed</option>
                  <option value="quantityNotFulfilling">
                    Require quantity not fulfilling
                  </option>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="supmarketDescription"
                  className="block mb-2 font-bold"
                >
                  Description:
                </Label>
                <Textarea
                  type="text"
                  id="supmarketDescription"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  className="w-full p-2"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <div>
                <Label htmlFor="supmarketName" className="block mb-2 font-bold">
                  Supmarket Name:
                </Label>
                <TextInput
                  type="text"
                  id="supmarketName"
                  name="market_name"
                  value={formData.market_name}
                  onChange={handleChange}
                  className="w-full p-1"
                  required
                  readOnly
                />
              </div>
              <div>
                <Label
                  htmlFor="supmarketLocation"
                  className="block mb-2 font-bold"
                >
                  Supmarket Location:
                </Label>
                <TextInput
                  type="text"
                  id="supmarketLocation"
                  name="sm_location"
                  value={formData.sm_location}
                  onChange={handleChange}
                  className="w-full p-1"
                  required
                  readOnly
                />
              </div>
            </div>
          </div>
          <Typography>
            {errorMessage && (
              <div className="text-red-800 mb-4">{errorMessage}</div>
            )}
          </Typography>
          <Typography>
            {successMessage && (
              <div className="text-green-500 mb-4">{successMessage}</div>
            )}
          </Typography>

          <Button
            type="submit"
            disabled={uploading}
            className="bg-custom-gradient w-40 h-10 mx-auto  text-white py-2 px-4 border border-transparent rounded-md hover:bg-custom-gradient transition duration-300"
          >
            {uploading ? "Uploading..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}
