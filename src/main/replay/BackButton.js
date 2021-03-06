import React, { Component } from 'react';
import './BackButton.scss'

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchstate: false,
        }
        this.handleClick = this.handleClick.bind(this)
        this.onPress = this.props.onPress.bind(this)
        this.buttonText = this.props.buttonText;

    }

    handleClick() {
        this.onPress();
        
    }


    render() {
        return (
            <button className="BackButton" onClick={this.handleClick}>
                {this.buttonText}
            </button>
        )
    }
}