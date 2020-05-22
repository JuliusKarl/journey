import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './PrayerCard.css';

export default class prayerCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: this.props.userId,
            id: this.props.id,
            title: this.props.title,
            body: this.props.body}}

    render() {
        return (
            <Link 
                to={"prayers/find/" + this.state.id}
                className="prayer-card">
                <span>
                    <b>{this.state.title}</b>
                    <i>{this.state.body ? this.state.body : <br></br>}</i>
                </span>
            </Link>)}}
