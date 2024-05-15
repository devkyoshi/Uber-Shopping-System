import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Order ID", "Status", "District", "Date and Time"];

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8070/Order/orders");
        console.log("API Response:", response.data); // Log the response data

        const filteredOrders = response.data.filter(
          (order) => order.order_status === "pending"
        );

        // Filter out orders with empty district
        const ordersWithDistrict = filteredOrders.filter((order) => {
          return order.cash_payment?.district || order.card_payment?.district;
        });

        // Sort orders by district and then by order_id
        const sortedOrders = ordersWithDistrict.sort((a, b) => {
          const districtA = a.cash_payment
            ? a.cash_payment.district
            : a.card_payment
            ? a.card_payment.district
            : "";
          const districtB = b.cash_payment
            ? b.cash_payment.district
            : b.card_payment
            ? b.card_payment.district
            : "";

          if (districtA === districtB) {
            return a._id - b._id; // Sort by _id if districts are the same
          }
          return districtA.localeCompare(districtB);
        });

        setOrders(sortedOrders);
        setLoading(false); // Set loading to false after fetching and setting orders
        console.log("sorted Order", sortedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders. Please try again later.");
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
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
                  style={{ fontWeight: "bolder" }}
                  className="font-normal leading-none opacity-70 text-center"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal text-center"
                >
                  Order_{order._id.toString().slice(0, 5)}
                </Typography>
              </td>
              <td className="p-4 bg-blue-gray-50/50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal text-center"
                >
                  {order.order_status}
                </Typography>
              </td>
              <td className="p-4 ">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal text-center"
                >
                  {order.order_district}
                </Typography>
              </td>

              <td className="p-4 bg-blue-gray-50/50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal text-center"
                >
                  {new Date(order.order_date).toLocaleString()}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default OrderTable;
