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
            loading: false,
        };
        this.onPress = this.onPress.bind(this)
        this.onP = this.onP.bind(this)
        this.updateText = this.props.updateText;
        this.updateFile = this.props.updateFile;
    }

    async callServer() {
        let fakeAPI = new Promise((resolve, reject) => {
            setTimeout(() => resolve(this.props.text), 1000)
        })
        let result = await fakeAPI;

        return Promise.resolve(result)
    }

    onP(event) {
        this.setState({
            loading: false,
        })
        this.props.onPress(event)
    }

    onPress() {
        this.setState({
            loading: true,
        })
        this.callServer().then(this.onP)
    }
    
    render() {
        return (
            <div>
                <div>
                    <TextBox className="IdSelect" updateText={this.updateText} />
                    <UploadButton className="FileSelect" updateFile={this.updateFile}/>
                </div>
                <div>
                    <SubmitButton className="SubmitReplay" loading={this.state.loading} onPress={this.onPress} buttonText={'Submit'} />
                </div>
            </div>
        );
    }
}