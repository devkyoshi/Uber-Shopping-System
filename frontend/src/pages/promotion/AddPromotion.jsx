// Example of rendering PromotionForm and passing supermarketId
import React from "react";
import { PromotionForm } from "../../components/promotion/promotionForm"; // Assuming the path is correct

const AddPromotion = ({supermarketId}) => {
  // Assuming you have supermarketId available here
  // Example id

  return (
      <PromotionForm supermarketId={supermarketId} />
   
  );
};

export default AddPromotion;
