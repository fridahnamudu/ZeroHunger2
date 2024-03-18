import React from 'react'
import './Hero.css'
import donate from '../Assests/heroimg.jpg'

function Hero() {
  return (
    <div className='Hero'>
        <div className="hero-left">
            <h1>Zero Hunger</h1>
            <p>Together we eradicate Hunger!</p>
        </div>
        <div className="hero-right">
            <img src={donate} alt="" />
        </div>


    </div>
  )
}

export default Hero