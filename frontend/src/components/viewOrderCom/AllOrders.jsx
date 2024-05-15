import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography, Input, Button } from "@material-tailwind/react"; // Assuming Input and Button components are imported from Material Tailwind
import { SideBar } from "../SideBar";
import jsPDF from "jspdf";
import "jspdf-autotable";

const TABLE_HEAD = [
  // "Order ID",
  "Order Date",
  "District",
  "Purchase Amount",
  "Payment Method",
  "Order Status",
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
        console.log("Order: ", response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [customerId]);

  // handling serch bar
  const handleSearch = () => {
    // Convert searchInput to lowercase for case-insensitive search
    const searchTerm = searchInput.toLowerCase();

    // Filter orders based on searchInput
    const filteredOrders = orders.filter((order) =>
      order._id.toLowerCase().includes(searchTerm)
    );

    // Update state with filtered orders
    setOrders(filteredOrders);
  };

  const handleDownloadReport = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set the title of the PDF
    doc.setFontSize(18);
    doc.text("Orders Report", 105, 10, { align: "center" });

    // Set up the table headers
    const headers = "";

    // Set up the data rows
    const rows = [];

    // Add order and item data
    orders.forEach((order) => {
      // Add order data
      //rows.push([["Order ID", order._id]]);
      rows.push([["Purchase Amount", order.purchase_amount]]);
      rows.push([["Order Status", order.order_status]]);
      rows.push([["Order Date", order.order_date]]);
      rows.push([["Payment Method", order.cash_payment ? "Cash" : "Card"]]);

      // Add item data
      order.items.forEach((item) => {
        rows.push([
          ["Item ID", item.item_id],
          ["Quantity", item.quantity],
        ]);
      });

      // Add spacing between orders
      rows.push([""]); // Empty row
    });

    // Flatten the rows array
    const flatRows = rows.flat();

    // Add table headers
    doc.autoTable({
      body: [headers],
      startY: 20,
    });

    // Add data rows
    doc.autoTable({
      body: flatRows,
      startY: 30,
      theme: "grid", // Add borders
      columnStyles: {
        0: { cellWidth: "auto" }, // Adjust column width to fit content
      },
    });

    // Save the PDF
    doc.save("orders_report.pdf");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-layout">
      <div className="inner-layout mr-5">
        <div className="flex justify-between mb-4 ">
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

        <Card className="h-full w-full overflow-scroll ">
          <div className="text-center">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="w-full min-w-max table-auto  text-center">
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
                  {orders.map((order) => (
                    <tr key={order._id} className="even:bg-blue-gray-50/50">
                      {/* <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {order._id}
                        </Typography>
                      </td> */}
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {new Date(order.order_date).toLocaleDateString()}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {order.order_district}
                        </Typography>
                      </td>
                      <td className="p-4">
                        {order.cash_payment || order.card_payment ? (
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            Rs.
                            {order.cash_payment
                              ? order.cash_payment.payment_amount
                              : order.card_payment.payment_amount}{" "}
                            .00
                          </Typography>
                        ) : (
                          <span>No payment information available</span>
                        )}
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {order.cash_payment ? "Cash" : "Card"}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {order.order_status}
                        </Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
