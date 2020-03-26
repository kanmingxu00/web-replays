import React, { Component } from 'react';
import './SubmitButton.scss';

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
            <button className={this.props.className} onClick={this.handleClick}>
                {this.buttonText}
            </button>
        );

    }

}