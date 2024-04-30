import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography } from "@material-tailwind/react";

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
  console.log("Customer ID:", customerId);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8070/Order/customer/${customerId}/orders`
        );
        setOrders(response.data);
        console.log("Order details", response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <Typography
        variant="h3"
        color="black"
        className="font-bold mb-2 text-center"
      >
        All Orders
      </Typography>

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
                  <td className="p-4 border-b border-blue-gray-50">
                    {order.order_status}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {new Date(order.order_date).toLocaleDateString()}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {order.additional_notes}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {order.cash_payment.payment_method}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {order.cash_payment.payment_amount}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {order.cash_payment.address}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {order.cash_payment.district}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {order.cash_payment.nearest_town}
                  </td>
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
                            <td className="p-4 border-b border-blue-gray-50">
                              {item.quantity}
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                              {item.price}
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                              {item.sm_name}
                            </td>
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
    </div>
  );
}
