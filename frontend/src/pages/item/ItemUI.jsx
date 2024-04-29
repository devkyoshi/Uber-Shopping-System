import React from "react";
import { SideBar } from "../../components/SideBar";
import { ItemTab } from "../../components/item/ItemTab";
import { useParams } from "react-router-dom";

export default function ItemUI() {

  const {supermarketId} = useParams(); //get parameter value
  console.log("Passed supermarketID: ", supermarketId);
  return (
    <div className="main-layout">
      <SideBar />
      <div className="inner-layout">
        <ItemTab supermarketId={supermarketId} />
      </div>
    </div>
  );
}
