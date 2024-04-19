import React from 'react'
import { SideBar } from '../components/SideBar'
import { Footer } from '../components/Footer'
import AddOrderDelivery from '../components/orderDelivery/AddOrderDelivery'


export default function OrderDelivery() {
    return (
      <div>
          <div className='main-layout bg'>
              <SideBar/>
              <div className='inner-layout'> 
                  <AddOrderDelivery/>
              </div>
              
          </div>
           <Footer/>
      </div>
    )
  }
  