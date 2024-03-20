import React, {useState} from 'react'
import '../css/Login.css'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[errors, setErrors] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3500/api/auth/login', {email, password});
      toast.success(response.data.message);

    } catch (err) {
      setErrors(err.response.data.message)
    }
  };
  return (
    <div className='loginsignup'>
      <ToastContainer />
      <div className="loginsignup-container">
        <h1>Log In</h1>
        <form onSubmit={handleLogin}>
        <div className="loginsignup-fields">
          <input type="email" placeholder='Email Address' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        {errors && <p className="errors">{errors}</p>}
        <button type='submit'> Continue </button>
        <p className='loginsignup-login'> Don't have an account? <span><a href='/signup'>Sign Up</a></span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        </form>
      </div>
    </div>
  )
}

export default Login