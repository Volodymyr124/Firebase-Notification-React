import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux';
import User from './componenets/home/User';
import Organization from './componenets/home/App';
import ProtectedRoute from './componenets/ProtectedRoute';
import Home from './componenets/Home';
import Login from './componenets/Login';
import Signup from './componenets/Signup';

function App(props) {
  const { isAuthenticated, isVerifying } = props; 
  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component = { Home }
        isAuthenticated = { isAuthenticated }
        isVerifying = { isVerifying }
      />
      <ProtectedRoute path = "/user" isAuthenticated = { isAuthenticated }
        isVerifying = { isVerifying } component = { User } />
      <ProtectedRoute path = "/app" isAuthenticated = { isAuthenticated }
        isVerifying = { isVerifying } component = { Organization } />
      <Route path = "/login" component = { Login } />      
      <Route path = "/signup" component = { Signup } />      
    </Switch>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}
export default connect(mapStateToProps)(App);
