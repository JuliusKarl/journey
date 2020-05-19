import React, { Component } from 'react';
import PrayerCard from './prayerCard/prayerCard';
import { withRouter } from 'react-router-dom';
import { isMobile } from "react-device-detect";
import Loader from 'react-loader-spinner';
import { motion } from 'framer-motion';
import './Prayers.css';
import '../../index.css';

class Prayers extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            render: false,
            id: null,
            savedDevotionals: [],
            savedPrayers: [],
            answeredPrayers: [],
            newPrayerView: false,
            newPrayerTitle: '',
            newPrayerBody: '',
            showPrayerView: false,
            showPrayerId: '',
            showPrayerTitle: '',
            showPrayerBody: ''}
        this.storeValue = this.storeValue.bind(this);
        this.showNewPrayerView = this.showNewPrayerView.bind(this);
        this.submitPrayer = this.submitPrayer.bind(this);}

    /** Imperative functions, Lifecycle Hooks */
    componentDidMount() {
        /** User Logged In ? Load Data : Redirect Login */
        if (!localStorage.getItem('pj_token')) {
            this.props.history.push('/login');}
            
        /** Get prayer list */
        this._isMounted = true;
        fetch('/user/find', {
            method: 'POST',
            headers : { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: localStorage.getItem('pj_token')})})
                .then(response => response.json())
                .then(data => {
                    if (this._isMounted) {
                    this.setState({
                        id: data._id,
                        savedDevotionals: data.savedDevotionals,
                        savedPrayers: data.savedPrayers,
                        answeredPrayers: data.answeredPrayers,
                        render: true})}})}

    componentWillUnmount() {
        this._isMounted = false;}
    
    /** UI Views */    
    showNewPrayerView() {
        this.setState({
            newPrayerView: !this.state.newPrayerView})}

    /** Handlers */
    storeValue(e) {  
        this.setState({
            [e.target.name]: e.target.value});}

    submitPrayer(e) {
        e.preventDefault();
        fetch('/user/prayer/new/' + this.state.id, {
                method: 'PATCH',
                headers : { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title : this.state.newPrayerTitle,
                    body : this.state.newPrayerBody})})
                        .then((res) => res.json())
                        .then(() => {
                            this.props.history.push('/prayers');
                            window.location.reload(true);})
                        .catch((err) => console.log(err));}

    render() {
        return (
            <div className="main">
                {this.state.render ?
                !isMobile ?
                <div className="browser">
                    {this.state.newPrayerView ?
                        <div className="new-prayer">
                            <form>
                                <span><i 
                                    className="material-icons"
                                    onClick={this.showNewPrayerView}>close</i></span>
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
                                        disabled={!this.state.newPrayerTitle}
                                        onClick={this.submitPrayer} 
                                        value="Add"/>
                                </div>
                            </form>
                        </div>
                    :
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                    <div className="toolbar">
                        <h2>My Prayers</h2>
                        <input 
                            className="search" 
                            type="text" 
                            placeholder="Search prayer..."/>
                        <button onClick={this.showNewPrayerView}>Add prayer</button>
                        <button>Pray now</button>
                    </div>
                    <hr />
                    <div className="prayer-list">
                        {this.state.savedPrayers &&  this.state.savedPrayers.length > 0 ? 
                        this.state.savedPrayers.map((item, i) => {
                            return <PrayerCard key={i} title={item.title} body={item.body} />})
                        : 
                        'No Prayers'}
                    </div>
                </motion.div>}
            </div>
            :
            <div>
                <hr />
                    <div className="prayer-list">
                        {this.state.savedPrayers &&  this.state.savedPrayers.length > 0 ? 
                        this.state.savedPrayers.map((item, i) => {
                            return <PrayerCard key={i} title={item.title} body={item.body} />})
                        : 
                        'No Prayers'}
                    </div>
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

export default withRouter(Prayers);
