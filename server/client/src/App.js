import React, { Component } from 'react';
import Login from './components/login/Login';
import Landing from './components/landing/Landing';
import Navigator from './components/navigator/Navigator';
import Prayers from './components/prayers/Prayers';
import NewPrayer from './components/prayers/newPrayer/NewPrayer';
import PrayerView from './components/prayers/prayerView/PrayerView';
import Profile from './components/profile/Profile';
import Devotionals from './components/devotionals/Devotionals';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      _id: null}}

  componentDidMount() {
    /** Authenticate user */
    if (window.location.pathname == '/') {
    fetch('/user/find', {
      method: 'POST',
      headers : { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          token: localStorage.getItem('pj_token')})})
          .then(response => response.json())
          .then(data => {
            this.setState({
                _id: data._id})})
          .then(() => {
            if (!this.state._id) {
              localStorage.removeItem('pj_token');}});}}

  render() {
    return (
        <div className="App">
          <Navigator />      
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

                <Route
                  exact
                  path='/prayers'
                  component={() => <Prayers />}>
                </Route>

                <Route
                  exact
                  path='/prayers/new'
                  component={() => <NewPrayer />}>
                </Route>

                <Route
                  exact
                  path='/prayers/find/:id'
                  component={() => <PrayerView />}>
                </Route>

                <Route
                  exact
                  path='/devotionals'
                  component={() => <Devotionals />}>
                </Route>

                <Route
                  exact
                  path='/profile'
                  component={() => <Profile />}>
                </Route>

              </Switch>
            </AnimatePresence>
          </Router>
        </div>);}}
