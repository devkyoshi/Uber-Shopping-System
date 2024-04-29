import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";

const TABLE_HEAD = ["Item Name", "Quantity", "Price", "SuperMarket Name"];

export function OrdersTable({ orderId }) {
  const [order, setOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/Order/details/${orderId}`
        );
        setOrder(response.data);
        console.log("Order Data: ", response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [orderId]);

  //handle submit to add additional notes
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to your backend endpoint with Axios
      const response = await axios.put(
        `http://localhost:8070/Order/update/${orderId}`,
        {
          additionalNotes: message,
        }
      );

      console.log(response.data); // Handle response from the server
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  // handling deletion
  const deleteOrder = async () => {
    const confirmDelete = window.confirm(
      "Are you sure want to delete this order?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:8070/Order/order-delete/${orderId}`
        );
      } catch (error) {
        console.error("Error in Order deletion: ", error);
      }
    } else {
      console.error("Deletion canceled!");
    }
    setOpen(false); // Close the dialog after deletion
    navigate("/");
  };

  const makePayment = (orderId) => {
    navigate(`/payment/${orderId}`);
  };

  const handleOpen = () => setOpen(!open);

  return (
    <div className="w-full">
      <Typography
        variant="h3"
        color="black"
        className="font-bold mb-2 text-center"
      >
        My Order
      </Typography>

      <Card className="mb-10 ">
        <div className="m-10 ">
          <Typography>Order ID: {orderId}</Typography>
          {/* <Typography>
            Purchase Amount: Rs. {order.order_details.purchase_amount}
          </Typography>
          <Typography>Order Date: {order.order_details.order_date}</Typography> */}

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="message">Additional Notes</label>
              <Textarea
                id="message"
                name="message"
                value={message}
                onChange={handleMessageChange}
              />
            </div>
            <Button type="submit">Add Additional Note</Button>
          </form>
        </div>
      </Card>

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

        <Dialog open={open} handler={handleOpen} transitionDuration={300}>
          <DialogHeader>Order Deletion</DialogHeader>
          <DialogBody>
            This will be permanently removed. Are you sure? want to delete this
            order.<br></br>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={deleteOrder}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </Card>

      <div className=" mt-10 ml-96">
        <Button color="red" onClick={deleteOrder}>
          Remove Order
        </Button>
        <Button color="green" onClick={() => makePayment(orderId)}>
          Make Payment
        </Button>
      </div>
    </div>
  );
}
