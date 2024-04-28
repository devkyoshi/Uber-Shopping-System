import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/customer/customerRegisterSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Dropdown, TextInput } from "flowbite-react";
import React, { useState } from "react";

import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Popover,
  PopoverHandler,
  PopoverContent,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import {
  GlobeAmericasIcon,
  UserGroupIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";

const navListMenuItems = [
  {
    title: "Products",
    description: "Find the perfect items for your needs.",
    icon: SquaresPlusIcon,
    path: "/products",
  },
  {
    title: "About Us",
    description: "Meet and learn about our dedication",
    icon: UserGroupIcon,
    path: "/about",
  },
  {
    title: "Services",
    description: "Learn how we can help you achieve your goals.",
    icon: SunIcon,
  },
  {
    title: "Support",
    description: "Reach out to us for assistance or inquiries",
    icon: GlobeAmericasIcon,
  },
  {
    title: "My Cart",
    description: "Process Your Order",
    icon: ShoppingCartIcon,
  },
  {
    title: "Special Offers",
    description: "Explore limited-time deals and bundles",
    icon: TagIcon,
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description, path }, key) => (
      <Link to={path} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg ">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </Link>
    )
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900 nav-pages"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Resources
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform  lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href="/Emp_home"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <Link to="/">
          <ListItem className="flex items-center gap-2 py-2 pr-4 nav-pages">
            Home
          </ListItem>
        </Link>
      </Typography>
      <NavListMenu />
      <Typography
        as="a"
        href="/Dashboard?tab=Contact_Admin"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4 nav-pages">
          Contact Us
        </ListItem>
      </Typography>
    </List>
  );
}

export default function EmpHeader() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const [openNav, setOpenNav] = React.useState(false);
  const dispatch = useDispatch();
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);
  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
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

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <div className="pt-5">
      <Navbar className="mx-auto max-w-screen-xl px-4 py-2 ">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2"
          >
            <Link to="/Emp_Home">
              <div>
                <span className="logo-span1">Uber </span>
                <span className="logo-span2">Shopping</span>
              </div>
            </Link>
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>

          <div className="hidden gap-2 lg:flex">
            {currentUser ? (
              <div>
                <Popover placement="bottom-end">
                  <PopoverHandler>
                    <Avatar
                      alt="user"
                      src="https://www.366icons.com/media/01/profile-avatar-account-icon-16699.png"
                    />
                  </PopoverHandler>
                  <PopoverContent className="w-72">
                    <div className="mb-4 flex items-center gap-4 border-b border-blue-gray-50 pb-4">
                      <Avatar
                        src="https://www.366icons.com/media/01/profile-avatar-account-icon-16699.png"
                        alt="tania andrew"
                      />
                      <div>
                        <Typography variant="h6" color="blue-gray">
                          {currentUser.username}
                        </Typography>
                        <Typography
                          variant="small"
                          color="gray"
                          className="font-medium text-blue-gray-500"
                        >
                          {currentUser.isAdmin}
                        </Typography>
                      </div>
                    </div>
                    <List className="p-0">
                      <ListItem>
                        <ListItemPrefix>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                            />
                          </svg>
                        </ListItemPrefix>
                        +{currentUser.email}
                      </ListItem>

                      <ListItem className="border-b  border-blue-gray-50 pb-4">
                        <ListItemPrefix>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                            />
                          </svg>
                        </ListItemPrefix>
                        {currentUser.email}
                      </ListItem>

                      <Link to={"/Dashboard?tab=profile"}>
                        <ListItem>
                          <ListItemPrefix>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          </ListItemPrefix>
                          Profile
                        </ListItem>
                      </Link>
                      <Link to={"/Employee_Signin"}>
                        <ListItem onClick={handleSignout}>
                          <ListItemPrefix>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                              />
                            </svg>
                          </ListItemPrefix>
                          Sign Out
                        </ListItem>
                      </Link>
                    </List>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <Link to="/Employee_Signin">
                <Button variant="gradient" size="sm">
                  Log In
                </Button>
              </Link>
            )}
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
            <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
              Log In
            </Button>
            <Button variant="gradient" size="sm" fullWidth>
              Sign In
            </Button>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}

