import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import AHours from '../video/AHours.mp4'
import { AiOutlineLeft } from 'react-icons/ai'
import './LoginForm.css';

function LoginForm() {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrorBorder, setLoginErrorBorder] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errors.length) {
      setLoginErrorBorder('loginErrorBorder')
    }
  }, [errors]);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    const demoEmail = 'demo@aa.io';
    const demoPassword = 'password'

    setEmail(demoEmail)
    setPassword(demoPassword)

    await dispatch(login(email, password));

  };

  const demoLogin2 = async (e) => {
    const demoEmail = 'marnie@aa.io';
    const demoPassword = 'password'

    setEmail(demoEmail)
    setPassword(demoPassword)

    await dispatch(login(email, password));

  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className="loginPage">
      <video className='loginbackground'autoplay="autoplay" playsinline="playsinline" muted="muted" loop="loop" src={AHours}></video>
      <button className='backToSplash'>
        <a href="/">
          <AiOutlineLeft/>
        </a>
      </button>
        <div className="formContainer">
            <h1>Welcome back!</h1>
            <h2>We're so excited to see you again!</h2>

          <form id="loginForm" autoComplete="off" onSubmit={onLogin}>
            <div className="formField">
              <label>
                EMAIL
              </label>
              <input
                id={loginErrorBorder}
                name='email'
                type="text"
                required
                autoComplete="off"
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div className="formField">
              <label>
                PASSWORD
              </label>
               <input
                id={loginErrorBorder}
                name='password'
                type="password"
                required
                autoComplete="off"
                value={password}
                onChange={updatePassword}
              />
            </div>
            <div className="loginButtons">
              <button className="formButton" type="submit">Login</button>
              <button id="demoLoginButton" className="formButton" onClick={demoLogin}>Demo One</button>
              <button id="demoLoginButton" className="formButton" onClick={demoLogin2}>Demo Two</button>
            </div>
          </form>
          <p className="already">Need an account? <Link to="/signup" id="loginHere">Register</Link></p>
      </div>
    </div>
  )
}

export default LoginForm;
