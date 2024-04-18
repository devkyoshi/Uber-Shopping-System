import React from 'react'
import { SideBar } from '../../components/SideBar'
import { PromotionTab } from '../../components/promotion/promotionTab';


export default function PromotionUI({supermarketId}) {
  return (
    <div className="main-layout">
        <SideBar/>
        <div className="inner-layout">
       <PromotionTab supermarketId="66161123ea585633658a2b78" />
        </div>
    </div>
  );
}
