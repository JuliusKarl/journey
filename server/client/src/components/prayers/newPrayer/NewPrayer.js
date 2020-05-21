import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { motion } from 'framer-motion';

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
                className="main"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <form>
                    <span>
                        <i 
                            onClick={this.cancelPrayer}
                            className="material-icons">close</i>
                    </span>
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
                        rows="6"
                        placeholder="Prayer"></textarea>

                    <div className="form-buttons">
                        <input 
                            type="submit" 
                            onClick={this.submitPrayer}
                            disabled={!this.state.newPrayerTitle}
                            value="Add"/>
                    </div>
                </form>
            </motion.div>)}}

export default withRouter(NewPrayer);
