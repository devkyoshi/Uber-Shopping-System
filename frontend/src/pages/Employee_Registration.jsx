import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    if (!formData.username ||!formData.email ||!formData.password |!formData.Emp_Name ||!formData.Emp_Age ||!formData.Emp_Gender ||!formData.Emp_Address ||!formData.Emp_CNumber ||!formData.Emp_transport ||!formData.Emp_areofservice) {
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
      if(res.ok) {
        navigate('/Employee_Signin');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (

<div  className='min-h-screen ' style={{ 
    backgroundImage: "url('https://i.gifer.com/EIG1.gif')",
    backgroundSize: 'cover',
    backgroundPosition: 'cover',
    width: 'auto',
    height: 'auto',
}}>
  <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-2 '>

     <div className='flex-1 mt-5 ' >
     <Link to='/' className='font-bold dark:text-white text-4xl'>
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white '>Register</span>
    To Work With Us</Link>
    <p className='text-sm mt-7 mb-3  '>
    "Delivering excellence starts with empowering our team."
          </p>
          <form className='flex flex-col gap-2 '  onSubmit={handleSubmit} >
            
            <div >
              <Label value='Name' />
              <TextInput type='name' placeholder='  Eg: kamal' id='Emp_Name'onChange={handleChange} style={{ height: '40px' , padding: '10px'}} />
            </div>
            
            <div>
             <Label value='Age' />
             <TextInput type='age' placeholder='   Eg: 30' id='Emp_Age'onChange={handleChange}  style={{ height: '40px' , padding: '10px'}}/>
            </div>

           <div>
              <Label value='Gender' />
              <TextInput type='gender' placeholder='   Eg: Male /Female /Other' id='Emp_Gender'onChange={handleChange} style={{ height: '40px' , padding: '10px'}}/>
            </div>

            <div>
              <Label value='Address' />
              <TextInput type='address' placeholder='  Eg: 123 Main St, City, Country' id='Emp_Address'onChange={handleChange} style={{ height: '40px' , padding: '10px'}}/>
            </div>

            <div>
              <Label value='Contact Number' />
              <TextInput type='tel'placeholder='Eg: 123-456-7890' id='Emp_CNumber'onChange={handleChange}/>
            </div>

            <div>
              <Label value='Employee username' />
              <TextInput type='text' placeholder='Username' id='username'onChange={handleChange}/>
            </div>

            <div>
              <Label value='Employee email' />
              <TextInput type='email' placeholder='name@company.com' id='email'onChange={handleChange}/>
            </div>

            <div>
              <Label value='Password' />
              <TextInput type='password' placeholder='Password' id='password'onChange={handleChange}/>
            </div>

         

            <div>
              <Label value='Employee Area Of Service' />
              <TextInput type='text' placeholder='district' id='Emp_areofservice'onChange={handleChange}/>
            </div>
            
            <div>
              <Label value='Employee trasnport method' />
              <TextInput type='text' placeholder='Vehicle' id='Emp_transport'onChange={handleChange}/>
            </div>
          

            <Button
               type='submit' 
               className='mt-5'
               disabled={loading} 
               style={{
                 padding: '0.25rem 0.25rem',
                 fontSize: '1rem',
                 borderRadius: '0.375rem',
                 color: 'linear-gradient(90deg, #EC4899, #FFB037)',
                 background: 'transparent',
                 border: '1px solid #EC4899',
                 outline: 'none',
                 opacity: loading ? '0.7' : '1',
                 pointerEvents: loading ? 'none' : 'auto',
                 cursor: loading ? 'not-allowed' : 'pointer'
               }}
               onMouseEnter={(e) => { 
               e.target.style.background = 'linear-gradient(90deg, #EC4899, #FFB037)';
               e.target.style.color = 'white';
               }}
               onMouseLeave={(e) => { 
               e.target.style.background = 'transparent';
               e.target.style.color = 'black';
               }}
               
            >
              Register
            </Button>
            
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/Employee_Signin' className='text-black-500' style={{textDecoration: 'underline', fontStyle: 'italic'}}>
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
  </div>

</div>
  )
}
