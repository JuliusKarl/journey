import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import './PrayerView.css'

class PrayerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prayerTitle: '',
            prayerBody: '',
            editMode: false,
            render: false}
    this.storeValue = this.storeValue.bind(this);
    this.removePrayer = this.removePrayer.bind(this);
    this.cancelPrayer = this.cancelPrayer.bind(this);
    this.editPrayer = this.editPrayer.bind(this);}  

    componentDidMount() {
    /** Find prayer */
    fetch('/user/prayer/find', {
            method: 'POST',
            headers : { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: localStorage.getItem('pj_token'),
                id: window.location.pathname.split('/')[3]})})
                    .then((res) => res.json())
                    .then((data) => {
                        this.setState({
                            prayerTitle: data.prayer.title,
                            prayerBody: data.prayer.body,
                            render: true})
                        if (this.state.prayerTitle == null) {
                            this.props.history.push('/prayers')}})
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
                        
    /** Close prayer */
    cancelPrayer() {
        this.props.history.push('/prayers');}

    editPrayer(e) {
        if (!this.state.editMode) {
            this.setState({
                editMode: !this.state.editMode})}
        else {
            e.preventDefault();
            fetch('/user/prayer/edit', {
                    method: 'PATCH',
                    headers : { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        token: localStorage.getItem('pj_token'),
                        id: window.location.pathname.split('/')[3],
                        title : this.state.prayerTitle,
                        body : this.state.prayerBody})})
                            .then((res) => res.json())
                            .then((result) => {
                                this.setState({editMode: !this.state.editMode})})
                            .catch((err) => console.log(err));}}

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
                            <span>
                                <i 
                                    onClick={this.cancelPrayer}
                                    className="material-icons">close</i>
                            </span>
                            <div className="prayer-view-form-content">
                                <div><b>{this.state.prayerTitle}</b></div>
                                <div><small>{this.state.prayerBody}</small></div>
                                <hr />
                                <div className="form-buttons">
                                    <input 
                                        onClick={this.editPrayer}
                                        type="submit" 
                                        value="Edit"/>

                                    <input 
                                        type="submit" 
                                        className="danger"
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
                                name="prayerTitle"
                                onChange={this.storeValue}
                                value={this.state.prayerTitle}
                                placeholder="Title"/>

                            <textarea
                                type="textarea" 
                                name="prayerBody"
                                onChange={this.storeValue}
                                value={this.state.prayerBody}
                                className="prayer-body"
                                rows="6"
                                placeholder="Prayer"></textarea>

                            <div className="form-buttons">
                                <input 
                                    onClick={this.editPrayer}
                                    type="submit" 
                                    value="Save"/>

                                <input 
                                    type="submit" 
                                    className="danger"
                                    onClick={this.removePrayer}
                                    value="Delete"/>
                            </div>
                        </form>}
                </motion.div>
                :
                '')}}

export default withRouter(PrayerView);
