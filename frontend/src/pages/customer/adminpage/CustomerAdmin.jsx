import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CustomerAdminProfileDetail from '../../../adminview/customer/CustomerAdmin'
import OrderAdminProfileDetail from '../../../adminview/OrderAdmin'
import PaymentAdminProfileDetail from '../../../adminview/PaymentAdmin'
import RouteAdminProfileDetail from '../../../adminview/RouteAdmin'
import SupermarketAdminProfileDetail from '../../../adminview/SupermarketAdmin'
import QualityAdminProfileDetail from '../../../adminview/QualityAdmin'
import DeliveryAdminProfileDetail from '../../../adminview/DeliveryAdmin'
import ProfileSideBar from '../../../components/customer/profilecomponent/CustomerProfileSideBar'
import ShowCustomers from '../../../adminview/customer/ShowCustomers'
import ShowCustomerFeedbacks from '../../../adminview/customer/ShowCustomerFeedbacks'

export default function CustomerAdmin() {
  const location = useLocation()
const [tab, setTab] = useState('')
useEffect(() => {
  const urlParams = new URLSearchParams(location.search)
  const tabFromUrl = urlParams.get('tab')
  if(tabFromUrl) {
    setTab(tabFromUrl);
  }
},[location.search])
  return (
    <div className='main-layout bg min-h-screen flex flex-col md:flex-row'>
      <div className="flex flex-auto">{/* profile sidebar */}
        <ProfileSideBar />
      </div>

      <div className="inner-layout">
      {/* profile.. */}
      {tab === 'customeradmin' && <CustomerAdminProfileDetail />}
      {tab === 'showusers' && <ShowCustomers />}
      {tab === 'showfeedbacks' && <ShowCustomerFeedbacks />}
      {tab === 'orderadmin' && <OrderAdminProfileDetail />}
      {tab === 'paymentadmin' && <PaymentAdminProfileDetail />}
      {tab === 'routeadmin' && <RouteAdminProfileDetail />}
      {tab === 'supermarketadmin' && <SupermarketAdminProfileDetail />}
      {tab === 'qualityadmin' && <QualityAdminProfileDetail />}
      {tab === 'deliveryadmin' && <DeliveryAdminProfileDetail />}</div>
    </div>
  )
}
