import React from "react";
import { SideBar } from "../../components/SideBar";
import { ItemTab } from "../../components/item/ItemTab";

export default function ItemUI() {
  return (
    <div className="main-layout">
      <SideBar />
      <div className="inner-layout">
        <ItemTab supermarketId="6627609e0ecfe8b994946ffe" />
      </div>
    </div>
  );
}
