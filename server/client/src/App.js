import React, { Component } from 'react';
import Login from './components/login/Login';
import Landing from './components/landing/Landing';
import {Navbar, Nav, Button} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import logo from './assets/bible-logo-text.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      devotional: "",
      date: "",
      author: "",
      link: "",
      username: null,
      showLogin: true}}

  componentDidMount() {
    /** Get devotional from server */
    fetch('/devotional')
      .then(response => response.json())
      .then(response => {
          const devotional = response["1"];
          this.setState({
              devotional: devotional.text,
              date: response.date,
              author: devotional.reference,
              link: devotional.readingUrl})})

      /** Authenticate user */
      fetch('/user/find', {
        method: 'POST',
        headers : { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: localStorage.getItem('pj_token')})})
            .then(response => response.json())
            .then(data => {
              this.setState({
                  username: data.name})})}
  render() {
      return (
          <div className="App">
            <Navbar 
              bg="dark" 
              variant="dark"
              expand="lg"
              className="header-text">
      
              <Navbar.Brand href="/">
                  <img 
                    src={logo} 
                    alt="Journey" 
                    height="35" 
                    width="150"/>
              </Navbar.Brand>
              {this.state.showLogin && <Navbar.Toggle aria-controls="basic-navbar-nav" />}
              {this.state.showLogin ?
              !this.state.username ?
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  <Button 
                    className="button"
                    href="/login" 
                    variant="outline-light">Login
                  </Button>
                </Nav> 
              </Navbar.Collapse> 
              :
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  <Button 
                      className="button" 
                      variant="link">Prayers
                  </Button>
                  <Button 
                      className="button" 
                      variant="link">Devotionals
                  </Button>
                  <Button 
                      className="button" 
                      variant="link">Account
                  </Button>
                </Nav> 
              </Navbar.Collapse> 
              : ''}
            </Navbar>
      
            <Router>
              <Switch>
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
          </div>);}}
