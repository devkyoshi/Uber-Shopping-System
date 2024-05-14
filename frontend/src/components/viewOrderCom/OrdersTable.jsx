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
  console.log("OrderID: ", orderId);

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
      "Are you sure you want to delete this order?"
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
      return; // Exit the function if deletion is canceled
    }
    setOpen(false); // Close the dialog after deletion
    navigate("/");
  };

  const makePayment = async (orderId) => {
    navigate(`/payment/${orderId}`);
    try {
      const response = await axios.put(
        `http://localhost:8070/Order/update/${orderId}`,
        {
          total_Amount: totalAmount,
        }
      );
      console.log(response.data); // Handle response from the server
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  const handleOpen = () => setOpen(!open);
  const purchaseAmount = order?.order_details?.purchase_amount;
  const deliveryCharges = order?.order_details?.delivery[0]?.charges;
  const totalAmount = purchaseAmount + deliveryCharges;

  return (
    <div className="w-full">
      <div>
        <Typography variant="h3" color="black" className="font-bold ml-10 ">
          My Order | <span className="text-gray-500">Order ID: </span>
          <span className="text-gray-500">{orderId}</span>
        </Typography>

        {/**notice about update and deletion */}
        <div className="border border-black size-max ml-24 mt-6 text-gray-600  bg-gray-200 rounded-lg">
          <p className="mt-3 ml-3 font-light ">
            When <b className="font-semibold">deleting</b> an item, make sure to
            do it whithin <b className="font-semibold">30 minutes</b> to avoid
            any issues.And also,
          </p>
          <p className="mb-3 ml-3 mr-3 font-light">
            When <b className="font-semibold">editing </b>an item, ensure to
            comlete the changes whithin{" "}
            <b className="font-semibold">30 minutes</b> to avoid any issues.
          </p>
        </div>
      </div>

      <div>
        <Typography
          variant="h6"
          color="black"
          className="font-bold text-center mt-5 ml-5"
        >
          <span className="text-gray-500">Purchase Amount: </span>
          <span className="text-gray-500  mr-10"> Rs. {purchaseAmount}.00</span>
          <span className="text-gray-500">Delivery Charges: </span>
          <span className="text-gray-500  mr-10">Rs. {deliveryCharges}.00</span>
          <span className="text-gray-500">Total Amount: </span>
          <span className="text-gray-500  mr-10">Rs. {totalAmount}.00</span>
        </Typography>
      </div>

      <Card className="mb-8">
        <div className="ml-10 mt-6 mb-10 mr-10">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="message" className="font-extrabold">
                <b>Additional Notes</b>
              </label>
              <Textarea
                id="message"
                name="message"
                value={message}
                onChange={handleMessageChange}
                placeholder="(Optional)"
              />
            </div>
            <div className="flex justify-between">
              <Button type="submit" className="ml-auto">
                Add Note
              </Button>
            </div>
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
                ({ item_name, quantity, unit, price, sm_name }, index) => {
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

      <div className="flex justify-between mt-3 space-x-2">
        <Button
          color="white"
          onClick={deleteOrder}
          className="ml-auto text-red-500 border border-red-500 hover:text-red-700"
        >
          Remove Order
        </Button>
        <Button
          color="black"
          onClick={() => makePayment(orderId)}
          className="text-white"
        >
          Make Payment
        </Button>
      </div>
    </div>
  );
}
