import { Navbar, TextInput } from 'flowbite-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'flowbite-react';
import {AiOutlineSearch} from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';

export default function Header() {
    const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
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
            <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
                <FaMoon />
            </Button>
            <Link to='/login'>
                <Button gradientDuoTone='pinkToOrange' outline>
                    Log in
                </Button>
            </Link>
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
