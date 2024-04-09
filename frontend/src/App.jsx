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
        <Route
          path="/Employee_Registration"
          element={<Employee_Registration />}
        />
        <Route path="/payment" element={<PaymentUI />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
