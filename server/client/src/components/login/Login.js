import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Login.css';

class Login extends Component {
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
            validLoginCredentials: null,
            validSignupCredentials: null}
        this.changeType = this.changeType.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.storeValue = this.storeValue.bind(this);
        this.comparePassword = this.comparePassword.bind(this);
        this.checkEmailExists = this.checkEmailExists.bind(this);
        this.checkCredentials = this.checkCredentials.bind(this);
        this.checkSignup = this.checkSignup.bind(this)}
    
    componentDidMount() {
        /** Is user logged in? */
        if (localStorage.getItem("pj_token")) {
            this.props.history.push('/');
            window.location.reload(true);}}

    /** Imperative Functions */
    storeValue(e) {  
        this.setState({
            [e.target.name]: e.target.value});}

    changeType() {
        this.setState({
            login: !this.state.login,
            emailIsValid: true,
            emailExists: false,
            passwordIsValid: false,
            name: '',
            email: '',
            password: '',
            validLoginCredentials: null});}

    /** Credential validator */
    checkCredentials(e) {
        e.preventDefault();
        fetch('/user/log_in', {
                method: 'POST',
                headers : { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email : this.state.email,
                    password: this.state.password})})
                        .then((res) => res.json())
                        .then((data) => {
                            localStorage.setItem("pj_token", data.token);
                            this.setState({
                                validLoginCredentials: data.status})})
                        .then((data) => {
                            if (this.state.validLoginCredentials === true) {
                                this.props.history.push('/');
                                window.location.reload(true);}
                            else {
                                localStorage.removeItem("pj_token")}})
                        .catch((err) => console.log(err));}
    /** Check Signup */
    checkSignup(e) {
        e.preventDefault();
        fetch('/user/signup', {
                method: 'POST',
                headers : { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name : this.state.name,
                    email : this.state.email,
                    password: this.state.password})})
                        .then((res) => res.json())
                        .then((data) => {
                            this.setState({
                                validSignupCredentials: data.status})})
                        .then(() => {
                            if (this.state.validSignupCredentials === true) {
                                this.changeType()}
                                setTimeout(
                                    function() {
                                        this.setState({validSignupCredentials: null});}
                                .bind(this), 2000);})
                        .catch((err) => console.log(err));}

    /** Email Authentication */
    checkEmailExists() {
        fetch('/user/check_email', {
                method: 'POST',
                headers : { 'Content-Type': 'application/json' },
                body: JSON.stringify({email:this.state.email})})
                    .then((res) => res.json())
                    .then((data) => this.setState({emailExists: data.status}))
                    .catch((err) => console.log(err))}

    validateEmail(e) {
        this.storeValue(e);
        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    
        this.setState({
            emailIsValid: regex.test(this.state.email.toLowerCase())});}

    /** Password Validator */
    comparePassword(e) {
        let valid = e.target.value.localeCompare(this.state.password);
        this.setState({
            passwordIsValid: !Boolean(valid)})}

    render() {
        return (
            <div>
                <motion.div 
                    className="main-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>

                    <div style={{height: '10vh'}}></div>
                    <div className="login-container">
                        {this.state.login?
                            <form 
                                method="POST">
                                <div className="form-header">Log in</div>
                                {this.state.validLoginCredentials === false && <div className="error-warning form-header">Invalid username or password</div>}
                                {this.state.validSignupCredentials === true && <div className="success-text form-header">Signup succesful!</div>}
                                <input  
                                    onChange={this.storeValue}
                                    value={this.state.email}
                                    type="text" 
                                    name="email"
                                    placeholder="Email"/>

                                <input 
                                    onChange={this.storeValue}
                                    value={this.state.password}
                                    type="password" 
                                    name="password"
                                    placeholder="Password"/>

                                <input
                                    type="submit"
                                    disabled={!this.state.email || !this.state.password}
                                    onClick={this.checkCredentials}
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
                                method="POST">
                                <div className="form-header">Sign Up</div>
                                {this.state.validSignupCredentials === false && <p className="error-warning">Unexpected error, Try again.</p>}
                                <input 
                                    onChange={this.storeValue}
                                    value={this.state.name}
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
                                    value={this.state.password}
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
                                    onClick={this.checkSignup}
                                    disabled = {
                                        !this.state.email || 
                                        !this.state.password || 
                                        !this.state.passwordIsValid || 
                                        !this.state.emailIsValid ||
                                        this.emailExists}
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
                </motion.div>
            </div>)}};

export default withRouter(Login);