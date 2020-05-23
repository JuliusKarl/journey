import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Carousel from '@brainhubeu/react-carousel';
import { motion } from 'framer-motion';
import "./Carousel.css";
import '@brainhubeu/react-carousel/lib/style.css';

export default class CarouselView extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            savedPrayers: []}}

    componentDidMount() {
        fetch('/user/find', {
            method: 'POST',
            headers : { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: localStorage.getItem('pj_token')})})
                .then(response => response.json())
                .then(data => {
                    if (this._isMounted) {
                        this.setState({
                            savedPrayers: data.savedPrayers,
                            render: true});}})}

    componentWillUnmount() {
        this._isMounted = false;}

    render() {
        return (
            <motion.div 
                className="main-carousel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <div className="top-spacer">
                    <i className="material-icons close-button"><Link to={'/prayers/'}>close</Link></i>
                </div>
                    <Carousel arrows dots>
                        i
                        {this.state.savedPrayers.map((item, i) => {
                            return <div key={i}>
                                <b>item.title</b>
                                <p>item.body</p>
                            </div>})}
                    </Carousel>
            </motion.div>)}}
