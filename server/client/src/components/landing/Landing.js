import React, { Component } from 'react';
import { isMobile } from "react-device-detect";
import { motion } from 'framer-motion';
import Loader from 'react-loader-spinner';
import { CSSTransition } from 'react-transition-group';
import mongoose from "mongoose";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './Landing.css';

export default class Landing extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            render: false,
            id: new mongoose.Types.ObjectId,
            devotional: "",
            date: "",
            author: "",
            link: "",
            saved: false}
    this.saveDevotional = this.saveDevotional.bind(this);}

    componentDidMount() {
        /** Get devotional from server */
        this._isMounted = true;
        fetch('/devotional')
        .then(response => response.json())
        .then(response => {
            const devotional = response["1"];
            if (this._isMounted) {
                this.setState({
                    devotional: devotional.text,
                    date: response.date,
                    author: devotional.reference,
                    link: devotional.readingUrl})}
            fetch('/user/devotional/find', {
                method: 'POST',
                headers : { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: localStorage.getItem('pj_token'),
                    date: response.date})})
                        .then(response => response.json())
                        .then(response => {
                            if (Object.keys(response).length !== 0) {
                                this.setState({
                                    render: true,
                                    saved: true})}
                            else {
                                this.setState({
                                    render:true})}})
                        .catch(() => this.setState({render:true}))})}

    componentWillUnmount() {
        this._isMounted = false;}

    saveDevotional(e) {
        e.preventDefault();
        fetch('/user/devotional/new', {
                method: 'PATCH',
                headers : { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: localStorage.getItem('pj_token'),
                    id: this.state.id,
                    text : this.state.devotional,
                    reference : this.state.author,
                    readingUrl: this.state.link,
                    date: this.state.date})})
                        .then((res) => res.json())
                        .then(() => {
                            this.setState({
                                saved: true})})
                        .catch((err) => console.log(err));}

    render() {
        return (
            this.state.render ?
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                
                {this.state.devotional ?
                <CSSTransition
                    in={this.state.devotional != null}
                    appear={true}
                    timeout={100}
                    classNames="fade">
                    <div className="main-content">
                        <div style={isMobile? {height: '10vh'} : {height: '18vh'}}></div>
                            <a 
                                href={this.state.link} 
                                target="_blank" 
                                rel="noopener noreferrer">
                                <h3 
                                    className="devotional-text">
                                    {this.state.devotional}</h3></a>
                            <hr/>
                            <h4 
                                className="devotional-text">
                                {this.state.author}
                            </h4>
                            <br/>
                            
                            {localStorage.getItem('pj_token') ? 
                            !this.state.saved ?
                                <div className="devotional-form-buttons">
                                    <input 
                                        onClick={this.saveDevotional}
                                        type="submit" 
                                        value="Save"/>
                                </div>
                                :
                                <div className="devotional-form-buttons">
                                    <input 
                                        disabled={this.state.saved}
                                        type="submit" 
                                        value="Saved &#10004;"/>
                                </div>:''}
                    </div>
                </CSSTransition>
                : 
                <CSSTransition
                    in={this.state.devotional == null}
                    appear={true}
                    timeout={100}
                    classNames="fade">
                <Loader
                    type="TailSpin"
                    color="#dbdbdb"
                    height={80}
                    width={80}
                    className="loader"/></CSSTransition>}
            </motion.div>
            :
            <Loader
            type="TailSpin"
            color="#dbdbdb"
            height={80}
            width={80}
            className="loader"/>)}}