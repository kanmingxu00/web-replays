import React, { Component } from 'react';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchstate: false,
        }
        this.handleClick = this.handleClick.bind(this)
        this.onPress = this.props.onPress
    }

    handleClick() {
        this.onPress()
    }

    render() {
        return (
            <button onClick={this.handleClick} />
        )
    }
}