import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../index.css';

class Profile extends Component {
    constructor(props) {
        super(props);
    this.logOut = this.logOut.bind(this);}

    componentDidMount() {
        /** User Logged In ? Load Data : Redirect Login */
        if (!localStorage.getItem('pj_token')) {
            this.props.history.push('/login');;}}
    
    logOut() {
        localStorage.removeItem('pj_token');
        this.props.history.push('/');
        window.location.reload(true);}

/** To Add:  
 * - Profile Picture
 * - Name handle
 * - email handle
 * - edit profile
 * - delete account
*/
    render() {
        return (
            <motion.div 
                className="main"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <input 
                    type="button"
                    value="Log Out"
                    onClick={this.logOut}/>
            </motion.div>)}}

export default withRouter(Profile);
