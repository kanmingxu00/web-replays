import React, { Component } from 'react';
import './SubmitButton.scss';
import Loader from 'react-loader-spinner'
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

    getButtonText() {
        return 'Watch ' + (this.props.selectedFile !== '' ? this.props.selectedFile.name : this.props.text);
    }

    render() {
        return (
            <div>
                {!this.props.loading ? 
                <button className={this.props.className} onClick={this.handleClick}>
                    {this.getButtonText()}
                </button> :
                <Loader
                    type="TailSpin"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={0}
                />}
            </div>
        );
    }

}