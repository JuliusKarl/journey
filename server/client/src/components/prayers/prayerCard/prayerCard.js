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
            body: this.props.body}
    this.removePrayer = this.removePrayer.bind(this);}

    removePrayer() {
        fetch('/user/prayer/remove/' + this.state.userId, {
                method: 'PATCH',
                headers : { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: this.state.id})})
                        .then((res) => res.json())
                        .then(() => {
                            window.location.reload(true);})
                        .catch((err) => console.log(err));}

    render() {
        return (
            <Link 
                to={{ pathname: '/prayers/find', query: { id: this.state.id } }}
                className="prayer-card">
                <span>
                    <b>{this.state.title}</b>
                    <i>{this.state.body ? this.state.body : <br></br>}</i>
                </span>
            </Link>)}}
