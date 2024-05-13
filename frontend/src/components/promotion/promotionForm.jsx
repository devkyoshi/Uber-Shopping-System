import React, { useState } from "react";
import axios from "axios";
import {
  Alert,
  Card,
  Input,
  Button,
  Typography,
  Checkbox,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";

export function PromotionForm({ supermarketId }) {
  const [promotionData, setPromotionData] = useState({
    promotion_name: "",
    discount_rate: "",
    start_date: "",
    end_date: "",
    Items: [],
  });

  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value, type, checked } = e.target;
      // For checkboxes, use checked instead of value
      const newValue = type === "checkbox" ? checked : value;

      if (name === "promotion_name" || name === "discount_rate") {
        // Regular expression to match alphanumeric characters and space
        const regex = /^[a-zA-Z0-9 . %]*$/;

        // If the input matches the regex, update state
        if (regex.test(value)) {
          setPromotionData({
            ...promotionData,
            [name]: newValue,
          });
        }
      } else if (name === "item_type") {
        // If the checkbox is checked, add the item type to Items
        const updatedItems = newValue
          ? [...promotionData.Items, value]
          : promotionData.Items.filter((item) => item !== value);

        setPromotionData({
          ...promotionData,
          Items: updatedItems,
        });
      } else {
        setPromotionData({
          ...promotionData,
          [name]: newValue,
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8070/Promotion/${supermarketId}/promotion-add`,
        {
          ...promotionData,
          // Include selected item types in the request body
          Items: promotionData.Items.map((item) => ({ item_type: item })),
        }
      );
      alert("Promotion added to supermarket successfully!");
      console.log(response.data); // You can handle success response here
    } catch (error) {
      console.error(error); // You can handle error response here
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray" className="text-center">
        Add Promotion Item
      </Typography>
      <div className="items-center justify-center">
        <form onSubmit={handleSubmit} className="mt-8 mb-2 sm:w-full">
          <div className="flex flex-wrap justify-between">
            {/* Left Part */}
            <div className="w-full md:w-1/2">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Promotion Name
                </Typography>
                <Input
                  type="text"
                  size="lg"
                  required
                  placeholder="name"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="promotion_name"
                  value={promotionData.promotion_name}
                  onChange={handleChange}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Discount Rate
                </Typography>
                <Input
                  required
                  size="lg"
                  placeholder="0.00"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="discount_rate"
                  value={promotionData.discount_rate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Right Part */}
            <div className="w-full md:w-1/2 pl-10">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Start Date
                </Typography>
                <Input
                  required
                  type="date"
                  size="lg"
                  placeholder=""
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="start_date"
                  value={promotionData.start_date}
                  onChange={handleChange}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  End Date
                </Typography>
                <Input
                  required
                  type="date"
                  size="lg"
                  placeholder=""
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="end_date"
                  value={promotionData.end_date}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Item Type Section */}
          <div>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Item Type
            </Typography>
            <List>
              <div className="inline-flex">
                <div className="w-1/3">
                  <ListItem className="p-0">
                    <label
                      htmlFor="vertical-list-react"
                      className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                      <ListItemPrefix className="mr-3">
                        <Checkbox
                          id="Groceries"
                          ripple={false}
                          className="hover:before:opacity-0"
                          containerProps={{
                            className: "p-0",
                          }}
                          name="item_type"
                          value="Groceries"
                          checked={promotionData.Items.includes("Groceries")}
                          onChange={handleChange}
                        />
                      </ListItemPrefix>
                      <Typography color="blue-gray" className="font-medium">
                        Groceries
                      </Typography>
                    </label>
                  </ListItem>
                  <ListItem className="p-0">
                    <label
                      htmlFor="vertical-list-react"
                      className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                      <ListItemPrefix className="mr-3">
                        <Checkbox
                          id="Bakery"
                          ripple={false}
                          className="hover:before:opacity-0"
                          containerProps={{
                            className: "p-0",
                          }}
                          name="item_type"
                          value="Bakery"
                          checked={promotionData.Items.includes("Bakery")}
                          onChange={handleChange}
                        />
                      </ListItemPrefix>
                      <Typography color="blue-gray" className="font-medium">
                        Bakery
                      </Typography>
                    </label>
                  </ListItem>
                  <ListItem className="p-0">
                    <label
                      htmlFor="vertical-list-react"
                      className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                      <ListItemPrefix className="mr-3">
                        <Checkbox
                          id="Pharmacy"
                          ripple={false}
                          className="hover:before:opacity-0"
                          containerProps={{
                            className: "p-0",
                          }}
                          name="item_type"
                          value="Pharmacy"
                          checked={promotionData.Items.includes("Pharmacy")}
                          onChange={handleChange}
                        />
                      </ListItemPrefix>
                      <Typography color="blue-gray" className="font-medium">
                        Pharmacy
                      </Typography>
                    </label>
                  </ListItem>
                </div>
                <div className="w-1/2">
                  <ListItem className="p-0">
                    <label
                      htmlFor="vertical-list-react"
                      className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                      <ListItemPrefix className="mr-3">
                        <Checkbox
                          id="Fruits"
                          ripple={false}
                          className="hover:before:opacity-0"
                          containerProps={{
                            className: "p-0",
                          }}
                          name="item_type"
                          value="Fruits"
                          checked={promotionData.Items.includes("Fruits")}
                          onChange={handleChange}
                        />
                      </ListItemPrefix>
                      <Typography color="blue-gray" className="font-medium">
                        Fruits
                      </Typography>
                    </label>
                  </ListItem>
                  <ListItem className="p-0">
                    <label
                      htmlFor="vertical-list-react"
                      className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                      <ListItemPrefix className="mr-3">
                        <Checkbox
                          id="Vegetables"
                          ripple={false}
                          className="hover:before:opacity-0"
                          containerProps={{
                            className: "p-0",
                          }}
                          name="item_type"
                          value="Vegetables"
                          checked={promotionData.Items.includes("Vegetables")}
                          onChange={handleChange}
                        />
                      </ListItemPrefix>
                      <Typography color="blue-gray" className="font-medium">
                        Vegetables
                      </Typography>
                    </label>
                  </ListItem>
                  <ListItem className="p-0">
                    <label
                      htmlFor="vertical-list-react"
                      className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                      <ListItemPrefix className="mr-3">
                        <Checkbox
                          id="Electronics"
                          ripple={false}
                          className="hover:before:opacity-0"
                          containerProps={{
                            className: "p-0",
                          }}
                          name="item_type"
                          value="Electronics"
                          checked={promotionData.Items.includes("Electronics")}
                          onChange={handleChange}
                        />
                      </ListItemPrefix>
                      <Typography color="blue-gray" className="font-medium">
                        Electronics
                      </Typography>
                    </label>
                  </ListItem>
                </div>
              </div>
                       
            </List>
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Promotion Add
          </Button>
        </form>
      </div>
    </Card>
  );
}
