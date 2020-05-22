import React, { Component } from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap';
import logo from '../../assets/bible-logo-text.png';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navigator.css';

export default class Navigator extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      devotional: "",
      date: "",
      author: "",
      link: "",
      username: null,
      showLogin: false}}

  componentDidMount() {
    /** Get devotional from server */
    if (this._isMounted) {
      fetch('/devotional')
      .then(response => response.json())
      .then(response => {
          const devotional = response["1"];
          this.setState({
              devotional: devotional.text,
              date: response.date,
              author: devotional.reference,
              link: devotional.readingUrl})})}
        
    /** Authenticate user */
    fetch('/user/find', {
      method: 'POST',
      headers : { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          token: localStorage.getItem('pj_token')})})
          .then(response => response.json())
          .then(data => {
            this.setState({
                username: data.name,
                showLogin: true})})
          .catch(() => this.setState({showLogin:true}))}

  componentWillUnmount() {
    this._isMounted = false;}
    
  render() {
      return (
        localStorage.getItem("pj_token") == null ?
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <Navbar 
            bg="dark" 
            variant="dark"
            expand="lg"
            className="header-text navbar-fixed-top">
              <Navbar.Brand href="/">
                  <img 
                    src={logo} 
                    alt="Journey" 
                    height="35" 
                    width="150"/>
              </Navbar.Brand>
            <Router>
              <Switch>
                <Route 
                  path="/"
                  exact>
                    <Navbar.Toggle aria-controls="nav-links" />
                    <Navbar.Collapse id="nav-links">
                      {this.state.showLogin === true ?
                      !this.state.username ?
                          <Nav className="ml-auto">
                            <motion.div 
                              className="center-text"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}>

                              <Button 
                                className="button"
                                href="/login" 
                                variant="link">Login
                              </Button>
                            </motion.div>
                          </Nav> 
                        :
                          <Nav className="ml-auto">
                            <motion.div 
                              className="center-text"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}>

                              <Button 
                                  className="button" 
                                  href="/prayers" 
                                  variant="link">Prayers
                              </Button>
                              <Button 
                                  className="button" 
                                  href="/devotionals" 
                                  variant="link">Devotionals
                              </Button>
                              <Button 
                                className="button" 
                                href="/profile" 
                                variant="link">Profile
                              </Button>
                            </motion.div>
                          </Nav> : 'Not Yet'}
                    </Navbar.Collapse>
                </Route>
              </Switch>
            </Router>
          </Navbar>
        </motion.div>
        :
        <div>
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
                <Navbar.Toggle aria-controls="nav-links" />
                <Navbar.Collapse id="nav-links">
                      <Nav className="ml-auto">
                        <div>
                          <Button 
                              className="button" 
                              href="/prayers" 
                              variant="link">Prayers
                          </Button>
                          <Button 
                              className="button" 
                              href="/devotionals" 
                              variant="link">Devotionals
                          </Button>
                          <Button 
                            className="button" 
                            href="/profile" 
                            variant="link">Profile
                          </Button>
                        </div>
                      </Nav>}
                </Navbar.Collapse>
          </Navbar>
        </div>);}}
