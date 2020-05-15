import React, { Component } from 'react';
import { isMobile } from "react-device-detect";
import { motion } from 'framer-motion';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './Landing.css';

export default class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            devotional: "",
            date: "",
            author: "",
            link: "",}}
    componentDidMount() {
        /** Get devotional from server */
        fetch('/devotional')
        .then(response => response.json())
        .then(response => {
            const devotional = response["1"];
            this.setState({
                devotional: devotional.text,
                date: response.date,
                author: devotional.reference,
                link: devotional.readingUrl})})}

    render() {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                
                {this.state.devotional ?
                    <div className="main-content">
                        <div style={isMobile? {height: '10vh'} : {height: '15vh'}}></div>
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
                    : 
                    <Loader
                        type="TailSpin"
                        color="#dbdbdb"
                        height={80}
                        width={80}
                        className="loader"/>}
            </motion.div>)}}