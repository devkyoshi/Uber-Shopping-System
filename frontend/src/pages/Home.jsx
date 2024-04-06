import React from 'react'
import { SideBar } from '../components/SideBar'

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
