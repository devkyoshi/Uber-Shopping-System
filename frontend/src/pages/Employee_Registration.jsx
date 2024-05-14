import { Alert, Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function EmployeeRegistration() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
  let newValue = value.trim();
  
  
  if (id === 'Emp_Age') {
    const age = parseInt(newValue);
    if (isNaN(age) || age < 18 || age > 60) {
      setErrorMessage("Please enter a valid age between 18 and 60.");
      return;
    } else {
      setErrorMessage(null);
    }
  }
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password || !formData.Emp_Name || !formData.Emp_Age || !formData.Emp_Gender || !formData.Emp_Address || !formData.Emp_CNumber || !formData.Emp_transport || !formData.Emp_areofservice) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/Employee_Signin');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  function handleKeyPress(event) {
    const keyPressed = event.key;
    const isLetter = /^[a-zA-Z\s]$/.test(keyPressed);
    const isBackspace = keyPressed === "Backspace";
    const isDelete = keyPressed === "Delete";

    if (!isLetter && !isBackspace && !isDelete) {
      event.preventDefault();
    }
  }
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
  

  return (
    <div className=' p-3 max-w-3xl mx-auto  md:items-start gap-2'>
      
      <Link to='/' className='font-bold dark:text-white text-4xl'>
        <span className='ml-10 mt-5 px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Register</span>
        To Work With Us
      </Link>
      <p className='text-sm mt-2 mb-3 ml-10'>"Delivering excellence starts with empowering our team."</p>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-start gap-20'>
      
      
      <form className='flex flex-col md:w-1/2' onSubmit={handleSubmit}>
        <Label value='Name' />
        <TextInput type='name' placeholder='Eg: kamal' id='Emp_Name' onChange={handleChange}  onKeyDown={handleKeyPress} style={{ height: '40px', padding: '10px' }} />
        <Label value='Age' />
        <TextInput type='Number' placeholder='Eg: 30' id='Emp_Age' onChange={handleChange} style={{ height: '40px', padding: '10px' }} />
        <Label value='Gender' />
<select
  id='Emp_Gender'
  onChange={handleChange}
  style={{ height: '40px', padding: '10px', width: '100%' }}
>
<option value='Select'>Select</option>
  <option value='Male'>Male</option>
  <option value='Female'>Female</option>
  <option value='Other'>Other</option>
</select>
<Label value='Address' />
        <TextInput type='address' placeholder='Eg: 123 Main St, City, Country' id='Emp_Address' onChange={handleChange} style={{ height: '40px', padding: '10px' }} />
        <Label value='Contact Number' />
        <TextInput type='tel' placeholder='Eg: 123-456-7890' id='Emp_CNumber' onChange={handleChange} onKeyDown={handleKeyPress2} />
      </form>
      
      <form className='flex flex-col md:w-1/2' onSubmit={handleSubmit}>
        <Label value='Employee username' />
        <TextInput type='text' placeholder='Username' id='username' onChange={handleChange} style={{ height: '40px', padding: '10px' }}/>
        <Label value='Employee email' />
        <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange}style={{ height: '40px', padding: '10px' }} />
        <Label value='Password' />
        <TextInput type='password' placeholder='Password' id='password' onChange={handleChange} style={{ height: '40px', padding: '10px' }}/>
        <Label value='Employee Area Of Service' />
<select
  id='Emp_areofservice'
  onChange={handleChange}
  style={{ height: '40px', padding: '10px', width: '100%' }}
>
<option value='select'>select</option>
  <option value='Colombo'>Colombo</option>
  <option value='Gampaha'>Gampaha</option>
  <option value='Kalutara'>Kalutara</option>
  <option value='Kandy'>Kandy</option>
  <option value='Matale'>Matale</option>
  <option value='Galle'>Galle</option>
  <option value='Matara'>Matara</option>
  <option value='Hambantota'>Hambantota</option>
  <option value='Jaffna'>Jaffna</option>
</select>
<Label value='Employee Transport Method' />
<select
  id='Emp_transport'
  onChange={handleChange}
  style={{ height: '40px', padding: '10px', width: '100%' }}
>
<option value='None'>None</option>
  <option value='Car'>Car</option>
  <option value='Van'>Van</option>
  <option value='Bike'>Bike</option>
  <option value='Three Wheeler'>Three Wheeler</option>
</select>
 </form>
      
      
    </div>
    <Button type='submit'   gradientDuoTone="purpleToPink"
  className="w-40 h-10 mx-auto text-white"
  style={{ background: 'linear-gradient(to right, #8A2BE2, #FF69B4)', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }} onClick={handleSubmit}>
        Register
      </Button>
      <div >
        <span>Have an account?</span>
        <Link to='/Employee_Signin' className='text-black-500' style={{ textDecoration: 'underline', fontStyle: 'italic' }}>
          Sign In
        </Link>
      </div>
      {errorMessage && (
        <Alert className='mt-5' color='failure'>
          {errorMessage}
        </Alert>
      )}
    </div>
    
  );
}
