import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Card,
  Typography,
  Button,
  Input,
  Popover,
  ListItemSuffix,
  PopoverHandler,
  PopoverContent,
  Chip,
  ListItem,
} from "@material-tailwind/react";

const TaskTable = ({ user_id }) => {
  const [taskDetails, setTaskDetails] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  console.log("userid: ", currentUser._id);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/Driver/tasks/${currentUser._id}`
        );
        console.log("Driver details: ", response.data);
        setTaskDetails(response.data);
      } catch (error) {
        console.log("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, []);

  const handlePickupSubmit = async (orderId, pickupImageUrl) => {
    try {
      console.log("Order Id:", orderId, pickupImageUrl);
      await axios.put(`http://localhost:8070/Driver/update-pickup/${orderId}`, {
        status: "Picked Up",
        pickupImageUrl,
      });
      console.log("Picked Up");
      // Refresh task details after pickup update
      const updatedTaskDetails = await axios.get(
        `http://localhost:8070/Driver/tasks/${currentUser._id}`
      );

      setTaskDetails(updatedTaskDetails.data);
    } catch (error) {
      console.error("Error updating pickup:", error);
    }
  };

  const handleDeliverySubmit = async (orderId, deliveryImgUrl) => {
    try {
      console.log("Order Id:", orderId, deliveryImgUrl);
      await axios.put(
        `http://localhost:8070/Driver/update-delivery/${orderId}`,
        {
          status: "Delivered",
          deliveryImgUrl,
        }
      );
      console.log("Delivered");
      // Refresh task details after delivery update
      const updatedTaskDetails = await axios.get(
        `http://localhost:8070/Driver/tasks/${currentUser._id}`
      );

      setTaskDetails(updatedTaskDetails.data);
    } catch (error) {
      console.error("Error updating delivery:", error);
    }
  };

  return (
    <div className="p-4">
      {!taskDetails || taskDetails.length === 0 ? (
        <div className="text-center">
          <Card>
            <Typography variant="h2" color="blue-gray" className="mb-2">
              Welcome {currentUser.Emp_Name} !
              <Typography className="text-2xl mb-4 text-center">
                No task assigned for the driver yet
              </Typography>
            </Typography>
          </Card>

          <div className="flex animate-pulse flex-wrap items-center gap-8 mt-5">
            <div className="grid h-36 w-36 place-items-center rounded-lg bg-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-12 w-12 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </div>
            <div className="w-max">
              <Typography
                as="div"
                variant="h1"
                className="mb-4 h-3 w-56 rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
              <Typography
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-72 rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
              <Typography
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-72 rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
              <Typography
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-72 rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
              <Typography
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-72 rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
              <Typography
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-72 rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
              <Typography
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-72 rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl mb-4 text-center">Task Progress</h1>
          <div>
            <Card className="p-5">
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 text-center"
              >
                Task Details
              </Typography>
            </Card>
          </div>
          <Typography
            variant="h5"
            color="blue-gray"
            className="text-center mt-5 text-2xl"
          >
            Orders
          </Typography>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {taskDetails[0].orders && taskDetails[0].orders.length > 0 && (
              <>
                {taskDetails[0].orders.map((order, index) => (
                  <Card key={index} className="flex flex-col">
                    <div
                      className={`${
                        order.order_details.cash_payment !== undefined
                          ? "bg-green-600"
                          : "bg-orange-600"
                      } p-3 rounded-t-lg`}
                    >
                      <Typography
                        variant="h6"
                        color="white"
                        className="text-center"
                      >
                        {order.order_details.cash_payment !== undefined
                          ? "Cash Payment"
                          : "Card Payment"}
                      </Typography>
                    </div>
                    <div className="mt-5 ml-5 mr-5">
                      <Chip
                        value={order.order_details.order_status}
                        className={`mb-5 ${
                          order.order_details.order_status === "Processing"
                            ? "bg-yellow-500"
                            : order.order_details.order_status === "Picked Up"
                            ? "bg-gray-500"
                            : order.order_details.order_status === "Delivered"
                            ? "bg-green-500"
                            : "bg-gray-500"
                        }`}
                      />
                    </div>
                    <div className="mt-auto p-5">
                      <span>Customer Name:</span>{" "}
                      <Typography>
                        {order.order_details.customer_name}
                      </Typography>
                      <span>Address:</span>
                      <Typography>{order.order_details.address}</Typography>
                      <span>Contact Number:</span>
                      <Typography>
                        0{order.order_details.contact_number}
                      </Typography>
                      <div className="inline-flex gap-2 mt-5 item-center justify-center">
                        <Popover
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                          }}
                        >
                          <PopoverHandler>
                            <Button
                              size="sm"
                              className="bg-gray-200 text-black"
                            >
                              Item
                            </Button>
                          </PopoverHandler>
                          <PopoverContent className="z-50 p-5">
                            <Typography className="text-center">
                              Item to be delivered
                            </Typography>
                            {order.items.map((item, itemIndex) => (
                              <ListItem key={itemIndex} className="gap-3">
                                <div>
                                  <p>{item.item_name}</p>
                                  <p>Rs. {item.price}</p>
                                  <p className="mb-5">{item.sm_name}</p>
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      navigate(
                                        `/ReportIssueForm/${item.item_name}/${item.sm_name}`
                                      )
                                    }
                                  >
                                    {" "}
                                    Report
                                  </Button>
                                  {/**Chanmi menna methana :) */}
                                </div>
                                <ListItemSuffix>
                                  <Chip
                                    value={item.quantity}
                                    size="sm"
                                    color="green"
                                    className="rounded-full"
                                  />
                                </ListItemSuffix>
                              </ListItem>
                            ))}
                          </PopoverContent>
                        </Popover>
                        <Popover
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                          }}
                        >
                          <PopoverHandler>
                            <Button
                              size="sm"
                              className="bg-green-200 text-black"
                            >
                              Pickup
                            </Button>
                          </PopoverHandler>
                          <PopoverContent className="z-50">
                            <div>
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  const pickupImageUrl =
                                    e.target.pickupUrl.value;
                                  handlePickupSubmit(
                                    order.order_details.order_id,
                                    pickupImageUrl
                                  );
                                }}
                                className="relative flex w-full max-w-[24rem] mt-4"
                              >
                                <Input
                                  label="Pick Up"
                                  name="pickupUrl"
                                  className="pr-20"
                                  containerProps={{
                                    className: "min-w-0",
                                  }}
                                />
                                <Button
                                  size="sm"
                                  type="submit"
                                  className="!absolute right-1 top-1 rounded"
                                >
                                  Pick Up
                                </Button>
                              </form>
                            </div>
                          </PopoverContent>
                        </Popover>
                        <Popover
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                          }}
                        >
                          <PopoverHandler>
                            <Button size="sm" className="bg-red-500">
                              Delivery
                            </Button>
                          </PopoverHandler>
                          <PopoverContent className="z-50">
                            <div>
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  const DeliveryImageUrl =
                                    e.target.deliveryUrl.value;
                                  handleDeliverySubmit(
                                    order.order_details.order_id,
                                    DeliveryImageUrl
                                  );
                                }}
                                className="relative flex w-full max-w-[24rem] mt-4"
                              >
                                <Input
                                  label="Deliver"
                                  name="deliveryUrl"
                                  className="pr-20"
                                  containerProps={{
                                    className: "min-w-0",
                                  }}
                                />
                                <Button
                                  size="sm"
                                  type="submit"
                                  className="!absolute right-1 top-1 rounded"
                                >
                                  Deliver
                                </Button>
                              </form>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </Card>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskTable;
