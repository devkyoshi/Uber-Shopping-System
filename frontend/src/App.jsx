import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
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
import Refund from "./pages/Refund/RefundForm"
export default function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        {/* add your code below the last route! Dont add on Top*/}
        <Route path="/unregiHome" element={<HomeUnregistered />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/orderForm" element={<OrderForm />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/customer_register" element={<Register />} />
        <Route path="/Employee_Registration" element={<Employee_Registration />}/>
        <Route path="/payment" element={<PaymentUI />} />
        <Route path="/task" element={<TaskUI />} />
        <Route path="/branch" element={<BranchUI />} />
        <Route path="/item" element={<ItemUI />} />
        <Route path="/refund/:complaintId" element={<Refund/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
