import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function AdminPrivateRoute() {
    const { currentCustomer } = useSelector((state) => state.customer)
  return currentCustomer && currentCustomer.adminType !== 'null' ? <Outlet /> : <Navigate to= '/Customerprofile?tab=profile' />
}
