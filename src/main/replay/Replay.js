import React, { Component } from 'react';
import BackButton from './BackButton.js';
import './Replay.scss';
import StandardButton from '../StandardButton.js';


export default class Replay extends Component {
    constructor(props) {
        super(props);
        this.text = this.props.text;
        this.onPress = this.props.onPress;

    }

    render() {
        //old button: <BackButton onPress={this.onPress} buttonText={'Back'}/>
        return (
            <div>
                <br/>
                <StandardButton className="BackButton" function={this.onPress} buttonText={'Back'} />
                Replay id: {this.text}
            </div>
        )
    }
}