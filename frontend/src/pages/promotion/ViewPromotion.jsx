import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography } from "@material-tailwind/react";

const ViewPromotion = ({ supermarketId }) => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        // Check if supermarketId is defined before making the API request
        if (!supermarketId) {
          setLoading(false); // Set loading to false to stop the loading indicator
          return; // Exit early if supermarketId is undefined
        }

        const response = await axios.get(
          `http://localhost:8070/Promotion/${supermarketId}/promotions`
        );
        const data = response.data;
        console.log(data);
        setPromotions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    fetchPromotions();
  }, [supermarketId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                style={{ fontWeight: "bolder" }}
                className="font-normal leading-none opacity-70 text-center"
              >
                Promotion Name
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                style={{ fontWeight: "bolder" }}
                className="font-normal leading-none opacity-70 text-center"
              >
                Discount Rate
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                style={{ fontWeight: "bolder" }}
                className="font-normal leading-none opacity-70 text-center"
              >
                Start Date
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                style={{ fontWeight: "bolder" }}
                className="font-normal leading-none opacity-70 text-center"
              >
                End Date
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {promotions.map((promotion, index) => (
            <tr key={index}>
              <td className="border-b border-blue-gray-100 p-4">{promotion.promotion_name}</td>
              <td className="border-b border-blue-gray-100 p-4">{promotion.discount_rate}</td>
              <td className="border-b border-blue-gray-100 p-4">{promotion.start_date}</td>
              <td className="border-b border-blue-gray-100 p-4">{promotion.end_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export default ViewPromotion;
