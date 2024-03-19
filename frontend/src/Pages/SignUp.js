import React, {useState} from 'react'
import '../css/Login.css'
import axios from 'axios';


function SignUp() {
  const[first_name, setFirstName] = useState("")
  const[last_name, setLastName] = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")

  console.log(first_name)
  console.log(last_name)
  console.log(email)
  console.log(password)
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3500/api/auth/signup', {first_name, last_name, email, password});
      console.log('Login successful:', response.data);
    } catch (err) {
      console.log(err)
    }
  };
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div className="loginsignup-fields">
            <input type="text" placeholder='Your First Name' value={first_name} onChange={(e)=>setFirstName(e.target.value)} />
            <input type="text" placeholder='Your Last Name' value={last_name} onChange={(e)=>setLastName(e.target.value)} />
            <input type="email" placeholder='Email Address' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button type='submit'> Continue </button>
          <p className='loginsignup-login'> Already have an account? <span> Login here</span></p>
          <div className="loginsignup-agree">
            <input type="checkbox" name='' id='' />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp