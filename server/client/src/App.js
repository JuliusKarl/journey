import React, { Component } from 'react';
import Login from './components/login/Login';
import Landing from './components/landing/Landing';
import Homepage from './components/homepage/Homepage';

import {Navbar, Nav, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';

import logo from './assets/favicon-Bible.png'

export default class Appp extends Component {
  constructor() {
    super();
    this.state = {
      devotional: "",
      date: "",
      author: "",
      link: ""
    }
  }

  componentDidMount() {
    fetch('/devotional')
      .then(response => response.json())
      .then(response => {
          const devotional = response["1"];
          this.setState({
              devotional: devotional.text,
              date: response.date,
              author: devotional.reference,
              link: devotional.readingUrl
          })
      })
  }

  render() {
      return (
          <div className="App">
            <Navbar 
              bg="dark" 
              variant="dark"
              expand="lg"
              className="header-text">
      
              <Navbar.Brand href="/">
                  <img src={logo} alt="Echo"/>
                  &nbsp;Journey
              </Navbar.Brand>
      
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="ml-auto">
                        <Button 
                          href="/login" 
                          variant="outline-light">Login
                        </Button>
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
                  component={() => 
                    <Landing 
                      devotional={this.state.devotional} 
                      date={this.state.date} 
                      author={this.state.author} 
                      link={this.state.link}/>}>
                </Route>
      
                <Route
                  exact
                  path='/login'
                  component={() => <Login />}>
                </Route>
      
              </Switch>
            </Router>
          </div>
        );
    }
}
