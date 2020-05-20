import React, { Component } from 'react';
import './PrayerCard.css';

export default class prayerCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: this.props.userId,
            id: this.props.id,
            title: this.props.title,
            body: this.props.body}
    this.removePrayer = this.removePrayer.bind(this);
    this.openPrayer = this.openPrayer.bind(this)}

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
    openPrayer() {
        console.log('prayer is opened');
    }

    render() {
        return (
            <div className="prayer-card">
                <span>
                <i 
                    className="small material-icons close-button"
                    onClick={this.removePrayer}>close</i>
                    <b>{this.state.title}</b>
                    <i>{this.state.body ? this.state.body : <br></br>}</i>
                </span>
            </div>)}}
