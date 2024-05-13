import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography, Input, Button } from "@material-tailwind/react";

export default function ViewPromotionUI({ supermarketId }) {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editablePromotionId, setEditablePromotionId] = useState(null);
  const [updatedPromotionData, setUpdatedPromotionData] = useState({
    promotion_name: "",
    discount_rate: "",
    start_date: "",
    end_date: "",
  });

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
  }, []);

  const handleUpdateClick = (promotionId) => {
    setEditablePromotionId(promotionId);
    const selectedPromotion = promotions.find(
      (promotion) => promotion._id === promotionId
    );
    if (selectedPromotion) {
      setUpdatedPromotionData({
        promotion_name: selectedPromotion.promotion_name,
        discount_rate: selectedPromotion.discount_rate,
        start_date: selectedPromotion.start_date,
        end_date: selectedPromotion.end_date,
      });
    }
  };

  const handleInputChange = (e, key) => {
    const { value } = e.target;
    setUpdatedPromotionData({
      ...updatedPromotionData,
      [key]: value,
    });
  };

  const handleUpdate = async (promotionId) => {
    try {
      await axios.put(
        `http://localhost:8070/Promotion/${supermarketId}/promotion-update/${promotionId}`,
        updatedPromotionData
      );
      // Fetch updated promotions after successful update
      const response = await axios.get(
        `http://localhost:8070/Promotion/${supermarketId}/promotions`
      );
      setPromotions(response.data);
      setEditablePromotionId(null);
    } catch (error) {
      console.error("Error updating promotion:", error);
    }
  };

  const handleDelete = async (promotionId) => {
    try {
      await axios.delete(
        `http://localhost:8070/Promotion/${supermarketId}/promotion-delete/${promotionId}`
      );
      // Filter out the deleted promotion from the promotions array
      setPromotions(
        promotions.filter((promotion) => promotion._id !== promotionId)
      );
    } catch (error) {
      console.error("Error deleting promotion:", error);
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
          {promotions.map((promotion, index) => (
            <tr key={index}>
              <td className="border-b border-blue-gray-100 p-4">
                {editablePromotionId === promotion._id ? (
                  <Input
                    type="text"
                    value={updatedPromotionData.promotion_name}
                    onChange={(e) => handleInputChange(e, "promotion_name")}
                  />
                ) : (
                  promotion.promotion_name
                )}
              </td>
              <td className="border-b border-blue-gray-100 p-4">
                {editablePromotionId === promotion._id ? (
                  <Input
                    type="text"
                    value={updatedPromotionData.discount_rate}
                    onChange={(e) => handleInputChange(e, "discount_rate")}
                  />
                ) : (
                  promotion.discount_rate
                )}
              </td>
              <td className="border-b border-blue-gray-100 p-4">
                {editablePromotionId === promotion._id ? (
                  <Input
                    type="text"
                    value={updatedPromotionData.start_date}
                    onChange={(e) => handleInputChange(e, "start_date")}
                  />
                ) : (
                  promotion.start_date
                )}
              </td>
              <td className="border-b border-blue-gray-100 p-4">
                {editablePromotionId === promotion._id ? (
                  <Input
                    type="text"
                    value={updatedPromotionData.end_date}
                    onChange={(e) => handleInputChange(e, "end_date")}
                  />
                ) : (
                  promotion.end_date
                )}
              </td>
              <td className="border-b border-blue-gray-100 p-4">
                {editablePromotionId === promotion._id ? (
                  <Button onClick={() => handleUpdate(promotion._id)}>
                    Save
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleUpdateClick(promotion._id)}
                    className="hover:bg-black"
                  >
                    Update
                  </Button>
                )}
              </td>
              <td className="border-b border-blue-gray-100 p-4">
                <Button
                  onClick={() => handleDelete(promotion._id)}
                  className="bg-red-700 hover:bg-red-900"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
