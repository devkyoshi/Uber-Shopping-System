import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/customer/customerRegisterSlice";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@material-tailwind/react";

import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  StarIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/solid";

import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";

import axios from "axios";
import { useSelector } from "react-redux";

export function SideBar() {
  const [open, setOpen] = React.useState(0);
  const dispatch = useDispatch();
  const { currentCustomer } = useSelector((state) => state.customer);
  const [latestOrderId, setOrderId] = React.useState("");

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  // Function to fetch the latest order ID of a certain customer
  const fetchLatestOrder = async (customerId) => {
    try {
      // Make a GET request to the backend API endpoint
      const response = await axios.get(
        `http://localhost:8070/Order/latest-order/${customerId}`
      );

      // If the request is successful, return the latest order ID
      return response.data.latest_order_id;
    } catch (error) {
      // If an error occurs, log the error and return null
      console.error("Error fetching latest order:", error);
      return null;
    }
  };

  const customerId = currentCustomer._id; // Replace with the actual customer ID
  fetchLatestOrder(customerId)
    .then((latestOrderId) => {
      if (latestOrderId) {
        setOrderId(latestOrderId);
        console.log("Latest order ID:", latestOrderId);
      } else {
        console.log("No orders found for the customer.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  const handleSignOut = async () => {
    try {
      const res = await fetch("/customer/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-h-fit">
      <Card className=" h-full w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 flex items-center gap-4 p-4">
          <img
            src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
            alt="brand"
            className="h-8 w-8"
          />
          <Typography variant="h5" color="blue-gray">
            Uber Shopping
          </Typography>
        </div>
        <List>
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 1 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Home
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Analytics
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Reporting
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Projects
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          <Accordion
            open={open === 2}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 2 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 2}>
              <AccordionHeader
                onClick={() => handleOpen(2)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  My Order
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Orders
                </ListItem>
                <Link to={`/orders/${latestOrderId}`}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Latest Order
                  </ListItem>
                </Link>
                <Link to={`/payment/${latestOrderId}`}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Make Payment
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>
          <hr className="my-2 border-blue-gray-50" />
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Inbox
            <ListItemSuffix>
              <Chip
                value="14"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
          <Link to="/Customerprofile?tab=profile">
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
          </Link>
          <Link to="/feedbackportal?tab=feedback">
            <ListItem>
              <ListItemPrefix>
                <ChatBubbleOvalLeftIcon className="h-5 w-5" />
              </ListItemPrefix>
              Feedback Portal
            </ListItem>
          </Link>
          <Link to="/employeerate?tab=rating">
            <ListItem>
              <ListItemPrefix>
                <StarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Rate Employees
            </ListItem>
          </Link>
          <hr className="my-2 border-blue-gray-50" />
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <Link to={"/Customerlogin"}>
            <ListItem onClick={handleSignOut}>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </Link>
        </List>
      </Card>
    </div>
  );
}
