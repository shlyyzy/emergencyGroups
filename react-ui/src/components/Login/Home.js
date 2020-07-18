import React, { Component } from 'react';
import Form from './Form';
import './Home.css';

export default class Home extends Component {
    
    render() {
        
        return (
            <div className="home">
                <div className="vertical">
                    <h1>Hi, welcome to emergencyGroups</h1>
                    <p>Create a group to start</p>
                    <div className="spacer-1"></div>
                    <Form></Form>                    
                </div>
            </div>
        )
    }
}