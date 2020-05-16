import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Profile extends Component {
    constructor(props) {
        super(props);}

    componentDidMount() {
        /** User Logged In ? Load Data : Redirect Login */
        if (!localStorage.getItem('pj_token')) {
            this.props.history.push('/login');;}}

    render() {
        return (
            <div>
                My Profile
            </div>)}}

export default withRouter(Profile);