// import { Avatar,Button, Navbar, Dropdown,NavbarToggle, TextInput } from 'flowbite-react';
// import { Link, useLocation } from 'react-router-dom';
// import { AiOutlineSearch } from 'react-icons/ai';
// //import { FaMoon } from 'react-icons/fa';
// import { useEffect, useState } from 'react';
// import { signoutSuccess } from '../redux/user/userslice';
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import React from 'react'

// export default function EmpHeader() {
// const path = useLocation().pathname;
// const { currentUser } = useSelector((state) => state.user);
// const dispatch = useDispatch();
// const handleSignout = async () => {
//   try {
//     const res = await fetch('/api/user/signout', {
//       method: 'POST',
//     });
//     const data = await res.json();
//     if (!res.ok) {
//       console.log(data.message);
//     } else {
//       dispatch(signoutSuccess());
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };
//   return (

//     <Navbar className='border-b-2'>
//         <Link to='/'
//         className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white' >
//             <span className='px-2 py-1 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 rounded-lg text-white'>Uber</span>
//             Delivery</Link>

//                                                                      {/* Search txt field */}
//         <form >
//         <TextInput
//           type='text'
//           placeholder='Search...'
//           rightIcon={AiOutlineSearch}
//           className='hidden lg:inline'/>
//         </form>
//                                                                     {/* Search icon */}
//         <Button className='w-12 h-10 lg:hidden' color='gray'pill>
//         <AiOutlineSearch/>
//         </Button>

//     {/*  <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
//           <FaMoon />
//         </Button>
//         darkmode/light mode */}
//       <div className='flex gap-2 md:order-2'>

//                                                                     {/*Sigin in button*/}
//         {currentUser ? (
//           <Dropdown
//             arrowIcon={false}
//             inline
//             label={
//               <Avatar alt='user' img={'https://www.366icons.com/media/01/profile-avatar-account-icon-16699.png'} rounded />
//             }
//           >

//             <Dropdown.Header>
//               <span className='block text-sm'>{currentUser.username}</span>
//               <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
//             </Dropdown.Header>
//             <Link to={'/dashboard?tab=profile'}>
//               <Dropdown.Item>Profile</Dropdown.Item>
//             </Link>
//             <Dropdown.Divider />
//             <Dropdown.Item onClick={handleSignout}  >
//             <Link to={'/Employee_Signin'} >Sign out</Link></Dropdown.Item>
//           </Dropdown>
//         ) : (
//           <Link to='/Employee_Signin'>
//             <Button gradientDuoTone='purpleToBlue' outline>
//               Sign In
//             </Button>
//           </Link>
//         )}
//         <NavbarToggle/>
// </div>

//                                                                     {/* Nav bar cutton for redirecting */}
// <Navbar.Collapse>
//             <Navbar.Link  active={path === '/'} as={'div'}>
//                 <Link to='/'>
//                     Home
//                 </Link>
//             </Navbar.Link>
//             {/* <Navbar.Link>
//                 <Link to='/Employee_Registration'>
//                 Register
//                 </Link>
//             </Navbar.Link> <Navbar.Link>
//                 <Link to='/Dashboard'>
//                 Dashboard
//                 </Link>
//             </Navbar.Link>*/}

//             <Navbar.Link active={path === '/Projects'} as={'div'}>
//                 <Link to='/Projects'>
//                 Projects
//                 </Link>
//             </Navbar.Link>
//             <Navbar.Link active={path === '/Employee_News'} as={'div'}>
//                 <Link to='/Employee_News'>
//                 News
//                 </Link>
//             </Navbar.Link>
//         </Navbar.Collapse>

//         </Navbar>
//   )
// }
