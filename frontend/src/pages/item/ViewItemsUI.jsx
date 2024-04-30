import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography, Input, Button } from "@material-tailwind/react";

export function ViewItemsUI({ supermarketId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editableItemId, setEditableItemId] = useState(null);
  const [updatedItemData, setUpdatedItemData] = useState({
    item_type: "",
    item_name: "",
    price: "",
    available_quantity: "",
    description: "",
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/Items/${supermarketId}/items`
        );
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [supermarketId]);

  const handleUpdateClick = (itemId) => {
    setEditableItemId(itemId);
    const selectedItem = items.find((item) => item._id === itemId);
    if (selectedItem) {
      setUpdatedItemData({
        item_type: selectedItem.item_type,
        item_name: selectedItem.item_name,
        price: selectedItem.price,
        available_quantity: selectedItem.available_quantity,
        description: selectedItem.description,
      });
    }
  };

  const handleInputChange = (e, key) => {
    const { value } = e.target;
    setUpdatedItemData({
      ...updatedItemData,
      [key]: value,
    });
  };

  const handleUpdate = async (itemId) => {
    try {
      await axios.put(
        `http://localhost:8070/Items/${supermarketId}/item-update/${itemId}`,
        updatedItemData
      );
      // Fetch updated items after successful update
      const response = await axios.get(
        `http://localhost:8070/Items/${supermarketId}/items`
      );
      setItems(response.data);
      setEditableItemId(null);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(
        `http://localhost:8070/Items/${supermarketId}/item-delete/${itemId}`
      );
      // Filter out the deleted item from the items array
      setItems(items.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className=" table-auto text-left">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 ">
              <Typography
                variant="small"
                color="blue-gray"
                style={{ fontWeight: "bolder" }}
                className="font-normal leading-none opacity-70 text-center"
              >
                Name
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                style={{ fontWeight: "bolder" }}
                className="font-normal leading-none opacity-70 text-center"
              >
                Item Type
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                style={{ fontWeight: "bolder" }}
                className="font-normal leading-none opacity-70 text-center"
              >
                Price
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                style={{ fontWeight: "bolder" }}
                className="font-normal leading-none opacity-70 text-center"
              >
                Quantity
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                style={{ fontWeight: "bolder" }}
                className="font-normal leading-none opacity-70 text-center"
              >
                Description
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                style={{ fontWeight: "bolder" }}
                className="font-normal leading-none opacity-70 text-center"
              >
                Update
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                style={{ fontWeight: "bolder" }}
                className="font-normal leading-none opacity-70 text-center"
              >
                Delete
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={item._id}>
                <td className={classes}>
                  {editableItemId === item._id ? (
                    <Input
                      type="text"
                      value={updatedItemData.item_name}
                      onChange={(e) => handleInputChange(e, "item_name")}
                    />
                  ) : (
                    item.item_name
                  )}
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  {editableItemId === item._id ? (
                    <Input
                      type="text"
                      value={updatedItemData.item_type}
                      onChange={(e) => handleInputChange(e, "item_type")}
                    />
                  ) : (
                    item.item_type
                  )}
                </td>
                <td className={classes}>
                  {editableItemId === item._id ? (
                    <Input
                      type="number"
                      value={updatedItemData.price}
                      onChange={(e) => handleInputChange(e, "price")}
                    />
                  ) : (
                    item.price
                  )}
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  {editableItemId === item._id ? (
                    <Input
                      type="number"
                      value={updatedItemData.available_quantity}
                      onChange={(e) =>
                        handleInputChange(e, "available_quantity")
                      }
                    />
                  ) : (
                    item.available_quantity
                  )}
                </td>
                <td className={classes}>
                  {editableItemId === item._id ? (
                    <Input
                      type="text"
                      value={updatedItemData.description}
                      onChange={(e) => handleInputChange(e, "description")}
                    />
                  ) : (
                    item.description
                  )}
                </td>
                <td
                  className={`${classes} bg-blue-gray-50/50`}
                  style={{ textAlign: "center" }}
                >
                  {editableItemId === item._id ? (
                    <Button
                      onClick={() => handleUpdate(item._id)}
                      className="bg-green-700 hover:bg-green-900"
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleUpdateClick(item._id)}
                      className="hover:bg-black"
                    >
                      Update
                    </Button>
                  )}
                </td>
                <td
                  className={`${classes} bg-blue-gray-50/50`}
                  style={{ textAlign: "center" }}
                >
                  <div>
                    <Button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-700 hover:bg-red-900"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
