import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography, Input, Button } from "@material-tailwind/react"; // Assuming Input and Button components are imported from Material Tailwind

const TABLE_HEAD = [
  "Order ID",
  "Purchase Amount",
  "Order Status",
  "Order Date",
  "Additional Notes",
  "Payment Method",
  "Payment Amount",
  "Address",
  "District",
  "Nearest Town",
];
const ITEM_TABLE_HEAD = ["Item Name", "Quantity", "Price", "SuperMarket Name"];

export function AllOrders({ customerId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchInput, setSearchInput] = useState("");

  console.log("Customer ID:", customerId);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/Order/orders/${customerId}`
        );
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [customerId]);

  const handleSearch = () => {
    // Implement search functionality based on searchInput
    // Filter the orders array based on the searchInput
    // Update the state with filtered orders
  };

  const handleDownloadReport = () => {
    // Implement download report functionality
    // Generate a report including all details
    // Provide a downloadable link or initiate download action
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between mb-4">
        <Typography
          variant="h3"
          color="black"
          className="font-bold text-center"
        >
          All Orders
        </Typography>
        <div className="flex space-x-3">
          <Input
            type=""
            placeholder="Search by Order ID"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="mr-5 border border-gray-300"
          />
          <div className="flex justify-between space-x-2">
            <Button
              color="white"
              onClick={handleSearch}
              className="ml-auto w-max h-max border border-gray-300"
            >
              Search
            </Button>
            <Button
              onClick={handleDownloadReport}
              className="ml-auto w-max h-max"
            >
              Download Report
            </Button>
          </div>
        </div>
      </div>

      <Card className="">
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="font-bold leading-none text-black"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order._id}>
                <tr>
                  <td className="p-4 border-b border-blue-gray-50">
                    {order._id}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {order.purchase_amount}
                  </td>
                  {/* Render other order details */}
                </tr>
                <tr>
                  <td colSpan={10}>
                    <table className="w-full min-w-max table-auto text-center">
                      <thead>
                        <tr>
                          {ITEM_TABLE_HEAD.map((head) => (
                            <th
                              key={head}
                              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                              <Typography
                                variant="h6"
                                color="blue-gray"
                                className="font-bold leading-none text-black"
                              >
                                {head}
                              </Typography>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item, index) => (
                          <tr key={index}>
                            <td className="p-4 border-b border-blue-gray-50">
                              {item.item_name}
                            </td>
                            {/* Render other item details */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </Card>

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{new Date(order.order_date).toLocaleDateString()}</td>
                  {/* Add more table cells for additional order details */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
