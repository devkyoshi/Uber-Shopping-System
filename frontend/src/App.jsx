import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import About from "./pages/About";
import OrderForm from "./pages/OrderForm";
import { Footer } from "./components/Footer";
import Complaint from "./pages/Complaint/Complaint";
import PaymentUI from "./pages/payment/PaymentUI";
import ItemUI from "./pages/item/ItemUI";
import ViewOrder from "./pages/ViewOrder";
import Refund from "./pages/Refund/RefundForm";
import PaymentAdminUI from "./pages/payment/PaymentAdminUI";
import Register from "./pages/customer/registerCRUD/CustomerRegister";
import Login from "./pages/customer/registerCRUD/CustomerLogin";
import Profile from "./pages/customer/registerCRUD/CustomerProfile";
import Header from "./components/CustomerHeader";
import PrivateRoute from "./components/customer/privateroute/CustomerProfilePrivateRoute";
import AdminPrivateRoute from "./components/customer/privateroute/CustomerAdminPrivateRoute";
import CustomerAdmin from "./pages/customer/adminpage/CustomerAdmin";
import CustomerFeedback from "./pages/customer/feedbackCRUD/CustomerFeedback";
import CustomerRating from "./pages/customer/ratingemployeespage/CustomerRateEmployee";
import DriverUI from "./pages/driver/DriverUI";
import UpdateOrder from "./pages/UpdateOrder";
import ComplaintForm from "./pages/Complaint/ComplaintForm";
import EditComplaint from "./pages/Complaint/editComplaint";
import ComplaintAdmin from "./pages/Complaint/ComplaintAdmin";
import PromotionUI from "./pages/promotion/promotionUI";
import TaskdriverUI from "./pages/taskdriver/TaskdriverUI";
import Test from "./pages/Profile";
import Emp_PrivateRoute from "./components/Emp_PrivateRoute";
import Employee_AnnouncementEdit from "./pages/Employee_AnnouncementEdit";
import AnnouncementHomeEach from "./pages/AnnouncementHomeEach";
import Emp_Header from "./components/Emp_Header";
import Employee_Registration from "./pages/Employee_Registration";
import Employee_Signin from "./pages/Employee_Signin";
import Employee_News from "./pages/Employee_News";
import Dashboard from "./pages/Dashboard";
import Employee_Announcements from "./pages/Employee_Announcements";
import Projects from "./pages/Projects";
import Emp_Home from "./pages/Emp_Home";
import OnlyHR_PrivateRoute from "./components/OnlyHR_PrivateRoute";
import PerformanceReport from "./pages/Performance";
import Replacement from "./pages/Complaint/ComplaintReplacement";
import { NavigationBar } from "./components/NavigationBar";
import DetailedOrder from "./pages/DetailedOrder";
import Emp_search from "./pages/Emp_search";
import Home from "./pages/Home";
import AllOrdersPg from "./pages/AllOrdersPg";
import ReportIssueForm from "./pages/taskdriver/DriverReportIssueForm";

function NavigationBarFun() {
  const location = useLocation();
  const specificNavbarRoute = [
    "/Emp_Home",
    "/Dashboard",
    "/Employee_Announcements",
    "/Employee_AnnouncementEdit",
    "/Employee_News",
    "/Emp_search",
    "/announcement/:announcementSlug",
  ];
  const isSpecificNavbarActive = specificNavbarRoute.includes(
    location.pathname
  );
  //const isSpecificNavbarActive = location.pathname === specificNavbarRoute;

  return isSpecificNavbarActive ? <Emp_Header /> : <NavigationBar />;
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Render the NavigationBar component */}
      <NavigationBarFun />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/orderForm" element={<OrderForm />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/customer_register" element={<Register />} />
        <Route path="/payment/:orderId" element={<PaymentUI />} />
        <Route path="/items/:supermarketId" element={<ItemUI />} />
        <Route path="/refund/:complaintId/:orderId" element={<Refund />} />
        <Route path="/orders/:orderId" element={<ViewOrder />} />
        <Route path="/refund/:complaintId" element={<Refund />} />
        <Route path="/Customerlogin" element={<Login />} />
        <Route path="/Customerregister" element={<Register />} />
        <Route element={<AdminPrivateRoute />}>
          <Route path="/Adminlogin" element={<CustomerAdmin />} />
        </Route>
        <Route path="/updateOrder" element={<UpdateOrder />} />
        <Route path="/driver" element={<DriverUI />} />
        <Route path="/complaintForm" element={<ComplaintForm />} />
        <Route path="/editComplaint/:complaintId" element={<EditComplaint />} />
        <Route path="/complaint-admin" element={<ComplaintAdmin />} />
        <Route path="/promotions/:supermarketId" element={<PromotionUI />} />
        <Route path="/taskdriver" element={<TaskdriverUI />} />
        <Route element={<PrivateRoute />}>
          <Route path="/Customerprofile" element={<Profile />} />
          <Route path="/feedbackportal" element={<CustomerFeedback />} />
          <Route path="/employeerate" element={<CustomerRating />} />
        </Route>
        <Route path="/test" element={<Test />} />
        <Route path="/Employee_Signin" element={<Employee_Signin />} />
        <Route
          path="/Employee_Registration"
          element={<Employee_Registration />}
        />
        <Route element={<Emp_PrivateRoute />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Emp_search" element={<Emp_search />} />
        </Route>
        <Route element={<OnlyHR_PrivateRoute />}>
          <Route
            path="/Employee_Announcements"
            element={<Employee_Announcements />}
          />
          <Route
            path="/Employee_AnnouncementEdit/:announcementId"
            element={<Employee_AnnouncementEdit />}
          />
        </Route>
        <Route path="/Employee_News" element={<Employee_News />} />
        <Route path="/Projects" element={<Projects />} />
        <Route
          path="/announcement/:announcementSlug"
          element={<AnnouncementHomeEach />}
        />
        <Route>
          <Route path="/Emp_Home" element={<Emp_Home />} />
        </Route>
        <Route path="/performance" element={<PerformanceReport />} />
        <Route path="/replacement" element={<Replacement />} />
        <Route path="/Emp_Home" element={<Emp_Home />} />
        <Route path="/new" element={<PerformanceReport />} />
        <Route path="/details" element={<DetailedOrder />} />
        <Route path="allOrders/:customerId" element={<AllOrdersPg />} />
        <Route
          path="/ReportIssueForm/:item_name/:sm_name"
          element={<ReportIssueForm />}
        />
        {/**newly added - table which displays all the orders */}
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
