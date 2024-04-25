import React from 'react'
import { OrderDetails } from '../components/viewCom/OrderDetails'

export default function DetailedOrder() {
  return (
    <div>
        <div className='main-layout bg justify-items-center'>
            <div className='inner-layout'> 
                <OrderDetails />
            </div>
        </div>
    </div>
  )
}
