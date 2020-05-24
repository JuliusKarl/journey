import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import { isMobile } from "react-device-detect";
import './NewPrayer.css';

class NewPrayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPrayerTitle: '',
            newPrayerBody: ''}
    this.storeValue = this.storeValue.bind(this);
    this.submitPrayer = this.submitPrayer.bind(this);
    this.cancelPrayer = this.cancelPrayer.bind(this);}  

    /** Prayer form actions */
    submitPrayer(e) {
        e.preventDefault();
        fetch('/user/prayer/new', {
                method: 'PATCH',
                headers : { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: localStorage.getItem('pj_token'),
                    title : this.state.newPrayerTitle,
                    body : this.state.newPrayerBody})})
                        .then((res) => res.json())
                        .then(() => {
                            this.setState({
                                newPrayerView: !this.state.newPrayerView,
                                newPrayerTitle: '',
                                newPrayerBody: '',})
                            this.props.history.push('/prayers');
                            window.location.reload(true);})
                        .catch((err) => console.log(err));}

    cancelPrayer() {
        this.props.history.push('/prayers');}

    /** Handlers */
    storeValue(e) {  
        this.setState({
            [e.target.name]: e.target.value});}

    render() {
        return (
            <motion.div 
                className="main-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                {!isMobile ? <div style={{height: '10vh'}}></div>: <div style={{height: '5vh'}}></div>}
                <div className="new-prayer-container">
                    <span>
                        <i 
                            onClick={this.cancelPrayer}
                            className="material-icons close pointer">close</i>
                    </span>
                    <form>
                        <div className="new-prayer-header">New Prayer</div>
                        <input 
                            type="text" 
                            name="newPrayerTitle"
                            onChange={this.storeValue}
                            value={this.state.newPrayerTitle}
                            placeholder="Title"/>

                        <textarea
                            type="textarea" 
                            name="newPrayerBody"
                            onChange={this.storeValue}
                            value={this.state.newPrayerBody}
                            className="prayer-body"
                            rows="4"
                            placeholder="Prayer"></textarea>
                        <div className="form-buttons">
                            <input 
                                type="submit" 
                                onClick={this.submitPrayer}
                                disabled={!this.state.newPrayerTitle}
                                value="Add"/>
                        </div>
                    </form>
                </div>
            </motion.div>)}}

export default withRouter(NewPrayer);
