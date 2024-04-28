import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"
import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const TABLE_HEAD = ["Item Name", "Quantity", "Price", ""];

const TABLE_ROWS = [
  {
    item_name: "Item 1",
    quantity: "2",
    price: "$10",
  },
  {
    item_name: "Item 2",
    quantity: "1",
    price: "$15",
  },
  {
    item_name: "Item 3",
    quantity: "1",
    price: "$15",
  },
  {
    item_name: "Chocolate chips cookies",
    quantity: "1",
    price: "$4"
  }
];

export function OrdersTable() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  const navigate = useNavigate();

  // handling deletion
  const deleteOrder = async (order_id) => {
    const confirmDelete = window.confirm('Are you sure want to delete this order?');

    if(confirmDelete) {
      try {
        await axios.delete('http://localhost:8070/order/order-delete/${order_id}');
      } catch(error) {
        console.error('Error in Order deletion: ', error);
      }
    } else {
      console.error('Deletion canceled!');
    }
  }

  return (
    <div className="w-full">
      <Typography
        variant="h3"
        color="black"
        className="font-bold mb-2 ml-10 pt-2"
      >
        My Order
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
            {TABLE_ROWS.map(({ item_name, quantity, price }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
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

                  <td className={`${classes} pr-20`}>
                    <button onClick={()=>{navigate('/updateOrder', {replace: true})}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                      Edit
                    </button>
                    <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={()=>{navigate('/details', {replace: true})}}
                    >   
                    View
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={handleOpen}
                    >
                      Remove
                    </button>
                    

                    {/**pop up confirmation message for deletion */}
                    <Dialog open={open} handler={handleOpen} transitionDuration={300}>
                      <DialogHeader>Order Deletion</DialogHeader>
                      <DialogBody>
                      This will be permanently removed. Are you sure? want to delete this order.<br></br>
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
                        <Button
                          variant="gradient"
                          color="green"
                          onClick={deleteOrder}
                        >
                          <span>Confirm</span>
                        </Button>
                      </DialogFooter>
                    </Dialog>
                    {/**pop up confirmation message for deletion ends*/}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <hr />

        {/*<div className="p-5 pl-32">
          <Typography variant="small" color="blue-gray" className="font-bold">
            Delivery Charges: {"$5"}
          </Typography>{" "}
          <br />
          <Typography variant="small" color="blue-gray" className="font-bold">
            Total Price : {"$30"}
          </Typography>
        </div>*/}

      </Card>
    </div>
  );
}