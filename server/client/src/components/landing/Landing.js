import React, { Component } from 'react';
import { isMobile } from "react-device-detect";
import { motion } from 'framer-motion';
import Loader from 'react-loader-spinner';
import { CSSTransition } from 'react-transition-group';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './Landing.css';

export default class Landing extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            devotional: "",
            date: "",
            author: "",
            link: ""}}
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
                link: devotional.readingUrl})}})}

    componentWillUnmount() {
        this._isMounted = false;}

    render() {
        return (
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
                        <div style={isMobile? {height: '10vh'} : {height: '17vh'}}></div>
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
                                {this.state.author}</h4>
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
            </motion.div>)}}