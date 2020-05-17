import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { isMobile } from "react-device-detect";
import Loader from 'react-loader-spinner';
import './Prayers.css';
import '../../index.css';

class Prayers extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            render: false,
            email: '',
            savedDevotionals: [],
            savedPrayers: [],
            answeredPrayers: [],
            newPrayerView: false,
            newPrayerTitle: '',
            newPrayerBody: ''}
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
                    this.setState({
                        email: data.email,
                        savedDevotionals: data.savedDevotionals,
                        savedPrayers: data.savedPrayers,
                        answeredPrayers: data.answeredPrayers,})})
                .then(this.setState({render: true}))}

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
        fetch('/prayer/new', {
                method: 'POST',
                headers : { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.state.email,
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
                                className="large material-icons"
                                onClick={this.showNewPrayerView}>close</i></span>
                            <div className="new-prayer-header">New Prayer</div>
                            <input 
                                type="text" 
                                name="newPrayerTitle"
                                onChange={this.storeValue}
                                value={this.state.newPrayerTitle}
                                placeholder="Title"/>
                            <input 
                                type="text" 
                                name="newPrayerBody"
                                onChange={this.storeValue}
                                value={this.state.newPrayerBody}
                                className="prayer-body"
                                placeholder="Prayer" />
                            <div className="form-buttons">
                                <input type="submit" onClick={this.submitPrayer} value="Add"/>
                            </div>
                        </form>
                    </div>
                    :
                    <div>
                        <div className="toolbar">
                            <h2>My Prayers</h2>
                            <input 
                                className="search" 
                                type="text" 
                                placeholder="Search prayer..."/>
                            <button>Pray now</button>
                            <button onClick={this.showNewPrayerView}>Add prayer</button>
                        </div>
                        <hr />
                        <div className="prayer-list">
                           {this.state.savedPrayers &&  this.state.savedPrayers.length > 0 ? this.state.savedPrayers : 'No Prayers'}
                            {/* fetch prayers from user else display 'no prayers' */}
                        </div>
                    </div>}
                </div>
                :
                <div className="mobile">
                    <button>Pray now (Mobile)</button>
                    <button>Add prayer (Mobile)</button>
                </div>
                :
                <Loader
                    type="TailSpin"
                    color="#dbdbdb"
                    height={80}
                    width={80}
                    className="loader"/>}
            </div>)}}

export default withRouter(Prayers);
