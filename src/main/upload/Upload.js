import React, { Component } from 'react';
import './Upload.scss';
import TextBox from './TextBox.js';
import SubmitButton from './SubmitButton.js';
import UploadButton from './UploadButton.js';

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selector: false,
        };
        this.onPress = this.props.onPress;
        this.updateText = this.props.updateText;
    }

    render() {
        return (
            <div>
                <div>
                    <TextBox className="IdSelect" updateText={this.updateText} />
                    <UploadButton className="FileSelect"/>
                </div>
                <div>
                    <SubmitButton onPress={this.onPress} buttonText={'Submit'}/>
                </div>
            </div>
        );
    }
}