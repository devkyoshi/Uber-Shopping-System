import React from 'react'
import { SideBar } from '../../components/SideBar'
import { SupermarketTab } from '../../components/supermarket/SupermarketTab'

export default function SupermarketUI() {
  return (
    <div className="main-layout">
        <SideBar/>
        <div className="inner-layout">
       <SupermarketTab />
        </div>
    </div>
  )
}
