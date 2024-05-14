import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import { SideBar } from "../../components/SideBar";

export default function RefundForm() {
  const { complaintId, orderId } = useParams(); // Get complaintId and itemId from route parameters
  const navigate = useNavigate(); // Access the history object

  const [formData, setFormData] = useState({
    order_id: "",
    complaint_id: "",
    account_holder: "",
    account_sort_code: "",
    account_number: "",
    amount: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Update the complaintId and itemId when component mounts
  useEffect(() => {
    setFormData({ ...formData, complaint_id: complaintId, order_id: orderId });
  }, [complaintId, orderId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8070/Refund/refund-add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();

      if (response.ok) {
        setSuccessMessage(responseData);
        setErrorMessage("");
        // Set formSubmitted to true to disable the button
        setFormSubmitted(true);
        // Redirect to success page after successful form submission
        navigate(`/complaint`);
      } else {
        setSuccessMessage("");
        setErrorMessage(responseData.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred while processing your request.");
      setSuccessMessage("");
    }
  };

  //validating inputs
  const handleKeyPress = (e) => {
    // If the pressed key is not a letter, digit, or '@', prevent the default action
    if (!/[a-zA-Z0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="main-layout">
      <SideBar />
      <div className="inner-layout">
        <Typography
          variant="h3"
          style={{ color: "var(--logo-green1)" }}
          className="ml-3"
        >
          Refund Form
        </Typography>
        <div className=" container mx-auto mt-5 bg-gray-100 rounded-lg border border-gray-300">
          <br />
          <form
            onSubmit={handleSubmit}
            className=" max-w-screen-md mx-auto w-full "
          >
            <div className="grid grid-cols-2 gap-10 mb-3">
              <div>
                <div className="mb-3">
                  <Typography
                    htmlFor="orderId"
                    className="block mb-2 font-bold"
                  >
                    Order ID:
                  </Typography>
                  <input
                    type="text"
                    id="orderId"
                    name="order_id"
                    value={formData.order_id}
                    onChange={handleChange}
                    className="w-full p-1 bg-red-45 border border-gray-400 rounded-md"
                    required
                  />
                </div>
                <div className="mb-3">
                  <Typography
                    htmlFor="complaintId"
                    className="block mb-2 font-bold"
                  >
                    Complaint ID:
                  </Typography>
                  <input
                    type="text"
                    id="complaintId"
                    name="complaint_id"
                    value={formData.complaint_id}
                    onChange={handleChange}
                    className="w-full p-1 border border-gray-400 rounded-md"
                    required
                  />
                </div>
                <div className="mb-3">
                  <Typography htmlFor="amount" className="block mb-2 font-bold">
                    Amount:
                  </Typography>
                  <input
                    type="Number"
                    id="amount"
                    name="amount"
                    onKeyPress={handleKeyPress}
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full p-1 border border-gray-400 rounded-md"
                  />
                </div>
              </div>
              <div>
                <div className="mb-3">
                  <Typography
                    htmlFor="accountHolder"
                    className="block mb-2 font-bold"
                  >
                    Account Holder:
                  </Typography>
                  <input
                    type="text"
                    id="accountHolder"
                    name="account_holder"
                    onKeyPress={handleKeyPress}
                    value={formData.account_holder}
                    onChange={handleChange}
                    className="w-full p-1 border border-gray-400 rounded-md"
                    required
                  />
                </div>
                <div className="mb-3">
                  <Typography
                    htmlFor="accountSortCode"
                    className="block mb-2 font-bold"
                  >
                    Account Sort Code:
                  </Typography>
                  <input
                    type="text"
                    id="accountSortCode"
                    name="account_sort_code"
                    onKeyPress={handleKeyPress}
                    value={formData.account_sort_code}
                    onChange={handleChange}
                    className="w-full p-1 border border-gray-400 rounded-md"
                    required
                  />
                </div>
                <div className="mb-3">
                  <Typography
                    htmlFor="accountNumber"
                    className="block mb-2 font-bold"
                  >
                    Account Number:
                  </Typography>
                  <input
                    type="text"
                    id="accountNumber"
                    name="account_number"
                    onKeyPress={handleKeyPress}
                    value={formData.account_number}
                    onChange={handleChange}
                    className="w-full p-1 border border-gray-400 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="text-red-800 mb-4">{errorMessage}</div>
              <div className="text-green-500 mb-4">{successMessage}</div>
            </div>
            <Button
              type="submit"
              disabled={formSubmitted}
              className="bg-custom-gradient text-white py-2 px-4 w-30 mt-3 text-base border border-transparent rounded-md hover:bg-custom-gradient transition duration-300"
            >
              Submit
            </Button>
          </form>

          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
