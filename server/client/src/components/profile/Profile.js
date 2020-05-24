import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import Loader from 'react-loader-spinner';
import { isMobile } from "react-device-detect";
import '../../index.css';
import './Profile.css';

class Profile extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            render: false,
            id: null,
            name: null,
            email: null}
    this.logOut = this.logOut.bind(this);
    this.delete = this.delete.bind(this);}

    componentDidMount() {
        /** User Logged In ? Load Data : Redirect Login */
        if (!localStorage.getItem('pj_token')) {
            this.props.history.push('/login');;}
        
        else {
            fetch('/user/find', {
                method: 'POST',
                headers : { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: localStorage.getItem('pj_token')})})
                    .then(response => response.json())
                    .then(data => {
                        this.setState({
                            _id: data._id,
                            name: data.name,
                            email: data.email,
                            render: true})})
                    .then(() => {
                        if (!this.state._id) {
                            localStorage.removeItem('pj_token');}});}}
    
    logOut() {
        localStorage.removeItem('pj_token');
        this.props.history.push('/');
        window.location.reload(true);}

    delete() {
        fetch('/user/' + this.state.id, {
            method: 'POST',
            headers : { 'Content-Type': 'application/json' }})
                    .then(response => response.json())
                    .then(() => 
                        {localStorage.removeItem('pj_token');
                        this.props.history.push('/');
                        window.location.reload(true);})}

    render() {
        return (
            this.state.render ?
            <motion.div 
                className="main-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                     {!isMobile ? <div style={{height: '10vh'}}></div>: <div style={{height: '5vh'}}></div>}
                    <div className="profile-container">
                    <form>
                        <div><b>Name:&nbsp;</b>{this.state.name}</div>
                        <div><b>Email:&nbsp;</b>{this.state.email}</div>
                        <div className="form-buttons">
                            <input 
                                type="submit" 
                                onClick={this.logOut}
                                value="Log Out"/>

                            <input 
                                type="submit" 
                                onClick={this.delete}
                                className="danger"
                                value="Delete"/>
                        </div>
                    </form>
                    </div>
            </motion.div>
            :
            <Loader
                type="TailSpin"
                color="#dbdbdb"
                height={80}
                width={80}
                className="loader"/>)}}

export default withRouter(Profile);
