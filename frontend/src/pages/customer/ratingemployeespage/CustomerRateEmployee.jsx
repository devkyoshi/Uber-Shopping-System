import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { SideBar } from '../../../components/SideBar'
import CustomerRateTab from '../../../components/customer/ratingemployees/CustomerRateTab'

export default function CustomerRate() {
  const location = useLocation()
  const [tab, setTab] = useState('')
  const { currentCustomer } = useSelector(state => state.customer)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl) {
      setTab(tabFromUrl);
    }
  },[location.search])
  return (
    <div className='main-layout bg min-h-screen flex flex-col md:flex-row'>
      <div className='flex flex-auto'>
        <SideBar/>
      </div>
      <div className="inner-layout">{tab === 'rating' && <CustomerRateTab cus_id={currentCustomer._id}/>}</div>
    </div>
  )
}
