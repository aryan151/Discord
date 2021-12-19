import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import AHours from '../video/AHours.mp4'
import { AiOutlineLeft } from 'react-icons/ai'
import './SignUpForm.css'

const SignUpForm = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');


  if (user) { return <Redirect to='/dashboard' />; }


  const handleSubmit = async (e) => {
		e.preventDefault();
    setEmailError('')
    setUsernameError('')
    setPasswordError('')
    setConfirmPasswordError('')

		if (password && password !== confirmPassword) {
      setConfirmPasswordError('Passwords Do Not Match!');
      return;
    }

    let data;
    data = await dispatch(signUp(email, username, password))

    if (data) {
      const errors = data.errors;
      errors.forEach(error => {
        if (error.includes('Email')) {
          setEmailError(error)
        }
        if (error.includes('Username')) {
          setUsernameError(error)
        }
        if (error.includes('Password')) {
           setPasswordError(error)
        }
      })
    }
	};

  return (
    <>
    <video className='signup_background'autoplay="autoplay" playsinline="playsinline" muted="muted" loop="loop" src={AHours}></video>
    <button className='backToSplash'>
        <a href="/">
          <AiOutlineLeft/>
        </a>
      </button>
    <form className="signup-form-container" onSubmit={handleSubmit}>
        <h1 className="signup-header">Create an account</h1>
        <label className="signup-email-label" >
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-email-input"
            required
          />
          { emailError && (
            <div className="signup-error-container" id={emailError}>
              <p className="signup-error">{emailError}</p>
            </div>
          )}
        </label>
        <label className="signup-username-label">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="signup-username-input"
            required
          />
          { usernameError && (
            <div className="signup-error-container">
              <p className="signup-error">{usernameError}</p>
            </div>
          )}
        </label>
        <label className="signup-password-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-password-input"
            required
          />
          { passwordError && (
            <div className="signup-error-container">
              <p className="signup-error">{passwordError}</p>
            </div>
          )}
        </label>
        <label className="signup-confirm-label">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="signup-confirm-input"
            required
          />
          { confirmPasswordError && (
            <div className="signup-error-container">
              <p className="signup-error">{confirmPasswordError}</p>
            </div>
          )}
        </label>
        <button className="formButton" type="submit">Sign Up</button>
        <div className="signup-tologin-container">
          <p className="signup-tologin-label">Already have an account?</p><NavLink className="signup-tologin-link" to="/login">Login</NavLink>
        </div>
      </form>
    </>
  );
}


export default SignUpForm;
