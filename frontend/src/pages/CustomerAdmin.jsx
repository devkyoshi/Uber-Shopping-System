import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import AdminProfileDetail from '../components/CustomerAdminProfileDetail'
import ProfileSideBar from '../components/CustomerProfileSideBar'

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
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>{/* profile sidebar */}
        <ProfileSideBar />
      </div>
      {/* profile.. */}
      {tab === 'admin' && <AdminProfileDetail />}
    </div>
  )
}
