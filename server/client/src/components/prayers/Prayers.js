import React, { Component } from 'react';
import PrayerCard from './prayerCard/prayerCard';
import { Link, withRouter } from 'react-router-dom';
import { isMobile } from "react-device-detect";
import Loader from 'react-loader-spinner';
import { motion } from 'framer-motion';
import AddPrayer from '../../assets/add-prayer.png';
import PrayNow from '../../assets/pray-now.png';
import './Prayers.css';
import '../../index.css';


class Prayers extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            render: false,
            id: null,
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
                                            value="New prayer &#65291;"/>
                                        <Link 
                                            className="link"
                                            onClick={this.state.savedPrayers.length <= 0 ? e => e.preventDefault() : ''}
                                            to={"/prayers/carousel/" + this.state.id}>
                                                Pray now 🡒
                                        </Link>
                                    </div>
                                    <hr />
                                    <div className="list">
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
                            <div className="list">
                                <input 
                                    className="search list-input" 
                                    type="text" 
                                    placeholder="Search prayer..."/>
                                <hr />
                                {this.state.savedPrayers &&  this.state.savedPrayers.length > 0 ? 
                                    this.state.savedPrayers.map((item, i) => {
                                        return <PrayerCard
                                            className="list-input"  
                                            key={i} 
                                            title={item.title} 
                                            body={item.body}
                                            id={item._id}
                                            userId={this.state.id}/>})
                                : 
                                    <i>No Prayers</i>}
                            </div>
                                <Link 
                                    className="mobile-pray-now-button"
                                    onClick={this.state.savedPrayers.length <= 0 ? e => e.preventDefault() : ''}
                                    to={"/prayers/carousel/" + this.state.id}>
                                        <img 
                                            src={PrayNow}
                                            className="mobile-pray-now-button"
                                            onClick={this.newPrayer}>
                                        </img>
                                </Link>
                                <img 
                                    src={AddPrayer}
                                    className="mobile-add-button"
                                    onClick={this.newPrayer}>
                                </img>
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
