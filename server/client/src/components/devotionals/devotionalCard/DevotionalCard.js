import React, { Component } from 'react'

export default class DevotionalCard extends Component {
    render() {
        return (
            <a 
                href={"/prayers/" + this.state.id}
                className="prayer-card">
                <span>
                    <b>Devotional</b>
                    <i>Note/s</i>
                </span>
            </a>)}}