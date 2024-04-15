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
                {currentCustomer.adminType === 'null' && (
                  <Link to='/Employee_Signin'>
                  <Sidebar.Item as='div' active={locationLink.pathname === '/Employee_Signin'} icon={HiUser} label={'Employee'} labelColor='dark'>
                      Login
                  </Sidebar.Item></Link>
                )}
                {currentCustomer.adminType === 'customer' && (
                  <Link to='/AdminLogin?tab=customeradmin'>
                    <Sidebar.Item as='div' active={locationLink.pathname === '/AdminLogin?tab=customeradmin'} icon={HiUser} label={'Customer'} labelColor='red'>
                       Dashboard
                    </Sidebar.Item>
                  </Link>
                )}
                {currentCustomer.adminType === 'order' && (
                  <Link to='/AdminLogin?tab=orderadmin'>
                    <Sidebar.Item as='div' active={locationLink.pathname === '/AdminLogin?tab=orderadmin'} icon={HiUser} label={'Order'} labelColor='red'>
                       Dashboard
                    </Sidebar.Item>
                  </Link>
                )}
                {currentCustomer.adminType === 'payment' && (
                  <Link to='/AdminLogin?tab=paymentadmin'>
                    <Sidebar.Item as='div' active={locationLink.pathname === '/AdminLogin?tab=paymentadmin'} icon={HiUser} label={'Payment'} labelColor='red'>
                       Dashboard
                    </Sidebar.Item>
                  </Link>
                )}
                {currentCustomer.adminType === 'route' && (
                  <Link to='/AdminLogin?tab=routeadmin'>
                    <Sidebar.Item as='div' active={locationLink.pathname === '/AdminLogin?tab=routeadmin'} icon={HiUser} label={'Route'} labelColor='red'>
                       Dashboard
                    </Sidebar.Item>
                  </Link>
                )}
                {currentCustomer.adminType === 'supermarket' && (
                  <Link to='/AdminLogin?tab=supermarketadmin'>
                    <Sidebar.Item as='div' active={locationLink.pathname === '/AdminLogin?tab=supermarketadmin'} icon={HiUser} label={'Supermarket'} labelColor='red'>
                       Dashboard
                    </Sidebar.Item>
                  </Link>
                )}
                {currentCustomer.adminType === 'quality' && (
                  <Link to='/AdminLogin?tab=qualityadmin'>
                    <Sidebar.Item as='div' active={locationLink.pathname === '/AdminLogin?tab=qualityadmin'} icon={HiUser} label={'Quality'} labelColor='red'>
                       Dashboard
                    </Sidebar.Item>
                  </Link>
                )}
                {currentCustomer.adminType === 'delivery' && (
                  <Link to='/AdminLogin?tab=deliveryadmin'>
                    <Sidebar.Item as='div' active={locationLink.pathname === '/AdminLogin?tab=deliveryadmin'} icon={HiUser} label={'Delivery'} labelColor='red'>
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
