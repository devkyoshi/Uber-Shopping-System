import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";

export function ItemForm({ supermarketId }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newItem = {
      item_type: formData.get("item_type"),
      item_name: formData.get("item_name"),
      price: formData.get("price"),
      available_quantity: formData.get("available_quantity"),
      description: formData.get("description"),
      item_img: formData.get("item_img"),
    };

    try {
      // Replace 'supermarketId' with the actual ID of the supermarket

      await axios.post(
        `http://localhost:8070/Items/${supermarketId}/item-add`,
        newItem
      );
      alert("Item added to supermarket successfully!");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item to supermarket. Please try again later.");
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray" className="text-center">
        Add Item
      </Typography>

      <div className="ml-48 pl-10">
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Item Name
            </Typography>
            <Input
              size="lg"
              type="text"
              placeholder="Item 01"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="item_name"
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Item Price
            </Typography>
            <Input
              size="lg"
              type="text"
              placeholder="Rs.10.00"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="price"
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Available Quantity
            </Typography>
            <Input
              size="lg"
              type="number"
              placeholder="45"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="available_quantity"
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Description
            </Typography>
            <Input
              size="lg"
              type="text"
              placeholder="Hari lassani"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="description"
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Item Image
            </Typography>
            <Input
              size="lg"
              type="text"
              //   this should change to file
              placeholder="Upload Item image"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="item_img"

            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Item Type
            </Typography>
            <Input
              size="lg"
              type="text"
              placeholder="Electronics"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="item_type"
            />
            
            
          </div>

          <Button className="mt-6" fullWidth type="submit">
            Add Item
          </Button>
        </form>
      </div>
    </Card>
  );
}
