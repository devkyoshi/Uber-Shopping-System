import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//import OAuth from '../components/OAuth';

export default function Employee_Registration() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.email ||
      !formData.password | !formData.Emp_Name ||
      !formData.Emp_Age ||
      !formData.Emp_Gender ||
      !formData.Emp_Address ||
      !formData.Emp_CNumber
    ) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("http://localhost:8070/Employee/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/Employee_Signin");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div
      className="min-h-screen "
      style={{
        backgroundImage: "url('https://i.gifer.com/EIG1.gif')",
        backgroundSize: "cover",
        backgroundPosition: "cover",
        width: "auto",
        height: "auto",
      }}
    >
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-2 ">
        <div className="flex-1 mt-5 ">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 rounded-lg text-white ">
              Uber
            </span>
            Shopping
          </Link>
          <p className="text-sm mt-7 mb-3  ">
            "Delivering excellence starts with empowering our team."
          </p>
          <form className="flex flex-col gap-2 " onSubmit={handleSubmit}>
            <div>
              <Label value="Name" />
              <TextInput
                type="name"
                placeholder="Eg: kamal"
                id="Emp_Name"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label value="Age" />
              <TextInput
                type="age"
                placeholder="Eg: 30"
                id="Emp_Age"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label value="Gender" />
              <TextInput
                type="gender"
                placeholder="Eg: Male /Female /Other"
                id="Emp_Gender"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label value="Address" />
              <TextInput
                type="address"
                placeholder="Eg: 123 Main St, City, Country"
                id="Emp_Address"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label value="Contact Number" />
              <TextInput
                type="tel"
                placeholder="Eg: 123-456-7890"
                id="Emp_CNumber"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label value="Employee username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label value="Employee email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>

            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
              className="w-40 h-10 mx-auto"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link
              to="/Employee_Signin"
              className="text-black-500"
              style={{ textDecoration: "underline", fontStyle: "italic" }}
            >
              Sign In
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
