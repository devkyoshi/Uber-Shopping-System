import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function CardContainer({
  itemName,
  description,
  itemImage,
  items,
  addToCart,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItemID, setSelectedItemID] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { currentCustomer } = useSelector((state) => state.customer);
  const navigate = useNavigate();

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChange = (value) => {
    setSelectedItemID(value);
    console.log("Item ID: ", value);
  };

  const handleQuantityChange = (value) => {
    setQuantity(value); // No need to convert value to number
  };

  const handleAddToCart = () => {
    if (!currentCustomer) {
      navigate("/Customerlogin");
      return;
    }
    const selectedItem = items.find((item) => item.item_id === selectedItemID);
    if (selectedItem) {
      const newItem = {
        item_id: selectedItemID,
        name: itemName,
        quantity: quantity,
        price: selectedItem.price,
      };
      addToCart(newItem); // Call addToCart function from props
      setSelectedItemID("");
      setQuantity(1);
    } else {
      console.error("Selected item not found");
    }
  };

  return (
    <Card className="w-72 h-auto">
      <CardHeader shadow={false} floated={false} className="h-40">
        <img
          src={itemImage}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="flex flex-col justify-between">
        <div className="mb-1 flex items-center justify-between">
          <Typography color="blue-gray" className="font-bold text-sm">
            {itemName}
          </Typography>
        </div>
        <div className="overflow-hidden">
          <Typography
            variant="small"
            color="gray"
            className={`font-normal opacity-75 ${
              isExpanded ? "h-auto" : "h-16"
            } text-sm`}
          >
            {description}
          </Typography>
        </div>
        {!isExpanded && (
          <Typography
            color="gray"
            onClick={toggleDescription}
            className="cursor-pointer mt-1 font-medium text-sm"
          >
            Read More
          </Typography>
        )}
      </CardBody>
      <CardFooter className="pt-0 items-center justify-center ml-1">
        <Popover placement="bottom">
          <PopoverHandler>
            <Button className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
              View Product
            </Button>
          </PopoverHandler>
          <PopoverContent className="w-96 shadow-lg">
            <form className="mt-8 mb-2 ">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  SuperMarket
                </Typography>

                <Select
                  value={selectedItemID}
                  onChange={(value) => handleChange(value)}
                  size="lg"
                  placeholder="Select Supermarket"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                >
                  {items.map((item) => (
                    <Option key={item.item_id} value={item.item_id}>
                      {item.sm_name} - Rs. {item.price}
                    </Option>
                  ))}
                </Select>

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Quantity
                </Typography>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(event) => handleQuantityChange(event.target.value)}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <Button className="mt-6" onClick={handleAddToCart} fullWidth>
                Add To Cart
              </Button>
            </form>
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
}
