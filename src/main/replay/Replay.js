import React, { Component } from 'react';
import './Replay.css';

export default class Replay extends Component {
    constructor(props) {
        super(props);
        this.text = this.props.text;
    }
    render() {
        return (
            <div>
                Replay id: {this.text}
            </div>
        )
    }
}