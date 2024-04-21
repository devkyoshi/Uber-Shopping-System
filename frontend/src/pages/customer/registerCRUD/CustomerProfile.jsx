import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProfileSideBar from '../../../components/customer/profilecomponent/CustomerProfileSideBar'
import ProfileDetail from '../../../components/customer/profilecomponent/CustomerProfileDetail'

export default function Profile() {
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
      <div className='flex flex-auto md:w-56'>{/* profile sidebar */}
        <ProfileSideBar />
      </div>
      {/* profile.. */}
      <div className="inner-layout">{tab === 'profile' && <ProfileDetail />}</div>
    </div>
  )
}
