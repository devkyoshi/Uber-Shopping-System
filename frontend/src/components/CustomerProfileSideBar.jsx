import React from 'react'
import { Sidebar } from 'flowbite-react'
import { HiArrowSmRight, HiUser } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { signoutSuccess } from '../redux/customer/customerRegisterSlice';
import { useDispatch,useSelector } from 'react-redux';


export default function ProfileSideBar() {
  const location = useLocation()
  const locationLink = useLocation()
  const [tab, setTab] = useState('')
  const dispatch = useDispatch();
  const { currentCustomer } = useSelector((state) => state.customer)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl) {
      setTab(tabFromUrl);
    }
  },[location.search])

  const handleSignOut = async () => {
    try {
      const res = await fetch('/customer/signout', {
        method:'POST'
      });
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }else{
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
      <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/Customerprofile?tab=profile'>
                <Sidebar.Item as='div' active={tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark'>
                    Profile
                </Sidebar.Item></Link>
                {!currentCustomer.isAdmin && (
                  <Link to='/Employee_Registration'>
                  <Sidebar.Item as='div' active={locationLink.pathname === '/Employee_Registration'} icon={HiUser} label={'Employee'} labelColor='dark'>
                      Register
                  </Sidebar.Item></Link>
                )}
                {currentCustomer.isAdmin && (
                  <Link to='/AdminLogin?tab=admin'>
                    <Sidebar.Item as='div' active={locationLink.pathname === '/AdminLogin?tab=admin'} icon={HiUser} label={'Admin'} labelColor='red'>
                        Dashboard
                    </Sidebar.Item>
                  </Link>
                )}<br></br>
                <Sidebar.Item onClick={handleSignOut} icon={HiArrowSmRight} className='cursor-pointer'>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
  )
}
