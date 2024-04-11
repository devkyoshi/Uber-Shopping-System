import { Avatar, Dropdown, Navbar, TextInput } from 'flowbite-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/customer/customerRegisterSlice';
import {useDispatch } from 'react-redux';

export default function Header() {
    const path = useLocation().pathname;
    const { currentCustomer } = useSelector((state) => state.customer);
    const dispatch = useDispatch();

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
    <Navbar className='border-b-2'>
        <Link to="/Customerregister" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 rounded-lg text-white'>Food</span>Delivery
        </Link>
        <form>
            <TextInput 
                type='text'
                placeholder='Search..'
                rightIcon={AiOutlineSearch}
                className='hidden lg:inline'
            />
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <AiOutlineSearch />
        </Button>
        <div className='flex gap-2 md:order-2'>
            {currentCustomer ? (
                <Dropdown arrowIcon={false} inline 
                label={<Avatar
                    alt= 'user'
                    img = ''
                    rounded
                />}>
                    <Dropdown.Header>
                        <span className='block text-sm'>Username: {currentCustomer.cus_username}</span>
                        <span className='block text-sm font-medium truncate'>E-mail: {currentCustomer.cus_email}</span>
                    </Dropdown.Header>
                    <Link to={'/Customerprofile?tab=profile'}>
                        <Dropdown.Item>Profile</Dropdown.Item>
                    </Link>
                    <Dropdown.Divider/>
                    <Link to={'/Customerlogin'}>
                    <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item></Link>
                </Dropdown>

            ): (
                <Link to='/Customerlogin'>
                    <Button gradientDuoTone='pinkToOrange' outline>
                        Log in
                    </Button>
                </Link>
            )}
            <Navbar.Toggle></Navbar.Toggle>
        </div>
        <Navbar.Collapse>
                <Navbar.Link active={path === '/home'} as={'div'}>
                    <Link to='/home'>Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/about'} as={'div'}>
                    <Link to='/about'>About</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/project'} as={'div'}>
                    <Link to='/project'>Project</Link>
                </Navbar.Link>
            </Navbar.Collapse>
    </Navbar>
  )
}
