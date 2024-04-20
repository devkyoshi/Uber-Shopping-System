import React from "react";
import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = ["Item Name", "Quantity", "Price", ""];

const TABLE_ROWS = [
  {
    iName: "Item 1",
    qnty: "2",
    price: "$10",
  },
  {
    iName: "Item 2",
    qnty: "1",
    price: "$15",
  },
  {
    iName: "Item 3",
    qnty: "1",
    price: "$15",
  },
];

export function OrdersTable() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  const navigate = useNavigate();

  const handleDeleteConfirm = () => {
    // Perform delete action here
    console.log("Order deleted");
    handleOpen(); // Close the dialog after deletion
  };

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
                    variant="small"
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
            {TABLE_ROWS.map(({ iName, qnty, price }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={iName}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {iName}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {qnty}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {price}
                    </Typography>
                  </td>

                  <td className={`${classes} pr-20`}>
                    <button onClick={()=>{navigate("/updateOrder",{replace: true})}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                      Edit
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
                          onClick={handleDeleteConfirm}
                        >
                          <span>Confirm</span>
                        </Button>
                      </DialogFooter>
                    </Dialog>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <hr />

      </Card>
    </div>
  );
}
