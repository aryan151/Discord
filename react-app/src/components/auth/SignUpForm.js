import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import AHours from '../video/AHours.mp4'  
import './SignUpForm.css' 
    
const SignUpForm = () => {
     
  const dispatch = useDispatch();    
  const user = useSelector(state => state.session.user);

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');


  if (user) { return <Redirect to='/dashboard' />; }    

  const onSignUp = async (e) => {
		e.preventDefault();
		if (password === repeatPassword) {
			const data = await dispatch(signUp(username, avatar, email, password ));
			if (data) {
				setErrors(data);
			}
		} else if (password !== repeatPassword) {
			setErrors(['password : Your passwords do not match.'])
		}
	};

  return (  
    <>
    <video className='signup_background'autoplay="autoplay" playsinline="playsinline" muted="muted" loop="loop" src={AHours}></video>
      <form className="signup-form-container" autoComplete="off"  onSubmit={onSignUp}>
        <h1 className="signup-header">Create an account</h1>
          <div className='standardInput'>
            <input
              className='input'
              type="text" 
              name='username' 
              placeholder=' ' 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />  
            <label className='label' htmlFor="username" >Username</label>
            <span className='underline' ></span>
          </div>  
          <div className='standardInput'>
            <input
              className='input'
              type="email" 
              name='email' 
              placeholder=' ' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />  
            <label className='label' htmlFor="email" >Email</label>
            <span className='underline' ></span>
          </div>  
          <div className='standardInput'>
            <input
              className='input'
              type="url" 
              name='avatar' 
              placeholder=' ' 
              value={avatar} 
              onChange={(e) => setAvatar(e.target.value)} 
              required 
            />  
            <label className='label' htmlFor="avatar" >Avatar</label>
            <span className='underline' ></span>
          </div>  
          <div className='standardInput'>
            <input
              className='input'
              type="password" 
              name='password' 
              placeholder=' ' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />  
            <label className='label' htmlFor="password" >Password</label>
            <span className='underline' ></span>
          </div>  
          <div className='standardInput'>
            <input
              className='input'
              type="password" 
              name='repeatPassword' 
              placeholder=' ' 
              value={repeatPassword} 
              onChange={(e) => setRepeatPassword(e.target.value)} 
              required 
            />  
            <label className='label' htmlFor="repeatPassword" >Confirm Password</label>
            <span className='underline' ></span>
          </div>   
        <button className="signup-button" type="submit">Sign Up</button>
        <div className="signup-tologin-container"> 
          <p className="signup-tologin-label">Already have an account?</p><NavLink className="signup-tologin-link" to="/login">Login</NavLink>
        </div>
      </form>
    </>
  ); 
}


export default SignUpForm;
