import React, { Component } from 'react';
import { isMobile } from "react-device-detect";
import './Landing.css';

export default class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            devotional: this.props.devotional,
            date: this.props.date,
            author: this.props.author,
            link: this.props.link
        }
    }

    render() {
        return (
            <div>
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
            </div>)}}