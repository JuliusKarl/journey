import React, { Component } from 'react';
import Login from './components/login/Login';
import Landing from './components/landing/Landing';
import Navbar from './components/navigator/Navigator'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
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
            <Navbar />      
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
