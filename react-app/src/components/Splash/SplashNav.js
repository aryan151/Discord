import React from 'react';
import { NavLink } from 'react-router-dom';

const SplashNav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/signup' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li> 
      </ul>
    </nav>
  );  
}

export default SplashNav;