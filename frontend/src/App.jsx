import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import About from "./pages/About";
import OrderForm from "./pages/OrderForm";
import HomeUnregistered from "./pages/HomeUnregistered";
import { NavigationBar } from "./components/NavigationBar";
import { Footer } from "./components/Footer";
import Payment from "./pages/Payment";
import Employee_Registration from "./pages/Employee_Registration";
import Header from "./components/Header";
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      {/* <NavigationBar /> */}
      <Routes>
        <Route path="/unregiHome" element={<HomeUnregistered />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orderForm" element={<OrderForm />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/Employee_Registration" element={<Employee_Registration/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
