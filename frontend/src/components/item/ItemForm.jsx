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

  const handleKeyPress = (e) => {
    // If the pressed key is not a letter, digit, or '@', prevent the default action
    if (!/[a-zA-Z0-9 ()]/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray" className="text-center">
        Add Item
      </Typography>

      <div className="items-center justify-center">
        <form className="mt-8 mb-2 sm:w-full" onSubmit={handleSubmit}>
          <div className="flex flex-wrap justify-between w-full">
            {/* First Column */}
            <div className="w-full md:w-1/2">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Item Name
                </Typography>
                <Input
                  required
                  onKeyPress={handleKeyPress}
                  size="lg"
                  type="text"
                  placeholder="Item 01"
                  className="w-full md:w-4/5 !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="item_name"
                />

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Item Price
                </Typography>
                <Input
                  required
                  size="lg"
                  type="text"
                  placeholder="Rs.10.00"
                  className="w-full md:w-4/5  !border-t-blue-gray-200 focus:!border-t-gray-900"
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
                  className="w-full md:w-4/5  !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="available_quantity"
                />
              </div>
            </div>

            {/* Second Column */}
            <div className="w-full md:w-1/2">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Description
                </Typography>
                <Input
                  size="lg"
                  type="text"
                  placeholder="Hari lassani"
                  className="w-full md:w-4/5  !border-t-blue-gray-200 focus:!border-t-gray-900"
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
                  className="w-full md:w-4/5  !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="item_img"
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Item Type
                </Typography>
                <select
                  className="w-full md:w-4/5  !border-t-blue-gray-200 focus:!border-t-gray-900"
                  name="item_type"
                >
                  <option value="Groceries">Groceries</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Electronics">Electronics</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
          </div>

          <Button className="mt-6" fullWidth type="submit">
            Add Item
          </Button>
        </form>
      </div>
    </Card>
  );
}
