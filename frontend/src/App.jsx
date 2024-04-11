import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import OrderForm from "./pages/OrderForm";
import HomeUnregistered from "./pages/HomeUnregistered";
import { NavigationBar } from "./components/NavigationBar";
import { Footer } from "./components/Footer";
import Employee_Registration from "./pages/Employee_Registration";
import Complaint from "./pages/Complaint";
import Register from "./pages/Register";
import PaymentUI from "./pages/payment/PaymentUI";
import BranchUI from "./pages/Branch/BranchUI";
import TaskUI from "./pages/Task/TaskUI";
import ItemUI from "./pages/item/ItemUI";
import Employee_Signin from "./pages/Employee_Signin";
import Dashboard from "./pages/Dashboard";
import Emp_PrivateRoute from "./components/Emp_PrivateRoute";
import ViewOrder from "./pages/ViewOrder";
import Refund from "./pages/Refund/RefundForm";
import PaymentAdminUI from "./pages/payment/PaymentAdminUI";
import Header from "./components/Header"

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
        <Route
          path="/Employee_Registration"
          element={<Employee_Registration />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/orderForm" element={<OrderForm />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/customer_register" element={<Register />} />
        <Route
          path="/Employee_Registration"
          element={<Employee_Registration />}
        />
        <Route path="/payment" element={<PaymentUI />} />
        <Route path="/task" element={<TaskUI />} />
        <Route path="/branch" element={<BranchUI />} />
        <Route path="/item" element={<ItemUI />} />
        <Route path="/refund/:complaintId" element={<Refund />} />
        <Route path="/Employee_Signin" element={<Employee_Signin />} />
        <Route element={<Emp_PrivateRoute />}>
          <Route path="/Dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/myOrder" element={<ViewOrder />} />
        <Route path="/refund/:complaintId" element={<Refund />} />
        <Route path="/payment-admin" element={<PaymentAdminUI />} />
        {/* Methanin pahala add krnnaaaa nattan conflict wenawaaa udin add krnna epoo */}
      </Routes>
      
      <Footer />
    </BrowserRouter>
  );
}
