import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { isMobile } from "react-device-detect";
import Loader from 'react-loader-spinner';
import { motion } from 'framer-motion';
import '../../index.css';

class Devotionals extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            render: false,}}

    componentDidMount() {
        this._isMounted = true;

        /** Change this when pulling devotional data from user */
        this.setState({render:true})

        /** User Logged In ? Load Data : Redirect Login */
        if (!localStorage.getItem('pj_token')) {
            this.props.history.push('/login');}}
    
    componentWillUnmount() {
        this._isMounted = false;}

    render() {
        return (
            <div className="main">
                {this.state.render ?
                !isMobile ?
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    <div className="browser">
                        <div>
                            <div className="toolbar">
                                <h2>My Devotionals</h2>
                                <input 
                                    className="search" 
                                    type="text" 
                                    placeholder="Search devotional..."/>
                            </div>
                            <hr />
                            <div className="prayer-list">
                                {this.state.savedPrayers &&  this.state.savedPrayers.length > 0 ? this.state.savedPrayers : 'No Devotionals'}
                                {/* fetch prayers from user else display 'no prayers' */}
                            </div>
                        </div>
                    </div>
                </motion.div>
                :
                <div className="mobile">
                    Not on mobile yet.
                </div>
                :
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    <Loader
                        type="TailSpin"
                        color="#dbdbdb"
                        height={80}
                        width={80}
                        className="loader"/>
                </motion.div>}
            </div>)}}

export default withRouter(Devotionals);
