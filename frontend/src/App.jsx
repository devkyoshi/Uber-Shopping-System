import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import React from "react";
import About from "./pages/About";
import OrderForm from "./pages/OrderForm";
import HomeUnregistered from "./pages/HomeUnregistered";
import { Footer } from "./components/Footer";

import Complaint from "./pages/Complaint/Complaint";
import PaymentUI from "./pages/payment/PaymentUI";
import BranchUI from "./pages/Branch/BranchUI";
import TaskUI from "./pages/Task/TaskUI";
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

import Test from "./pages/Profile";
import { NavigationBar } from "./components/NavigationBar";
import Emp_PrivateRoute from './components/Emp_PrivateRoute';
import Employee_AnnouncementEdit from './pages/Employee_AnnouncementEdit';
import AnnouncementHomeEach from './pages/AnnouncementHomeEach';
import Home from "./pages/Home"
import Employee_Registration from "./pages/Employee_Registration"
import Employee_Signin from "./pages/Employee_Signin"
import Employee_News from "./pages/Employee_News"
import Dashboard from "./pages/Dashboard"
import Employee_Announcements from "./pages/Employee_Announcements"
import Projects from "./pages/Projects"

import OnlyHR_PrivateRoute from './components/OnlyHR_PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        {/* add your code below the last route! Dont add on Top*/}
        <Route path="/" element={<HomeUnregistered />} />
        <Route path="/about" element={<About />} />
        <Route path="/orderForm" element={<OrderForm />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/customer_register" element={<Register />} />
       
        <Route path="/payment" element={<PaymentUI />} />
        <Route path="/task" element={<TaskUI />} />
        <Route path="/branch" element={<BranchUI />} />
        <Route path="/item" element={<ItemUI />} />
        <Route path="/refund/:complaintId/:orderId" element={<Refund />} />
        
        <Route path="/myOrder" element={<ViewOrder />} />
        <Route path="/refund/:complaintId" element={<Refund />} />
        <Route path="/payment-admin" element={<PaymentAdminUI />} />
        <Route path="/Customerlogin" element={<Login />} />
        <Route path="/Customerregister" element={<Register />} />
        <Route element={<AdminPrivateRoute />}>
          {/*adminpages*/}
          <Route path="/Adminlogin" element={<CustomerAdmin />} />
        </Route>
        <Route path="/updateOrder" element={<UpdateOrder />} />
        {/* Methanin pahala add krnnaaaa nattan conflict wenawaaa udin add krnna epoo */}

        <Route path="/driver" element={<DriverUI />} />
        <Route path="/complaintForm" element={<ComplaintForm />} />
        <Route
          path="/editComplaint/:complaintId"
          element={<EditComplaint />}
        ></Route>
        <Route path="/complaint-admin" element={<ComplaintAdmin />} />
        <Route path="/promotion" element={<PromotionUI />} />

        
        <Route element={<PrivateRoute />}>
          <Route path="/Customerprofile" element={<Profile />} />
          <Route path="/feedbackportal" element={<CustomerFeedback />} />
          <Route path="/employeerate" element={<CustomerRating />} />
        </Route>
        <Route path="/test" element={<Test />} />
        <Route path="/Employee_Signin" element={<Employee_Signin/>}/>
      <Route path="/Employee_Registration" element={<Employee_Registration/>}/>
      <Route element={<Emp_PrivateRoute />}>
         <Route path="/Dashboard" element={<Dashboard/>}/>
         
      </Route>
      <Route element={<OnlyHR_PrivateRoute />}>
          <Route path='/Employee_Announcements' element={<Employee_Announcements />} />
          <Route path='/Employee_AnnouncementEdit/:announcementId' element={<Employee_AnnouncementEdit />} />
        </Route>
      <Route path="/Employee_News" element={<Employee_News/>}/>
      <Route path="/Projects" element={<Projects/>}/>
      <Route path="/announcement/:announcementSlug" element={<AnnouncementHomeEach/>}/>

      
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
