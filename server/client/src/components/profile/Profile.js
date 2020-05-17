import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../index.css';

class Profile extends Component {
    constructor(props) {
        super(props);}

    componentDidMount() {
        /** User Logged In ? Load Data : Redirect Login */
        if (!localStorage.getItem('pj_token')) {
            this.props.history.push('/login');;}}

    render() {
        return (
            <div className="main">
                My Profile
            </div>)}}

export default withRouter(Profile);
