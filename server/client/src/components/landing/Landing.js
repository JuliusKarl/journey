import React, { Component } from 'react';
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
                    <div style={{height: '15vh'}}></div>
                    <a 
                    href={this.state.link} 
                    target="_blank">
                        <h3>{this.state.devotional}</h3>
                    </a>
                    <hr/>
                    <h4>{this.state.author}</h4>
                </div>
            </div>)}}