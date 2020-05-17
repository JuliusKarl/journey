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
            newPrayer: false}
        this.newPrayer = this.newPrayer.bind(this)}

    componentDidMount() {
        /** User Logged In ? Load Data : Redirect Login */
        if (!localStorage.getItem('pj_token')) {
            this.props.history.push('/login');}
            
        /** Get prayer list */
        this._isMounted = true;
        fetch('/prayers')
            .then(response => response.json())
            .then(response => {})}

    componentWillUnmount() {
        this._isMounted = false;}
    
    newPrayer() {
        this.setState({
            newPrayer: !this.state.newPrayer})
            console.log(this.state)}

    render() {
        return (
            <div className="main">
                {!isMobile ?
                <div className="browser">
                    {this.state.newPrayer ?
                    <div className="new-prayer">
                        <form>
                            <span><i 
                                class="large material-icons"
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
                                <button>Add</button>
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
