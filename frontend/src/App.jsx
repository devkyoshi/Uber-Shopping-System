import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import About from "./pages/About";
import { SideBar } from "./components/SideBar";
import { Footer } from "./components/Footer";
import { Promotions } from "./components/Promotions";
import OrderForm from "./pages/OrderForm";

export default function App() {
  return (
    <BrowserRouter >
    {/* <Header/> */}
    {/* <Navigation/> */}
    {/* <Promotions/>
    <SideBar/> */}
    <Routes>
      <Route path="/home" element = {<Home/>}/>
      <Route path="/signin" element = {<SignIn/>}/>
      <Route path="/signup" element = {<SignUp/>}/>
      <Route path="/about" element = {<About/>}/>
      <Route path="/profile" element = {<Profile/>}/>
      <Route path="/orderForm" element = {<OrderForm/>}/>
    </Routes>
    {/* <Footer/> */}
  </BrowserRouter>
  );
}
