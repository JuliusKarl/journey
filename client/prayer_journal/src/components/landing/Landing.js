import React, { Component } from 'react';
import './Landing.css';

export default class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            devotional: "",
            date: "",
            author: "",
            link: ""
        }
    }

    componentDidMount() {
        // call devotionalium
        // store devotional in state
        fetch('http://localhost:8080/devotional')
            .then(response => response.json())
            .then(response => {
                const devotional = response["1"];
                this.setState({
                    devotional: devotional.text,
                    date: response.date,
                    author: devotional.reference,
                    link: devotional.readingUrl
                })
            })
    }

    render() {
        return (
            <div>
                <div className="main-content">
                    <div style={{height: '15vh'}}></div>
                    <a 
                        href={this.state.link} 
                        target="_blank">
                            <h2>{this.state.devotional}</h2>
                    </a>
                            <hr/>
                            <h3>{this.state.author}</h3>
                </div>
            </div>)}}