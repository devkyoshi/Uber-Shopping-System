import React, { useState, useEffect } from "react";
import { SideBar } from "../../components/SideBar";
import { Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ComplaintForm() {
  // Initialize useNavigate hook
  const navigate = useNavigate();

  // State variables to manage form data and image preview
  const [formData, setFormData] = useState({
    customer_id: "",
    order_id: "",
    payment_id: "",
    complaint_type: "",
    item_id: "",
    resolving_option: "",
    complaint_img: "",
    quantity: "",
    description: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { currentCustomer } = useSelector((state) => state.customer);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setFormData({ ...formData, customer_id: currentCustomer.cus_name });
  }, [currentCustomer]);

  // Function to handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle file input change and display image preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, complaint_img: file });

    //Display image preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  //validating inputs
  const handleKeyPress = (e) => {
    // If the pressed key is not a letter, digit, or '@', prevent the default action
    if (!/[a-zA-Z0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Validate form inputs before submission
    if (!isValidForm()) return;

    try {
      // Set uploading state to true during form submission
      setUploading(true);

      // Prepare form data for submission
      const formDataToSend = new FormData();
      formDataToSend.append("customer_id", currentCustomer._id);
      formDataToSend.append("order_id", formData.order_id);
      formDataToSend.append("payment_id", formData.payment_id);
      formDataToSend.append("complaint_type", formData.complaint_type);
      formDataToSend.append("item_id", formData.item_id);
      formDataToSend.append("resolving_option", formData.resolving_option);
      formDataToSend.append("complaint_img", formData.complaint_img);
      formDataToSend.append("quantity", formData.quantity);
      formDataToSend.append("description", formData.description);

      // Send form data to server
      const response = await axios.post(
        "http://localhost:8070/Complaint/complaint-add",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Display success message upon successful submission
      setSuccessMessage(response.data.message);

      // Redirect user to complaint page after submission
      navigate("/complaint");
    } catch (error) {
      // Handle errors during form submission
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An error occurred, please try again later.");
      }
    } finally {
      setUploading(false); // Reset uploading state after submission
    }
  };

  const isValidForm = () => {
    // Implement form validation logic
    if (
      !formData.order_id ||
      !formData.payment_id ||
      !formData.complaint_type ||
      !formData.item_id ||
      !formData.resolving_option ||
      !formData.quantity ||
      !formData.description ||
      !formData.complaint_img
    ) {
      setErrorMessage("Please fill in all required fields.");
      return false;
    }

    if (!Number(formData.quantity)) {
      setErrorMessage("Quantity must be a number.");
      return false;
    }

    return true; // Return true if the form is valid
  };

  //reset button
  const resetForm = () => {
    setFormData({
      customer_id: "",
      order_id: "",
      payment_id: "",
      complaint_type: "",
      item_id: "",
      resolving_option: "",
      complaint_img: "",
      quantity: "",
      description: "",
    });
    setImagePreview(null);
    setErrorMessage("");
    setSuccessMessage("");
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
          Complaint Form
        </Typography>

        <div className=" container mx-auto mt-5 bg-gray-100 rounded-lg border border-gray-300 p-4">
          <br />
          <form
            onSubmit={handleSubmit}
            className=" max-w-720px mx-auto space-y-5 "
          >
            <div className="grid grid-cols-2 gap-10 mb-1">
              <div>
                <div className="mb-3">
                  <Typography
                    htmlFor="customerId"
                    className="block mb-2 font-bold"
                  >
                    Customer Name:
                  </Typography>
                  <Typography>
                    <input
                      type="text"
                      id="customerId"
                      name="customer_id"
                      value={formData.customer_id}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      className="w-full p-1 border border-gray-400 rounded-md"
                      required
                      readOnly
                    />
                  </Typography>
                </div>
                <div className="mb-3">
                  <Typography
                    htmlFor="orderId"
                    className="block mb-2 font-bold"
                  >
                    Order ID:
                  </Typography>
                  <Typography>
                    <input
                      type="text"
                      id="orderId"
                      name="order_id"
                      onKeyPress={handleKeyPress}
                      value={formData.order_id}
                      onChange={handleChange}
                      className="w-full p-1 bg-red-45 border border-gray-400 rounded-md"
                      required
                    />
                  </Typography>
                </div>
                <div className="mb-3">
                  <Typography
                    htmlFor="paymentId"
                    className="block mb-2 font-bold"
                  >
                    Payment ID:
                  </Typography>
                  <Typography>
                    <input
                      type="text"
                      id="paymentId"
                      name="payment_id"
                      onKeyPress={handleKeyPress}
                      value={formData.payment_id}
                      onChange={handleChange}
                      className="w-full p-1 bg-red-45 border border-gray-400 rounded-md"
                      required
                    />
                  </Typography>
                </div>
                <div className="mb-3">
                  <Typography htmlFor="itemId" className="block mb-2 font-bold">
                    Item ID:
                  </Typography>
                  <Typography>
                    <input
                      type="text"
                      id="itemId"
                      name="item_id"
                      onKeyPress={handleKeyPress}
                      value={formData.item_id}
                      onChange={handleChange}
                      className="w-full p-1 border border-gray-400 rounded-md  "
                      required
                    />
                  </Typography>
                </div>
                <div className="mb-3">
                  <Typography
                    htmlFor="quantity"
                    className="block mb-2 font-bold"
                  >
                    Quantity :
                  </Typography>
                  <Typography>
                    <input
                      type="text"
                      id="quantity"
                      name="quantity"
                      onKeyPress={handleKeyPress}
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full p-1 border border-gray-400 rounded-md "
                      required
                    />
                  </Typography>
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
                {/* Button to submit the form */}
                <Button
                  type="submit"
                  disabled={uploading}
                  className="bg-custom-gradient text-white py-2 px-4 w-30 mt-3 text-base border border-transparent rounded-md hover:bg-custom-gradient transition duration-300"
                >
                  {uploading ? "Uploading..." : "Submit"}
                </Button>
                <Button
                  onClick={resetForm}
                  className="bg-red-500 text-white py-2 px-4 w-30 mt-3 ml-3 text-base border border-transparent rounded-md hover:bg-red-600 transition duration-300"
                >
                  Reset
                </Button>
              </div>
              <div>
                <div className="mb-3">
                  <Typography
                    htmlFor="complaintType"
                    className="block mb-2 font-bold"
                  >
                    Complaint Type:
                  </Typography>
                  <Typography>
                    <select
                      id="complaintType"
                      name="complaint_type"
                      value={formData.complaint_type}
                      onChange={handleChange}
                      className="w-full p-1 bg-white border border-gray-400 rounded-md"
                      required
                    >
                      <option value="">---Select Complaint Type---</option>
                      <option value="Expired">Item is expired</option>
                      <option value="Damaged">Item is damaged</option>
                      <option value="WrongItem">Not what I ordered</option>
                    </select>
                  </Typography>
                </div>
                <div className="mb-3">
                  <Typography
                    htmlFor="resolvingOption"
                    className="block mb-2 font-bold"
                  >
                    Resolving Option:
                  </Typography>
                  <Typography>
                    <select
                      id="resolvingOption"
                      name="resolving_option"
                      value={formData.resolving_option}
                      onChange={handleChange}
                      className="w-full p-1 bg-white border border-gray-400 rounded-md"
                      required
                    >
                      <option value="">---Select Resolving Option---</option>
                      <option value="refund">Refund</option>
                      <option value="replacement">Replacement</option>
                    </select>
                  </Typography>
                </div>
                <div className="mb-3">
                  <Typography
                    htmlFor="description"
                    className="block mb-2 font-bold"
                  >
                    Description :
                  </Typography>
                  <Typography>
                    <textarea
                      type="text"
                      id="description"
                      name="description"
                      onKeyPress={handleKeyPress}
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-400 rounded-md"
                      required
                    />
                  </Typography>
                </div>
                <div className="mb-3">
                  <Typography
                    htmlFor="complaint_img"
                    id="complaintImgLabel"
                    className="block mb-2 font-bold"
                  >
                    Complaint Image :
                  </Typography>
                  <input
                    type="file"
                    id="complaint_img"
                    name="complaint_img"
                    onChange={handleFileChange}
                    required
                    aria-labelledby="complaintImgLabel"
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Complaint Preview"
                      style={{ maxWidth: "50%", marginTop: "10px" }}
                    />
                  )}
                </div>
              </div>
            </div>
          </form>
          <br />
        </div>
      </div>
    </div>
  );
}
