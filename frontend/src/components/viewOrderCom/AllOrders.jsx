// get method is gonna work in here 
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Typography,
} from "@material-tailwind/react";

const TABLE_HEAD  = ["Item Name", "Quantity", "Price", "SuperMarket Name"];

export function AllOrders({ orderId }) {
    const [order, setOrder] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchOrder = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8070/Order/allOrders/${orderId}` // made a change => (details -> allOrders)
          );
          setOrder(response.data);
          console.log("Order Data: ", response.data);
        } catch (error) {
          console.error("Error fetching order:", error);
        }
      };
  
      fetchOrder();
    }, [orderId]);
  
    const handleOpen = () => setOpen(!open);
  
    return (
      <div className="w-full">
        <Typography
          variant="h3"
          color="black"
          className="font-bold mb-2 text-center"
        >
          Placed Orders
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
              {order &&
                order.items.map(
                  ({ item_name, quantity, price, sm_name }, index) => {
                    const isLast = index === order.items.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";
  
                    return (
                      <tr key={item_name}>
                        <td className={classes}>
                          <Typography
                            variant="paragraph"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item_name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="paragraph"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {quantity}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="paragraph"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {price}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="paragraph"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {sm_name}
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table>
          {/** add a button to navigate back*/}
        </Card>
      </div>
    );
  }