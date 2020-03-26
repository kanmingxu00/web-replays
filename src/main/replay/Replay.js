import React, { Component } from 'react';
import BackButton from './BackButton.js';
import './Replay.scss';


export default class Replay extends Component {
    constructor(props) {
        super(props);
        this.text = this.props.text;
        this.onPress = this.props.onPress;

    }

    render() {
        return (
            <div>
                <BackButton onPress={this.onPress} buttonText={'Back'}/>
                Replay id: {this.text}
            </div>
        )
    }
}