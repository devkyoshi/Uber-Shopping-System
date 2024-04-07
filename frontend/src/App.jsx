import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import OrderForm from "./pages/OrderForm";
import HomeUnregistered from "./pages/HomeUnregistered";
import { NavigationBar } from "./components/NavigationBar";
import { Footer } from "./components/Footer";
import Payment from "./pages/Payment";
import Employee_Registration from "./pages/Employee_Registration";
import Complaint from "./pages/Complaint";
import Header from "./components/Header";
import Register from "./pages/Register";
import PaymentView from "./pages/payment/PaymentView";
import UpdatePaymentPage from "./pages/payment/UpdatePaymentPage";
export default function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/unregiHome" element={<HomeUnregistered />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/orderForm" element={<OrderForm />} />

        <Route path="/complaint" element={<Complaint />} />
        <Route path="/customer_register" element={<Register />} />
        <Route
          path="/Employee_Registration"
          element={<Employee_Registration />}
        />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment_view" element={<PaymentView />} />
        <Route path="/payment_update" element={<UpdatePaymentPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
