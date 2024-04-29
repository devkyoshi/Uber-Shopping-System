import React from 'react'
import { SideBar } from '../../components/SideBar'
import { PromotionTab } from '../../components/promotion/promotionTab';
import { useParams } from "react-router-dom";


export default function PromotionUI() {
  const {supermarketId} = useParams(); //get parameter value
  return (
    <div className="main-layout">
        <SideBar/>
        <div className="inner-layout">
       <PromotionTab supermarketId= {supermarketId} />
        </div>
    </div>
  );
}
