import React, { Component } from 'react';

export default class StandardButton extends Component {


    //Prop inputs: function, funcParam, buttonText, className
    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleClick = this.handleClick.bind(this);
        this.function = this.props.function.bind(this);

        //bind buttonText because it could be a function.
        //is using typeof bad? idk
        if (typeof buttonText === 'function') {
            this.buttonText = this.props.buttonText.bind(this);
        } else {
            this.buttonText = this.props.buttonText;
        }
    }


    handleClick() {
        this.function(this.props.funcParam);
    }


    render() {
        return (
            <button className={this.props.className} onClick={this.handleClick}>
                {typeof this.props.buttonText === 'function' ? this.buttonText() : this.buttonText}
            </button>
        )
    }
}