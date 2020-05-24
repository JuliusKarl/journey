import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import { isMobile } from "react-device-detect";
import './DevotionalView.css'

class DevotionalView extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            render: false,
            text: this.props.text,
            reference: this.props.reference,
            readingUrl: this.props.readingUrl,
            date: this.props.date,
            note: this.props.note,
            id: this.props.id,
            userId: this.props.userId,
            editMode: false}
    this.storeValue = this.storeValue.bind(this);
    this.removeDevotional = this.removeDevotional.bind(this);
    this.cancelDevotional = this.cancelDevotional.bind(this);
    this.editDevotional = this.editDevotional.bind(this);} 

    componentDidMount() {
    /** Find devotional */
    fetch('/user/devotional/find', {
            method: 'POST',
            headers : { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: localStorage.getItem('pj_token'),
                date: window.location.pathname.split('/')[3]})})
                    .then((res) => res.json())
                    .then((data) => {
                        this.setState({
                            text: data.devotional.text,
                            reference: data.devotional.reference,
                            readingUrl: data.devotional.readingUrl,
                            date: data.devotional.date,
                            note: data.devotional.note,
                            render: true})
                        if (this.state.text == null) {
                            this.props.history.push('/devotionals')}})
                    .catch((err) => console.log(err));}

    /** Remove devotional */
    removeDevotional(e) {
        e.preventDefault();
        fetch('/user/devotional/remove/', {
                method: 'PATCH',
                headers : { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: localStorage.getItem('pj_token'),
                    date: window.location.pathname.split('/')[3]})})
                        .then((res) => res.json())
                        .then(() => {
                            this.props.history.push('/devotionals');})
                        .catch((err) => console.log(err));}
                        
    /** Close devotional */
    cancelDevotional() {
        this.props.history.push('/devotionals');}
    
    editDevotional(e) {
        if (!this.state.editMode) {
            this.setState({
                editMode: !this.state.editMode})}
        else {
            e.preventDefault();
            fetch('/user/devotional/edit', {
                    method: 'PATCH',
                    headers : { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        token: localStorage.getItem('pj_token'),
                        id: window.location.pathname.split('/')[3],
                        note: this.state.note})})
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
                    className="main-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    {!isMobile ? <div style={{height: '10vh'}}></div>: <div style={{height: '5vh'}}></div>}
                    {!this.state.editMode ? 
                        <form>
                            <div className="devotional-view-form-content">
                            <span className="devotional-toolbar">
                                <span className="devotional-date">
                                    <small><small><i>
                                    {this.state.date.substring(0,10).split('-')[2]}/
                                    {this.state.date.substring(0,10).split('-')[1]}/
                                    {this.state.date.substring(0,10).split('-')[0]}
                                    </i></small></small>
                                </span>
                                <span className="close pointer">
                                <i 
                                    onClick={this.cancelDevotional}
                                    className="material-icons">close</i>
                                </span>
                            </span>
                                <div className="devotional-title"><Link className="link" to={this.state.readingUrl}><b>"{this.state.text}"</b></Link></div>
                                <div className="devotional-body">{this.state.reference}</div>
                                <div className="form-buttons">
                                    <input 
                                        type="submit" 
                                        className="danger"
                                        onClick={this.removeDevotional}
                                        value="Delete"/>
                                </div>
                            </div>
                        </form>
                        : 
                        <form>
                            <span  className="devotional-toolbar">
                                <span>
                                    <small><small>
                                    {this.state.date.substring(0,10).split('-')[2]}/
                                    {this.state.date.substring(0,10).split('-')[1]}/
                                    {this.state.date.substring(0,10).split('-')[0]}
                                    </small></small>
                                </span>
                                <i 
                                    onClick={this.cancelDevotional}
                                    className="material-icons">close</i>
                            </span>
                            <div className="devotional-view-form-content">
                                <div><Link to={this.state.readingUrl}><b>"{this.state.text}"</b></Link></div>
                                <div><small>{this.state.reference}</small></div>
                                <hr />
                                <div className="form-buttons"></div>

                            <div className="form-buttons">
                                <input 
                                    onClick={this.editDevotional}
                                    type="submit" 
                                    value="Save"/>

                                <input 
                                    type="submit" 
                                    onClick={this.removeDevotional}
                                    value="Delete"/>
                            </div>
                            </div>
                        </form>}
                </motion.div>
                :
                '')}}

export default withRouter(DevotionalView)