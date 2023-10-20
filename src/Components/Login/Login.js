import React, { useState,useContext } from 'react';
import { FirebaseContext } from '../../Store/FirebaseContext';
import Logo from '../../olx-logo.png';
import './Login.css';
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'

function Login() {
  const navigate = useNavigate()
  const [email,setEmail]=useState('')
  const [password,setPassword] =useState('')
  const {firebase} =useContext(FirebaseContext)
  const handleLogin =(e)=>{
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      // history.push('/')
      navigate('/')
    }).catch((error)=>{
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Please enter registered Email and Password',
        footer: '<a href="">Why do I have this issue?</a>'
      })

    })

  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} onClick={()=>navigate('/')}  alt=""></img>
        <form onSubmit={handleLogin} >
          <label htmlFor="fname">Email</label>
          <br />
          <input
          onChange={(e)=>setEmail(e.target.value)}
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            required
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
          value={password}
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={(e)=>setPassword(e.target.value)}
           required
          />
          <br />
          <br />
          <button>Login</button>
        </form>
     <span onClick={()=>navigate('/signup')} style={{marginLeft:"30px",cursor:"pointer"}} >Not a User? Signup</span>
      </div>
    </div>
  );
}

export default Login;
