import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoute() {
    const { currentCustomer } = useSelector((state) => state.customer)
  return currentCustomer ? <Outlet /> : <Navigate to= '/Customerlogin' />
}
