import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Carousel from '@brainhubeu/react-carousel';
import { motion } from 'framer-motion';
import Loader from 'react-loader-spinner';
import "./Carousel.css";
import '@brainhubeu/react-carousel/lib/style.css';

export default class CarouselView extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            savedPrayers: []}}

    componentDidMount() {
        this._isMounted = true;
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
                            render: true});}})
                        .then(console.log(this.state))}

    componentWillUnmount() {
        this._isMounted = false;}

    render() {
        return (
            <motion.div 
                className="main-carousel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}>
                    <div className="top-spacer">
                        <i className="material-icons pointer carousel-close">
                            <Link to={'/prayers/'}>close</Link>
                        </i>
                    </div>
                    {this.state.render ?
                        <Carousel arrows dots>
                            {this.state.savedPrayers.map((item, i) => {
                                return <div key={i}>
                                    <b>{item.title}</b>
                                    <p>{item.body}</p>
                                </div>})}
                        </Carousel>
                        :
                        <Loader
                            type="TailSpin"
                            color="#dbdbdb"
                            height={80}
                            width={80}
                            className="carousel-loader"/>}
            </motion.div>)}}
