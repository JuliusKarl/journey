import React, { Component } from 'react';
import DevotionalCard from './devotionalCard/DevotionalCard';
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
            savedDevotionals: [],
            render: false}}

    componentDidMount() {
        this._isMounted = true;

        /** Change this when pulling devotional data from user */
        if (this._isMounted) {this.setState({render:true})}

        /** User Logged In ? Load Data : Redirect Login */
        if (!localStorage.getItem('pj_token')) {
            this.props.history.push('/login');}}
    
    componentWillUnmount() {
        this._isMounted = false;}

    render() {
        return (
            this.state.render ? 
            <div className="main">
                {!isMobile ?
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
                            {this.state.savedDevotionals &&  this.state.savedDevotionals.length > 0 ? 
                                        this.state.savedDevotionals.map((item, i) => {
                                            return <DevotionalCard 
                                                key={i} 
                                                title={item.title} 
                                                body={item.body} 
                                                id={item._id}
                                                userId={this.state.id}
                                                savedDevotionals={this.state.savedDevotionals}/>})
                                        : 
                                        <i>No Devotionals</i>}
                            </div>
                        </div>
                    </div>
                </motion.div>
                :
                <div className="mobile">
                    Not on mobile yet.
                </div>}
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
            </motion.div>)}}

export default withRouter(Devotionals);
