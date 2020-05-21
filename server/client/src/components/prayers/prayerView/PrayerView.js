import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { withRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import './PrayerView.css'

class PrayerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prayer: null,
            editMode: false,
            render: false}
    this.removePrayer = this.removePrayer.bind(this);}

    componentDidMount() {
    /** Find prayer */
    fetch('/user/prayer/find/', {
            method: 'POST',
            headers : { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: localStorage.getItem('pj_token'),
                id: window.location.pathname.split('/')[3]})})
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.prayer == {}) {
                            this.props.history.push('/prayers');}
                        else {
                        this.setState({
                            prayer: data.prayer,
                            render: true})}})
                    .then(() => console.log(this.state))
                    .catch((err) => console.log(err));}

    /** Delete prayer */
    removePrayer(e) {
        e.preventDefault();
        fetch('/user/prayer/remove/', {
                method: 'PATCH',
                headers : { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: localStorage.getItem('pj_token'),
                    id: window.location.pathname.split('/')[3]})})
                        .then((res) => res.json())
                        .then(() => {
                            this.props.history.push('/prayers');})
                        .catch((err) => console.log(err));}

    /** Handlers */
    storeValue(e) {  
        this.setState({
            [e.target.name]: e.target.value});}

    render() {
        return (
            this.state.render ? 
                <motion.div 
                    className="main"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    {!this.state.editMode ? 
                    <form>
                        <div className="prayer-view-form-content">
                            <div><b>{this.state.prayer.title}</b></div>
                            <div><small>{this.state.prayer.body}</small></div>
                            <div className="form-buttons">
                                <input 
                                    type="submit" 
                                    value="Edit"/>

                                <input 
                                    type="submit" 
                                    onClick={this.removePrayer}
                                    value="Delete"/>
                            </div>
                        </div>
                    </form>
                    : 
                    <form>
                        <input 
                            type="text" 
                            className="prayer-title"
                            name="newPrayerTitle"
                            onChange={this.storeValue}
                            value={this.state.prayer.title}
                            placeholder="Title"/>
                        <textarea
                            type="textarea" 
                            name="newPrayerBody"
                            onChange={this.storeValue}
                            value={this.state.prayer.body}
                            className="prayer-body"
                            rows="6"
                            placeholder="Prayer"></textarea>

                        <div className="form-buttons">
                            <input 
                                type="submit" 
                                value="Save"/>

                            <input 
                                type="submit" 
                                onClick={this.removePrayer}
                                value="Delete"/>
                        </div>
                    </form>}
                </motion.div>
                :
                '')}}

export default withRouter(PrayerView);
