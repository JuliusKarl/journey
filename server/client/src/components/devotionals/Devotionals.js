import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Devotionals extends Component {
    constructor(props) {
        super(props);}

    componentDidMount() {
        /** User Logged In ? Load Data : Redirect Login */
        if (!localStorage.getItem('pj_token')) {
            this.props.history.push('/login');}}

    render() {
        return (
            <div>
                My Devotional
            </div>)}}

export default withRouter(Devotionals);
