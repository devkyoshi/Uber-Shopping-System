import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useState, useEffect } from "react";

const TABLE_HEAD = [
  "Promotion Name",
  "Discount Rate",
  "Start Date",
  "End Date",
  "Items",
];

export function PromotionTable({ data }) {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/Promotion/${supermarketId}/promotions`
        );
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
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {promotions.map((promotion, index) => (
            <tr key={index}>
              <td className="p-4">{promotion.promotion_name}</td>
              <td className="p-4">{promotion.discount_rate}</td>
              <td className="p-4">{promotion.start_date}</td>
              <td className="p-4">{promotion.end_date}</td>
              <td className="p-4">
                <ul>
                  {promotion.Items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item.item_type}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
