import React from 'react';
import Login from './components/login/Login';
import Landing from './components/landing/Landing';
import Homepage from './components/homepage/Homepage';

import {Navbar, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';

import logo from './assets/favicon-Bible.png'

function App() {
  return (
    <div className="App">
      <Navbar 
        bg="dark" 
        variant="dark"
        expand="lg">

        <Navbar.Brand href="/">
            <img src={logo} alt="Echo"/>
            &nbsp;Journey
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
      </Navbar>

      <Router>
        <Switch>
          {/* If no JWT token is foundm redirect to landing page screen */}
          {/* If there is a JWT token stored, redirect to users homepage */}
          <Route
            exact
            path='/'
            component={Landing}>
          </Route>

          <Route
            exact
            path='/login'
            component={Login}>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
