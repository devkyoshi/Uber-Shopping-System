import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Typography,
} from "@material-tailwind/react";

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/Driver/tasks/6614cd0282951fe76eb0ecea`
        );
        console.log(response.data);
        setTasks(response.data);
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Task Table</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Customer Details</th>
            <th className="border border-gray-300 px-4 py-2">Order Details</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
            <th className="border border-gray-300 px-4 py-2">PickUp</th>
            <th className="border border-gray-300 px-4 py-2">Delivery</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_details.order_id}>
              {/* <td className="border border-gray-300 px-4 py-2">
                {tasks.driver_id}
              </td> */}
              <td className="border border-gray-300 px-4 py-2">
                {order.district}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <Popover>
                  <PopoverHandler>
                    <Button color="indigo">More Info</Button>
                  </PopoverHandler>
                  <PopoverContent className="z-[999] grid w-[28rem] grid-cols-2 overflow-hidden p-0">
                    <div className="p-4">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                          <tr>
                            <th className="border border-gray-300 px-4 py-2">Item Name</th>
                            <th className="border border-gray-300 px-4 py-2">Item Price</th>
                            <th className="border border-gray-300 px-4 py-2">Item Quantity</th>
                            <th className="border border-gray-300 px-4 py-2">SuperMarket</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.order_details.items.map((item) => (
                            <tr key={item.item_id}>
                              <td className="border border-gray-300 px-4 py-2">{item.item_name}</td>
                              <td className="border border-gray-300 px-4 py-2">{item.price}</td>
                              <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                              <td className="border border-gray-300 px-4 py-2">{item.sm_name}</td>
                            </tr>
                          ))}
                          
                        </tbody>
                      </table>
                    </div>
                  </PopoverContent>
                </Popover>
              </td>
              <td>
                address
              </td>
              <td>
              <Popover>
                  <PopoverHandler>
                    <Button color="indigo">Pick Up</Button>
                  </PopoverHandler>
                  <PopoverContent className="z-[999] grid w-[28rem] grid-cols-2 overflow-hidden p-0">
                    <div className="p-4">
                    <input type="file" onChange={(e) => setPickupImageUrl(e.target.files[0])} />
      <Button
        color="indigo"
        onClick={() => handleUploadPickup(order.order_id, pickupImageUrl)}
      >
        Upload Pickup Image
      </Button>
                       
                    </div>
                  </PopoverContent>
                </Popover>
              </td>
              <td>
              <Popover>
                  <PopoverHandler>
                    <Button color="indigo">Delivery </Button>
                  </PopoverHandler>
                  <PopoverContent className="z-[999] grid w-[28rem] grid-cols-2 overflow-hidden p-0">
                    <div className="p-4">
                    <input type="file" onChange={(e) => setDeliveryImageUrl(e.target.files[0])} />
      <Button
        color="indigo"
        onClick={() => handleUploadDelivery(order.order_id, deliveryImageUrl)}
      >
        Upload Delivery Image
      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
