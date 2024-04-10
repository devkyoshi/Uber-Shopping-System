import React from "react";
import { SideBar } from "../../components/SideBar";
import { ItemTab } from "../../components/item/ItemTab";

export default function ItemUI() {
  return (
    <div className="main-layout">
      <SideBar />
      <div className="inner-layout">
        <ItemTab supermarketId="66161123ea585633658a2b78" />
      </div>
    </div>
  );
}
