import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography, Spinner, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function ViewSupermarketsUI() {
  const [supermarkets, setSupermarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupermarkets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/Supermarket/supermarkets"
        );
        setSupermarkets(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching supermarkets:", error);
      }
    };

    fetchSupermarkets();
  }, []);

  const handleViewItems = (supermarketId) => {
    navigate(`/items/${supermarketId}`);
  };

  const handleViewPromotions = (supermarketId) => {
    navigate(`/promotions/${supermarketId}`);
  };

  if (loading) {
    return (
      <div>
        {" "}
        <Spinner />{" "}
      </div>
    );
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
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"></th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"></th>
          </tr>
        </thead>
        <tbody>
          {supermarkets.map((supermarket, index) => {
            const isLast = index === supermarkets.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={supermarket._id}>
                <td className={classes}>{supermarket.sm_name}</td>
                <td className={classes}>{supermarket.sm_location}</td>
                <td>
                  <Button onClick={() => handleViewItems(supermarket._id)}>
                    Add Items
                  </Button>
                </td>
                <td>
                  <Button onClick={() => handleViewPromotions(supermarket._id)}>
                    Add Promotions
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
