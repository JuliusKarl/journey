import React, { Component } from 'react'

export default class prayerCard extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <button key={this.props.i}><b>{this.props.title}</b><hr/>{this.props.body}</button>
            </div>)}}
