import React, { Component } from 'react';
import './Upload.css';
import TextBox from './TextBox.js';
import UploadButton from './UploadButton.js';

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.onPress = this.props.onPress;
        this.updateText = this.props.updateText;
    }

    render() {
        return (
            <div>
                <TextBox onPress={this.onPress} updateText={this.updateText} />
                
                Upload
            </div>
        )
    }
}