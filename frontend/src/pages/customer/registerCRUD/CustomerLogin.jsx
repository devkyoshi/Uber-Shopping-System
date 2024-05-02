import { Alert, Label, Spinner, TextInput } from "flowbite-react";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import bgImg from "../../../img/webbg.jpg";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../../redux/customer/customerRegisterSlice.js";

export default function Login() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(
    (state) => state.customer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.cus_email || !formData.cus_password) {
      return dispatch(loginFailure("Please fill all the fields"));
    }
    try {
      dispatch(loginStart());
      const res = await fetch("/customer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(loginFailure(data.message));
      }
      if (res.ok) {
        dispatch(loginSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundImage: `url(${bgImg})`,
        width: "auto",
        height: "auto",
      }}
    >
      <div className="p-3 ml-20 md:flex-row md:items-center gap-5">
        <div className="flex-1 mt-36">
          <Link
            to="/Customerregister"
            className="font-bold dark:text-white text-4xl"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 rounded-lg text-white">
              Uber
            </span>
            Shopping
          </Link>
          <p className="text-sm mt-5">
            Please login to see all of our latest products for the best prices
          </p>
        </div>
        <div className="flex-1 mt-10 max-w-2xl">
          {/*right*/}
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@gmail.com"
                id="cus_email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="*********"
                id="cus_password"
                onChange={handleChange}
              />
            </div>
            {/* <Button className='mt-2' gradientDuoTone='purpleToPink' type='submit' disabled={loading}>{
                loading ? (
                  <><Spinner size='sm'/><span className='pl-3'>Loading...</span></>
                ) : 'Login'
              }</Button> */}
            <button
              className="mt-2"
              type="submit"
              disabled={loading}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.9rem",
                fontWeight: "bold",
                borderRadius: "0.375rem",
                color: "white",
                background: "linear-gradient(90deg, #7B68EE, #EC4899)",
                opacity: loading ? "0.7" : "1",
                pointerEvents: loading ? "none" : "auto",
                cursor: loading ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => {
                e.target.style.background =
                  "linear-gradient(90deg, #EC4899, #7B68EE)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background =
                  "linear-gradient(90deg, #7B68EE, #EC4899)";
              }}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/Customerregister" className="text-blue-500">
              Register
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
