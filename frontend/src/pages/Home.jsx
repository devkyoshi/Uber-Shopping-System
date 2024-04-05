import React from 'react'
import { SideBar } from '../components/SideBar'
import { Promotions } from '../components/Promotions'

export default function Home() {
  return (
    <div className="bg">
    <div className="main-layout ">
    <SideBar/>
    <div className='inner-layout'>
      <Promotions/>
    </div>
    </div>
    </div>
  )
}
