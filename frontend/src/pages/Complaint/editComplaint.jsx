import React, { useState, useEffect } from "react";
import { SideBar } from "../../components/SideBar";
import { Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function editComplaint() {
  const { complaintId } = useParams();

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
  const [imageURL, setImageURL] = useState("");
  const { currentCustomer } = useSelector((state) => state.customer);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchComplaintData(); // Fetch complaint data when component mounts
  }, []);

  const fetchComplaintData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8070/Complaint/complaint/${complaintId}`
      );

      // Set the fetched complaint data into the form data state

      const fetchedComplaint = response.data;
      setFormData({
        customer_id: fetchedComplaint.customer_id,
        order_id: fetchedComplaint.order_id,
        payment_id: fetchedComplaint.payment_id,
        complaint_type: fetchedComplaint.complaint_type,
        item_id: fetchedComplaint.item_id,
        resolving_option: fetchedComplaint.resolving_option,
        complaint_img: fetchedComplaint.complaint_img,
        quantity: fetchedComplaint.quantity,
        description: fetchedComplaint.description,
      });

      const imageURL = `http://localhost:8070/${fetchedComplaint.imageURL}`;
      setImageURL(imageURL);
    } catch (error) {
      console.error("Error fetching complaint data:", error);
    }
  };

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

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidForm()) return;
    try {
      setUploading(true);

      //Each attribute of the complaint form is stored as a key-value pair in this object.
      // Construct FormData object to send form data to the server
      const formDataToSend = new FormData();
      formDataToSend.append("customer_id", formData.customer_id);
      formDataToSend.append("order_id", formData.order_id);
      formDataToSend.append("payment_id", formData.payment_id);
      formDataToSend.append("complaint_type", formData.complaint_type);
      formDataToSend.append("item_id", formData.item_id);
      formDataToSend.append("resolving_option", formData.resolving_option);
      formDataToSend.append("complaint_img", formData.complaint_img);
      formDataToSend.append("quantity", formData.quantity);
      formDataToSend.append("description", formData.description);

      console.log(formDataToSend);

      const response = await axios.put(
        `http://localhost:8070/Complaint/complaint-update/${complaintId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure correct content type for FormData
          },
        }
      );

      setSuccessMessage(response.data.message);

      // Navigate to the complaint page upon successful submission
      navigate(`/complaint`);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An error occurred, please try again later.");
      }
    } finally {
      // Reset uploading state after submission
      setUploading(false);
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
        <div className=" container mx-auto mt-5 bg-gray-100 rounded-lg border border-gray-300">
          <br />
          <form
            onSubmit={handleSubmit}
            className="max-w-720px mx-auto space-y-5 p-5"
          >
            <div className="grid grid-cols-2 gap-10 mb-1">
              <div>
                <div className="mb-3">
                  <Typography
                    htmlFor="orderId"
                    className="block mb-2 font-bold"
                  >
                    Customer Name:
                  </Typography>
                  <Typography>
                    <input
                      type="text"
                      id="orderId"
                      name="order_id"
                      value={currentCustomer.cus_name}
                      onChange={handleChange}
                      className="w-full p-1 bg-red-45 border border-gray-400 rounded-md"
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
                      id="resolving_option"
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
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Complaint Preview"
                      style={{ maxWidth: "50%", marginTop: "10px" }}
                    />
                  )}
                  {imageURL && (
                    <img
                      src={imageURL}
                      alt="Complaint Image"
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
