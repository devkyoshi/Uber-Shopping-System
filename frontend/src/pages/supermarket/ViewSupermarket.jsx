import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography, Input, Button } from "@material-tailwind/react";

export default function ViewSupermarketsUI() {
  const [supermarkets, setSupermarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editableSupermarketId, setEditableSupermarketId] = useState(null);
  const [updatedSupermarketData, setUpdatedSupermarketData] = useState({
    sm_name: "",
    sm_location: "",
  });

  useEffect(() => {
    const fetchSupermarkets = async () => {
      try {
        const response = await axios.get("http://localhost:8070/Supermarket/supermarkets");
        setSupermarkets(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching supermarkets:", error);
      }
    };

    fetchSupermarkets();
  }, []);

  const handleUpdateClick = (supermarketId) => {
    setEditableSupermarketId(supermarketId);
    const selectedSupermarket = supermarkets.find((supermarket) => supermarket._id === supermarketId);
    if (selectedSupermarket) {
      setUpdatedSupermarketData({
        sm_name: selectedSupermarket.sm_name,
        sm_location: selectedSupermarket.sm_location,
      });
    }
  };

  const handleInputChange = (e, key) => {
    const { value } = e.target;
    setUpdatedSupermarketData({
      ...updatedSupermarketData,
      [key]: value,
    });
  };

  const handleUpdate = async (supermarketId) => {
    try {
      await axios.put(
        `http://localhost:8070/Supermarket/supermarket-update/${supermarketId}`,
        updatedSupermarketData
      );
      // Fetch updated supermarkets after successful update
      const response = await axios.get("http://localhost:8070/Supermarket/supermarkets");
      setSupermarkets(response.data);
      setEditableSupermarketId(null);
    } catch (error) {
      console.error("Error updating supermarket:", error);
    }
  };

  const handleDelete = async (supermarketId) => {
    try {
      await axios.delete(
        `http://localhost:8070/Supermarket/supermarket-delete/${supermarketId}`
      );
      // Filter out the deleted supermarket from the supermarkets array
      setSupermarkets(supermarkets.filter((supermarket) => supermarket._id !== supermarketId));
    } catch (error) {
      console.error("Error deleting supermarket:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
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
                Location
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
          {supermarkets.map((supermarket, index) => {
            const isLast = index === supermarkets.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={supermarket._id}>
                <td className={classes}>
                  {editableSupermarketId === supermarket._id ? (
                    <Input
                      type="text"
                      value={updatedSupermarketData.sm_name}
                      onChange={(e) => handleInputChange(e, "sm_name")}
                    />
                  ) : (
                    supermarket.sm_name
                  )}
                </td>
                <td className={classes}>
                  {editableSupermarketId === supermarket._id ? (
                    <Input
                      type="text"
                      value={updatedSupermarketData.sm_location}
                      onChange={(e) => handleInputChange(e, "sm_location")}
                    />
                  ) : (
                    supermarket.sm_location
                  )}
                </td>
                <td
                  className={`${classes} bg-blue-gray-50/50`}
                  style={{ textAlign: "center" }}
                >
                  {editableSupermarketId === supermarket._id ? (
                    <Button
                      onClick={() => handleUpdate(supermarket._id)}
                      className="bg-green-700 hover:bg-green-900"
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleUpdateClick(supermarket._id)}
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
                  <Button
                    onClick={() => handleDelete(supermarket._id)}
                    className="bg-red-700 hover:bg-red-900"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
