import React from "react";
import { ItemForm } from "../../components/item/ItemForm";

export default function AddItemUI({ supermarketId }) {
  return <ItemForm supermarketId={supermarketId} />;
}
