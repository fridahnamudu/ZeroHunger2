import React, {useState} from 'react'
import '../css/Login.css'
import axios from 'axios';

function Login() {
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[errors, setErrors] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3500/api/auth/login', {email, password});
      console.log('Login successful:', response.data);
      if(response.status === 400){
        setErrors(response.data.message)
      }
    } catch (err) {
      setErrors(err.response.data.message)
    }
  };
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Log In</h1>
        <form onSubmit={handleLogin}>
        <div className="loginsignup-fields">
          <input type="email" placeholder='Email Address' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type='submit'> Continue </button>
        {errors && <p className="errors">{errors}</p>}
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