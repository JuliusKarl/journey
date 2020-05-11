import React, { Component } from 'react';
import './Login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
            emailIsValid: true,
            emailExists: false,
            passwordIsValid: false,
            name: '',
            email: '',
            password: '',
            validLoginCredentials: true
        }
        this.changeType = this.changeType.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.storeValue = this.storeValue.bind(this);
        this.comparePassword = this.comparePassword.bind(this);
        this.checkEmailExists = this.checkEmailExists.bind(this);
        // this.checkCredentials = this.checkCredentials.bind(this);}
    }

    // Imperative Functions //
    storeValue(e) {  
        this.setState({
            [e.target.name]: e.target.value
        });}

    changeType() {
        this.setState({
            login: !this.state.login
        });}

    // Check Login Credentials are valid //
    // checkCredentials(e) {
    //     console.log("Login reached");
    //     fetch('/user/login', {
    //             method: 'POST',
    //             headers : { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 email : this.state.email,
    //                 password: this.state.password})
    //         })
    //             .then((res) => res.json())
    //             .then((data) => this.setState({validLoginCredentials: data.status}))
    //             .catch((err) => console.log(err))
    // }

    // Email authentication //
    validateEmail(e) {
        this.storeValue(e);
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    
        this.setState({
            email: e.target.value,
            emailIsValid: re.test(this.state.email.toLowerCase())
        });
    }

    checkEmailExists() {
        fetch('/user/check_email', {
                method: 'POST',
                headers : { 'Content-Type': 'application/json' },
                body: JSON.stringify({email:this.state.email})
            })
                .then((res) => res.json())
                .then((data) => this.setState({emailExists: data.status}))
                .catch((err) => console.log(err))
    }

    // Password validator //
    comparePassword(e) {
        let valid = e.target.value.localeCompare(this.state.password);
        this.setState({
            passwordIsValid: !Boolean(valid)
        })
    }

    render() {
        return (
            <div className="main-content">
                <div style={{height: '10vh'}}></div>
                <div className="login-container">
                    {this.state.login?
                    <form 
                        method="POST"
                        action="/user/login">
                        <div></div>
                        {!this.state.validLoginCredentials && <p className="error-warning">Invalid username or password</p>}
                        <input  
                            onChange={this.storeValue}
                            type="text" 
                            name="email"
                            placeholder="Email"/>

                        <input 
                            onChange={this.storeValue}
                            type="password" 
                            name="password"
                            placeholder="Password"/>

                        <input 
                            disabled = {!this.state.email || !this.state.password}
                            // onClick={this.checkCredentials}
                            type="submit"
                            value="Login"/>

                        <div>
                            Not Registered?&nbsp;
                            <span 
                                onClick={this.changeType} 
                                className="pointer">
                                    Create an account
                            </span>

                        </div>
                    </form>
                    :
                    <form 
                        method="POST" 
                        action="/user/signup">
                        <div></div>

                        <input 
                            onChange={this.storeValue}
                            type="text" 
                            name="name"
                            placeholder="Name"/>

                        <input 
                            onChange={this.validateEmail}
                            onClick={this.state.email && this.validateEmail}
                            onBlur={this.checkEmailExists}
                            value={this.state.email}
                            style={
                                this.state.emailIsValid ?
                                    {outline:""}:
                                    {outline:"2px rgba(196, 33, 33, 0.7) solid"}}
                            type="text" 
                            name="email"
                            placeholder="Email"/>
                            {this.state.emailExists && <p className="error-warning">Mail Exists!</p>}

                        <input 
                            onChange={this.storeValue}
                            type="password" 
                            name="password"
                            placeholder="Password"/>
                        
                        <input 
                            onChange={this.comparePassword}
                            onClick={this.state.password && this.comparePassword}
                            style={this.state.password ? this.state.passwordIsValid? {outline:''} : {outline:"2px rgba(196, 33, 33, 0.7) solid"} : {outline:''}}
                            type="password" 
                            name="confirmPassword"
                            placeholder="Confirm Password"/>

                        <input 
                            disabled = {
                                !this.state.email || 
                                !this.state.password || 
                                !this.state.passwordIsValid || 
                                !this.emailExists}
                            type="submit" 
                            value="Submit"/>             

                        <div>
                            Already have an account?&nbsp;
                            <span 
                                onClick={this.changeType} 
                                className="pointer">
                                    Log in
                            </span>
                        </div>
                    </form>}
                </div>
            </div>)}};