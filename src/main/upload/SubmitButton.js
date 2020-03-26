import React, { Component } from 'react';
import './SubmitButton.scss';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchstate: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.onPress = this.props.onPress.bind(this);
        this.buttonText = this.props.buttonText;
    }
    
    handleClick() {
        this.onPress();
    }

    render() {
        return (
            <div>
                {true ? 
                <button className={this.props.className} onClick={this.handleClick}>
                    {this.buttonText}
                </button> :
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />}
            </div>
        );
    }

}