import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './DevotionalCard.css';

export default class DevotionalCard extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            text: this.props.text,
            reference: this.props.reference,
            readingUrl: this.props.readingUrl,
            date: this.props.date,
            note: this.props.note,
            id: this.props.id,
            userId: this.props.userId}}

    render() {
        return (
            <Link 
                to={"/devotionals/find/" + this.state.id}
                className="devotional-card">
                <span>
                    <b>"{this.state.text}"</b>
                    {this.state.reference}
                    <i>
                        {this.state.date.substring(0,10).split('-')[2]}/
                        {this.state.date.substring(0,10).split('-')[1]}/
                        {this.state.date.substring(0,10).split('-')[0]}
                    </i>
                </span>
            </Link>)}}