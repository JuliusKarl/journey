import React, { Component } from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap';
import logo from '../../assets/bible-logo-text.png';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navigator.css';

export default class Navigator extends Component {
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
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
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
              <Router>
                <Switch>
                  <Route 
                    path="/"
                    exact>
                      <Navbar.Toggle aria-controls="nav-links" />
                      <Navbar.Collapse id="nav-links">
                        {this.state.showLogin ?
                        !this.state.username ?
                            <Nav className="ml-auto">
                              <Button 
                                className="button"
                                href="/login" 
                                variant="link">Login
                              </Button>
                            </Nav> 
                          :
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
                            </Nav>  : ''}
                      </Navbar.Collapse>
                  </Route>
                </Switch>
              </Router>
            </Navbar>
          </motion.div>);}}
