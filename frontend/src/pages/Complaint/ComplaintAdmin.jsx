import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react"; // Importing Material Tailwind React components
import axios from "axios"; // Importing Axios for HTTP requests
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook

export default function ComplaintAdmin() {
  // State to store complaints data
  const [complaints, setComplaints] = useState([]);

  // Initialize useNavigate hook
  const navigate = useNavigate();

  // Function to fetch complaint data from the server
  const fetchComplaintData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8070/Complaint/complaint-alladmin`
      );
      setComplaints(response.data); // Setting complaints data in state
    } catch (error) {
      console.error("Error fetching complaint data:", error);
    }
  };

  useEffect(() => {
    // Fetching complaint data when component mounts
    fetchComplaintData();
  }, []);

  // Function to handle accepting a complaint refund
  const handleAccept = async (complaintID) => {
    // Display confirmation dialog
    const confirmRefund = window.confirm(
      "Are you sure you want to refund this complaint?"
    );

    if (confirmRefund) {
      try {
        // Update the complaint status to 'accepted'
        await axios.put(
          `http://localhost:8070/Complaint/complaint-status/${complaintID}`
        );

        // Fetch the updated complaint data
        await fetchComplaintData();
      } catch (error) {
        console.error("Error accepting complaint:", error);
      }
    } else {
      // User canceled the deletion
      console.error("Refund canceled");
    }
  };

  const deleteComplaint = async (id) => {
    // Display a confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    // Check if the user confirmed the deletion
    if (confirmDelete) {
      try {
        // Send DELETE request to the backend
        await axios.delete(
          `http://localhost:8070/Complaint/complaint-delete/${id}`
        );

        // After successful deletion, update the complaints list
        setComplaints(complaints.filter((complaint) => complaint._id !== id));
      } catch (error) {
        console.error("Error deleting complaint:", error);
      }
    } else {
      // User canceled the deletion
      console.error("Deletion canceled");
    }
  };

  return (
    <div>
      {/* Rendering SideBar component */}

      <div>
        <Typography variant="h5" color="blue-gray">
          Recent Complaints
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          These are details about the last complaints
        </Typography>
        <br />
        <div className="grid grid-cols-1 gap-3">
          {/* Mapping over complaints data and rendering cards for each complaint */}
          {complaints.map((complaint, index) => (
            <Card
              key={index}
              className="p-4 bg-gray-100 border border-gray-300"
            >
              <CardBody>
                <div className="grid grid-cols-3 gap-3">
                  {/* Rendering complaint image */}
                  <div className="flex flex-col items-center">
                    <img
                      src={`http://localhost:8070/${complaint.imageURL}`}
                      // src="https://th.bing.com/th/id/OIP.qwH9Q8TNwyHmTxRPsyBoOwHaFS?rs=1&pid=ImgDetMain"
                      alt="Complaint Image"
                      className="rounded-lg w-64 h-auto"
                      onError={(e) =>
                        console.error("Error loading image:", e.nativeEvent)
                      } // Error handling for image loading
                    />
                    <Typography variant="h6" className="mt-3" color="gray">
                      Complaint image
                    </Typography>
                  </div>
                  {/* Rendering pickup image */}
                  <div className="flex flex-col items-center">
                    <img
                      // src="https://5.imimg.com/data5/ANDROID/Default/2022/10/YG/QU/OA/123142063/product-jpeg-500x500.jpg"
                      src={`http://localhost:8070/${complaint.imageURL}`}
                      alt="Pickup Image"
                      className="rounded-lg w-64 h-auto"
                      onError={(e) =>
                        console.error("Error loading image:", e.nativeEvent)
                      } // Error handling for image loading
                    />
                    <Typography variant="h6" className="mt-3" color="gray">
                      Pickup image
                    </Typography>
                  </div>
                  {/* Rendering delivery image */}
                  <div className="flex flex-col items-center">
                    <img
                      // src="https://5.imimg.com/data5/CM/JT/SN/ANDROID-23151151/1555509789452-jpg-500x500.jpg"
                      src={`http://localhost:8070/${complaint.imageURL}`}
                      alt="Delivery Image"
                      className="rounded-lg w-64 h-auto"
                      onError={(e) =>
                        console.error("Error loading image:", e.nativeEvent)
                      } // Error handling for image loading
                    />
                    <Typography variant="h6" className="mt-3" color="gray">
                      Delivery image
                    </Typography>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                {/* Rendering details for the complaint */}
                <div className="grid grid-cols-2 gap-3 mb-3 ">
                  <div className="flex flex-col">
                    <Typography variant="h6" color="gray">
                      Order ID:{" "}
                      <scan>
                        Order_{complaint.order_id.toString().slice(0, 5)}
                      </scan>
                    </Typography>
                    <Typography variant="h6" color="gray">
                      Item ID:{" "}
                      <scan>
                        item_{complaint.item_id.toString().slice(0, 5)}
                      </scan>
                    </Typography>
                  </div>
                  <div className="flex flex-col ">
                    <Typography variant="h6" color="gray">
                      Customer ID:
                      <scan>
                        Cust_
                        {complaint.customer_id.toString().slice(0, 5)}
                      </scan>
                    </Typography>
                    <Typography variant="h6" color="gray">
                      Payment ID:{" "}
                      <scan>
                        payment_{complaint.payment_id.toString().slice(0, 5)}
                      </scan>
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-wrap justify-start mb-5 gap-10">
                  <Typography color="gray">
                    " {complaint.description}"
                  </Typography>
                </div>
                <div className="flex justify-end">
                  {/* Rendering buttons based on resolving_option */}
                  {complaint.resolving_option === "refund" && (
                    <Button
                      color="blueGray"
                      className="w-30 mr-3 mt-3 text-base py-2 border border-transparent"
                      onClick={() => handleAccept(complaint._id)}
                    >
                      Refund
                    </Button>
                  )}
                  {complaint.resolving_option === "replacement" && (
                    <Button
                      color="blueGray"
                      className="w-30 mr-3 mt-3 text-base py-2 border border-transparent"
                      onClick={() => navigate("/order")}
                    >
                      Order
                    </Button>
                  )}
                  <Button
                    className="bg-red-900 w-30 mr-3 mt-3 text-base py-2 border border-transparent"
                    onClick={() => deleteComplaint(complaint._id)}
                  >
                    Ignore
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
