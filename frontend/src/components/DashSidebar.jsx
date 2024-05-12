import { Sidebar } from "flowbite-react";
import {
  HiUser,
  HiCurrencyDollar,
  HiChartPie,
  HiChatAlt,
  HiKey,
  
  HiArrowSmRight,
  HiBadgeCheck,
  HiOutlineUserGroup,
  HiDocumentText,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userslice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { currentUser, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

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

  const isAdmin = useSelector((state) => state.user.isAdmin);

  return (
    <Sidebar className="w-auto md:w-56 mt-5">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {currentUser.isAdmin && (
            <Link to="/Dashboard?tab=HR_Dashboard">
              <Sidebar.Item
                active={tab === "HR_Dashboard"}
                icon={HiChartPie}
                label={" "}
                labelColor={tab === "HR_Dashboard" ? "dark" : "none"}
                as="div"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
           {currentUser.isAdmin && (
            <Link to="/Dashboard?tab=ManageEmp_salary">
              <Sidebar.Item
                active={tab === "ManageEmp_salary"}
                icon={HiCurrencyDollar}
                label={""}
                labelColor={tab === "ManageEmp_salary" ? "dark" : "none"}
                as="div"
              >
                Finance Details
              </Sidebar.Item>
            </Link>
          )}
          

          <Link to="/Dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={" "}
              labelColor={tab === "profile" ? "dark" : "none"}
              as="div"
            >
              My Profile
            </Sidebar.Item>
          </Link>

          {!currentUser.isAdmin && (
            <Link to="/Dashboard?tab=Employee_level">
              <Sidebar.Item
                active={tab === "Employee_level"}
                icon={HiBadgeCheck}
                label={" "}
                labelColor={tab === "Employee_level" ? "dark" : "none"}
                as="div"
              >
                My Level
              </Sidebar.Item>
            </Link>
          )}

          {!currentUser.isAdmin && (
            <Link to="/Dashboard?tab=Employee_DeliveriesDone">
              <Sidebar.Item
                active={tab === "Employee_DeliveriesDone"}
                icon={HiChatAlt}
                label={" "}
                labelColor={tab === "Employee_DeliveriesDone" ? "dark" : "none"}
                as="div"
              >
                Deliveries Done
              </Sidebar.Item>
            </Link>
          )}

          {!currentUser.isAdmin && (
            <Link to="/Dashboard?tab=Contact_Admin">
              <Sidebar.Item
                active={tab === "Contact_Admin"}
                icon={HiChatAlt}
                label={" "}
                labelColor={tab === "Contact_Admin" ? "dark" : "none"}
                as="div"
              >
                Contact Admin
              </Sidebar.Item>
            </Link>
          )}

          {currentUser.isAdmin && (
            <Link to="/Dashboard?tab=AdminPage">
              <Sidebar.Item
                icon={HiKey}
                label={" "}
                active={tab === "AdminPage"}
                labelColor={tab === "AdminPage" ? "dark" : "none"}
                as="div"
              >
                HR Manger Page
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/Dashboard?tab=DashUsers">
              <Sidebar.Item
                icon={HiOutlineUserGroup}
                label={" "}
                active={tab === "DashUsers"}
                labelColor={tab === "DashUsers" ? "dark" : "none"}
                as="div"
              >
                Employee Info
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/Dashboard?tab=Announcements">
              <Sidebar.Item
                icon={HiDocumentText}
                label={" "}
                active={tab === "Announcements"}
                labelColor={tab === "Announcements" ? "dark" : "none"}
                as="div"
              >
                Annoucemnts
              </Sidebar.Item>
            </Link>
          )}
          <Sidebar.Item
            onClick={handleSignout}
            icon={HiArrowSmRight}
            className="cursor-pointer"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
