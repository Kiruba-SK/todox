import React from 'react';
import "./Login.css";
import LoginCard from '../components/login/LoginCard';

const Login = () => {
  return (
    <div>
      <div className='login-container'>
       <LoginCard /> 
      </div>
    </div>
  )
}

export default Login;  