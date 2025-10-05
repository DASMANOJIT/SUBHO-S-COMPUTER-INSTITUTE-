import React from 'react';
import './login.css';
import Username from '../components/assets/person.png';
import Password from '../components/assets/password.png';
const login = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="head">WELCOME TO SUBHO'S COMPUTER INSTITUTE </div>
        <div className="signup">Login </div>
        <div className="underline"></div>

      </div>
      <div className="inputs">
        <div className="input">
          <img src={Username} alt="" className="" />
          <input type="text" placeholder='Phonenumber'/>
        </div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={Password} alt="" className="" />
          <input type="password" placeholder='Password' />
        </div>
      </div>
      
      <div className="submit-container">
        <div className="submit">Login</div>
      </div>
    </div>
  )
}

export default login
