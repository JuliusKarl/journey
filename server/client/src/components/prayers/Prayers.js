import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { isMobile } from "react-device-detect";
import './Prayers.css';
import '../../index.css';

class Prayers extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            savedDevotionals: [],
            savedPrayers: [],
            answeredPrayers: [],
            newPrayer: false}
        this.newPrayer = this.newPrayer.bind(this)}

    componentDidMount() {
        /** User Logged In ? Load Data : Redirect Login */
        if (!localStorage.getItem('pj_token')) {
            this.props.history.push('/login');}
            
        /** Get prayer list */
        this._isMounted = true;
        fetch('/user/find', {
            method: 'POST',
            headers : { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: localStorage.getItem('pj_token')})})
                .then(response => response.json())}

    componentWillUnmount() {
        this._isMounted = false;}
    
    newPrayer() {
        this.setState({
            newPrayer: !this.state.newPrayer})}

    render() {
        return (
            <div className="main">
                {!isMobile ?
                <div className="browser">
                    {this.state.newPrayer ?
                    <div className="new-prayer">
                        <form>
                            <span><i 
                                className="large material-icons"
                                onClick={this.newPrayer}>close</i></span>
                            <div className="form-header">New Prayer</div>
                            <input 
                                type="text" 
                                name="title"
                                placeholder="Title" />
                            <input 
                                type="text" 
                                name="body"
                                className="prayer-body"
                                placeholder="Prayer" />
                            <div className="form-buttons">
                                <input type="submit" value="Add"/>
                            </div>
                        </form>
                    </div>
                    :
                    <div>
                        <div className="toolbar">
                            <input 
                                className="search" 
                                type="text" 
                                placeholder="Search prayer..."/>
                            <button>Pray now</button>
                            <button onClick={this.newPrayer}>Add prayer</button>
                        </div>
                        <hr />
                        <div className="prayer-list">
                           {this.state.savedPrayers.length > 0 ? this.state.savedPrayers : 'No Prayers'}
                            {/* fetch prayers from user else display 'no prayers' */}
                        </div>
                    </div>}
                </div>
                :
                <div className="mobile">
                    <button>Pray now (Mobile)</button>
                    <button>Add prayer (Mobile)</button>
                </div>}
                
            </div>)}}

export default withRouter(Prayers);
