import React, { Component } from 'react';
import './PrayerCard.css';

export default class prayerCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            title: this.props.title,
            body: this.props.body}}

    render() {
        return (
            <div className="prayer-card">
                <button key={this.props.i}><b>{this.props.title}</b></button>
            </div>)}}
