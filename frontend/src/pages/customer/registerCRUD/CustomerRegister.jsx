import { Alert, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';

export default function Register() {
  const [formData, setFormData] = useState({});
  const [errorMessage,setErrorMesseage] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.cus_email||
        !formData.cus_username||
        !formData.cus_age||
        !formData.cus_name||
        !formData.cus_gender||
        !formData.cus_cnumber||
        !formData.cus_address||
        !formData.cus_password){
          return setErrorMesseage('Please fill out all fields.')
        }
    try {
      setLoading(true);
      setErrorMesseage(null);
      const res = await fetch('/customer/register', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        setLoading(false);
        return setErrorMesseage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/Customerlogin')
      }
    } catch (error) {
      setErrorMesseage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className='min-h-screen'style={{ 
      backgroundImage: "url('https://cdn.dribbble.com/users/2063527/screenshots/11467383/media/c1ad5d2ebbdebb25282247869816cc9c.gif')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: 'auto',
      height: 'auto',
  }}>
        <style>
          {`
          #Cus_CNumber::-webkit-inner-spin-button,
          #Cus_CNumber::-webkit-outer-spin-button {-webkit-appearance: none;margin: 0;}
        `}
      </style>
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1 mt-20 mb-20'>
            <Link to="/Customerregister" className='font-bold dark:text-white text-4xl'>
              <span className='px-2 py-1 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 rounded-lg text-white'>Food</span>Delivery
            </Link>
            <p className='text-sm mt-5'>
              vvvvv
            </p>
          </div>
          <div className='flex-1 mt-20 mb-20'>{/*right*/}
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <div>
                <Label value='Your full name' />
                <TextInput type='text' placeholder='name' id='cus_name' onChange={handleChange}/>
              </div>
              <div>
                <Label value='Your email' />
                <TextInput type='email' placeholder='name@gmail.com' id='cus_email' onChange={handleChange}/>
              </div>
              <div>
                <Label value='Your username' />
                <TextInput type='text' placeholder='Username' id='cus_username' onChange={handleChange}/>
              </div>
              <div>
                <Label value='Your password' />
                <TextInput type='password' placeholder='*********' id='cus_password' onChange={handleChange}/>
              </div>
              <div className='flex flex-row gap-2'><div>
                <Label value='Contact number' />
                <TextInput type='number' placeholder='+94xxxxxxxxx' id='cus_cnumber' onChange={handleChange}/>
              </div>
              <div>
                <Label value='Your Gender' />
                <select className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500" id="cus_gender" onChange={handleChange}>
                    <option value="" defaultValue>Choose...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <Label value='Your Age' />
                <TextInput type='number' placeholder='Age' id='cus_age' onChange={handleChange}/>
              </div></div>
              <div>
                <Label value='Your address' />
                <textarea className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-500 resize-none" id='cus_address' onChange={handleChange}></textarea>
              </div>
              <div className='flex flex-row gap-2'>
              <div>
                <Label value='Latitude' />
                <TextInput type='number' placeholder='Latitude' id='cus_latitude' onChange={handleChange}/>
              </div>
              <div>
                <Label value='Longtitude' />
                <TextInput type='number' placeholder='Longtitude' id='cus_longtitude' onChange={handleChange}/>
              </div>
              </div>
              <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>{
                loading ? (
                  <><Spinner size='sm'/><span className='pl-3'>Loading...</span></>
                ) : 'Register'
              }</Button>
            </form>
            <div className='flex gap-2 text-sm mt-5'>
              <span>Have an account?</span>
              <Link to='/Customerlogin' className='text-blue-500'>
                  Login
              </Link>
            </div>
            {
              errorMessage && (<Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>)
            }
          </div>
        </div>
    </div>
  )
}