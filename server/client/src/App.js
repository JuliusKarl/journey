import React, { Component } from 'react';
import Login from './components/login/Login';
import Landing from './components/landing/Landing';
import Navbar from './components/navigator/Navigator';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      showLogin: true}}

  componentDidMount() {
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
          <Navbar />      
          <Router>
            <AnimatePresence exitBeforeEnter>
              <Switch>
                <Route
                  exact
                  path='/'
                  component={() => <Landing/>}>
                </Route>
                <Route
                  exact
                  path='/login'
                  component={() => <Login />}>
                </Route>
              </Switch>
            </AnimatePresence>
          </Router>
        </div>);}}
