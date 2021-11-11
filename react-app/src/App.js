import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Splash from './components/Splash';
import { authenticate } from './store/session';
import Dashboard from './components/Dashboard/Index';
import Server from './components/Server';
import Explore from './components/Explore';



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}

      {/* <Channels /> */}
      <Switch>
        <Route path='/' exact={true}>
          <Splash />
          <NavBar />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
          <NavBar />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUpForm />
          <NavBar />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}

        <ProtectedRoute path='/dashboard' exact={true} >
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute path='/home/:serverId' exact={true} >
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute path='/:serverId' exact={true} >
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute path='/:serverId/:channelId' exact={true} >
          <Dashboard />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
