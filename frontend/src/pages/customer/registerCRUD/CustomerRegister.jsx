import { Alert, Label, Select, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import bgImg from "../../../img/webbg.jpg";

export default function Register() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMesseage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { id, value } = e.target;
  let newValue = value.trim();
  

  if (id === 'cus_age') {
    const age = parseInt(newValue);
    if (isNaN(age) || age < 18 || age > 60) {
      setErrorMesseage("Please enter a valid age between 18 and 60.");
      return;
    } else {
      setErrorMesseage(null);
    }
  }
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  function handleKeyPress2(event) {
    const keyPressed = event.key;
    const isNumber = /^[0-9]$/.test(keyPressed);
    const isBackspace = keyPressed === "Backspace";
    const isDelete = keyPressed === "Delete";
  
    // Check if the input is a valid number or a backspace or delete key
    if (!isNumber && !isBackspace && !isDelete) {
      event.preventDefault();
    }
  
    // Check the length of the input value if it's not a backspace or delete key
    if (!isBackspace && !isDelete && event.target.value.length >= 10) {
      event.preventDefault();
    }
  }
  function handleKeyPress(event) {
    const keyPressed = event.key;
    const isLetter = /^[a-zA-Z\s]$/.test(keyPressed);
    const isBackspace = keyPressed === 'Backspace';
    const isDelete = keyPressed === 'Delete';

    if (!isLetter && !isBackspace && !isDelete) {
        event.preventDefault();
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.cus_email ||
      !formData.cus_username ||
      !formData.cus_age ||
      !formData.cus_name ||
      !formData.cus_gender ||
      !formData.cus_cnumber ||
      !formData.cus_address ||
      !formData.cus_password
    ) {
      return setErrorMesseage("Please fill out all fields.");
    }
    if(formData.cus_age < 18){
      return setErrorMesseage("You should be atleast 18 years old to register");
    }
    try {
      setLoading(true);
      setErrorMesseage(null);
      const res = await fetch("/customer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setErrorMesseage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/Customerlogin");
      }
    } catch (error) {
      setErrorMesseage(error.message);
      setLoading(false);
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
      <style>
        {`
          #Cus_CNumber::-webkit-inner-spin-button,
          #Cus_CNumber::-webkit-outer-spin-button {-webkit-appearance: none;margin: 0;}
        `}
      </style>
      <div className="p-3 max-w-3xl ml-10 md:flex-row md:items-center gap-5">
        <div className="flex-1 mt-16 mb-20">
          <Link
            to="/Customerlogin"
            className="font-bold dark:text-white text-4xl"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 rounded-lg text-white">
              Uber
            </span>
            Shopping
          </Link>
          <p className="text-sm mt-5">
            Please register to see all of our latest products for the best
            prices
          </p>
        </div>
        <div className="flex-1 mt-20 mb-20">
          {/*right*/}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-row gap-4"><div className="flex flex-1 flex-col gap-4"><div>
              <Label value="Your full name" />
              <TextInput
                type="text"
                onKeyDown={handleKeyPress}
                placeholder="name"
                id="cus_name"
                onChange={handleChange}
              />
            </div>
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
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="cus_username"
                onChange={handleChange}
              />
            </div></div><div className="flex flex-2 flex-col gap-4">
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="*********"
                id="cus_password"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex flex-col flex-1">
                <Label value="Contact number" />
                <TextInput
                  type="number"
                  placeholder="+94xxxxxxxxx"
                  id="cus_cnumber"
                  onKeyDown={handleKeyPress2}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col flex-1">
                <Label value="Your Gender" />
                <Select id="cus_gender" onChange={handleChange}>
                  <option value="" defaultValue>
                    Choose...
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
              </div>
              <div className="flex flex-col flex-1">
                <Label value="Your Age" />
                <TextInput
                  type="number"
                  placeholder="Age"
                  id="cus_age"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <Label value="Your address" />
              <textarea
                className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-500 resize-none"
                id="cus_address"
                onChange={handleChange}
              ></textarea>
            </div></div></div>
            {/* <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>{
                loading ? (
                  <><Spinner size='sm'/><span className='pl-3'>Loading...</span></>
                ) : 'Register'
              }</Button> */}
            <button
              className="mt-2"
              type="submit"
              disabled={loading}
              style={{
                width: "46.5rem",
                padding: "0.6rem 1rem",
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
              {loading ? "Loading..." : "Register"}
            </button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span className="text-black">Already have an account?</span>
            <Link to="/Customerlogin" className="text-blue-900">
              Login
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
