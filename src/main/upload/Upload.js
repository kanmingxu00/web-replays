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
        this.onPress = this.onPress.bind(this)
        this.updateText = this.props.updateText;
    }

    async callServer() {
        let fakeAPI = new Promise(() => {
            setTimeout(() => "nice", 3000)
        })
        
        let result = await fakeAPI;

        return Promise.resolve(result)
    }

    onPress() {
        onP = this.props.onPress;
        this.callServer().then(onP)
    }
    
    render() {
        return (
            <div>
                <div>
                    <TextBox className="IdSelect" updateText={this.updateText} />
                    <UploadButton className="FileSelect" />
                </div>
                <div>
                    <SubmitButton onPress={this.onPress} buttonText={'Submit'}>
                    </SubmitButton>
                </div>
            </div>
        );
    }
}