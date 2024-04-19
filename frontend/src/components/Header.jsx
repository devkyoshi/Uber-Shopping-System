import { Avatar,Button, Navbar, Dropdown,NavbarToggle, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
//import { FaMoon } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { signoutSuccess } from '../redux/user/userslice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import React from 'react'

export default function Header() {
    const path = useLocation().pathname;
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const handleSignout = async () => {
      try {
        const res = await fetch('/api/user/signout', {
          method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signoutSuccess());
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  return (
    
    <Navbar className='border-b-2'>
        <Link to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white' >
            <span className='px-2 py-1 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 rounded-lg text-white'>Uber</span>
            Delivery</Link>
       
                                                                     {/* Search txt field */}
        <form >
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'/>
        </form>
                                                                    {/* Search icon */}
        <Button className='w-12 h-10 lg:hidden' color='gray'pill>
        <AiOutlineSearch/>
        </Button>
      
    {/*  <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
          <FaMoon /> 
        </Button>
        darkmode/light mode */}
      <div className='flex gap-2 md:order-2'>
       

                                                                    {/*Sigin in button*/}
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={'https://www.366icons.com/media/01/profile-avatar-account-icon-16699.png'} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}  >
            <Link to={'/Employee_Signin'} >Sign out</Link></Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/Employee_Signin'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
        <NavbarToggle/>
</div>

                                                                    {/* Nav bar cutton for redirecting */}
<Navbar.Collapse>
            <Navbar.Link  active={path === '/'} as={'div'}>
                <Link to='/'>
                    Home
                </Link>
            </Navbar.Link>
            {/* <Navbar.Link>
                <Link to='/Employee_Registration'>
                Register
                </Link>
            </Navbar.Link> <Navbar.Link>
                <Link to='/Dashboard'>
                Dashboard
                </Link>
            </Navbar.Link>*/}
           
            <Navbar.Link active={path === '/Projects'} as={'div'}>
                <Link to='/Projects'>
                Projects
                </Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/Employee_News'} as={'div'}>
                <Link to='/Employee_News'>
                News
                </Link>
            </Navbar.Link>
        </Navbar.Collapse>



        </Navbar>
  )
}

