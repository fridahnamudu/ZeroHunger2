import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assests/logo.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const [menu,setMenu] = useState('Home')
    const navigate = useNavigate()

    function handleClick(){
      setMenu('Home')
      navigate(`/`)

    }

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
        </div>
        <ul className="nav-menu">
             <li onClick={()=>handleClick()}> Home{menu === 'Home'?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login">
            <Link to='/login'> <button>Log In</button></Link>
            <Link to='/Signup'> <button>Sign Up</button></Link>
        </div>

    </div>
  )
}

export default Navbar