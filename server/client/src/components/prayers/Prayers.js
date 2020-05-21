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
            newPrayerBody: ''}
        this.storeValue = this.storeValue.bind(this);
        this.newPrayer = this.newPrayer.bind(this);}

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
                        render: true});}})}

    componentWillUnmount() {
        this._isMounted = false;}
    
    /** Handlers */
    storeValue(e) {  
        this.setState({
            [e.target.name]: e.target.value});}
    
    newPrayer() {
        this.props.history.push('/prayers/new');}

    render() {
        return (
            this.state.render ?
            <div className="main">
                    {!isMobile ?
                        <div className="browser">
                                             
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
                                        <input 
                                            type="button" 
                                            onClick={this.newPrayer} 
                                            value="Add prayer"/>
                                        <button>Pray now</button>
                                    </div>
                                    <hr />
                                    <div className="prayer-list">
                                        {this.state.savedPrayers &&  this.state.savedPrayers.length > 0 ? 
                                        this.state.savedPrayers.map((item, i) => {
                                            return <PrayerCard 
                                                key={i} 
                                                title={item.title} 
                                                body={item.body} 
                                                id={item._id}
                                                userId={this.state.id}/>})
                                        : 
                                        <i>No Prayers</i>}
                                    </div>
                                </motion.div>
                        </div>
                        :
                        <div>
                            <hr />
                            <div className="prayer-list">
                                {this.state.savedPrayers &&  this.state.savedPrayers.length > 0 ? 
                                    this.state.savedPrayers.map((item, i) => {
                                        return <PrayerCard  
                                            key={i} 
                                            title={item.title} 
                                            body={item.body}
                                            id={item._id}
                                            userId={this.state.id}/>})
                                : 
                                    <i>No Prayers</i>}
                            </div>
                                <i 
                                    className="mobile-add-button large material-icons"
                                    onClick={this.newPrayer}>
                                    add_circle_outline
                                </i>
                        </div>}
            </div>
            :
            <Loader
                type="TailSpin"
                color="#dbdbdb"
                height={80}
                width={80}
                className="loader"/>)}}

export default withRouter(Prayers);
