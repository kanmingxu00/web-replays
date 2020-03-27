import React, { Component } from 'react';
import './Upload.scss';
import TextBox from './TextBox.js';
import SubmitButton from './SubmitButton.js';
import UploadButton from './UploadButton.js';
import Dropzone from './Dropzone.js';

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selector: false,
            loading: false,
            errorLabel: '',
            
        };
        this.onPress = this.onPress.bind(this);
        this.onP = this.onP.bind(this);
        
        this.updateText = this.props.updateText;
        this.updateFile = this.props.updateFile;
    }

    componentDidMount() {
        
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

    /*TODO: george
        File type validation
            - Check file extension and file header?
        Match id validation
            - Check if it's a valid integer, let download service throw other errors?
    */
    onPress() {
        if (this.props.selectedFile !== '') { //Selected file exists 
            if (!this.isValidDem(this.props.selectedFile)) {
                this.setState({errorLabel: 'Demo file invalid!',});
                return;
            }

        } else if (this.props.text !== '') { //Text exists inside TextBox
            if (!this.isValidInteger(this.props.text)) {
                this.setState({errorLabel: 'Please enter a valid match id!'});
                return;
            }
        } else { //Neither
            this.setState({errorLabel: 'Please enter a match id or upload a file!'});
            return;
        }

        this.setState({
            loading: true,
        })
        this.callServer().then(this.onP)
    }

    isValidInteger(id){
        return !isNaN(id);
    }

    isValidDem(file) {
        //File extension validation
        let splitName = file.name.split(".");
        if( splitName.length === 1 || ( splitName[0] === "" && splitName.length === 2 ) ) {
            return false;
        } else if (splitName.pop() === 'dem') {
            return true;
        }
    }
    
    render() {
        return (
            <div>
                <div>
                    <label> {this.state.errorLabel}</label>
                </div>
                <div>
                    <TextBox className="IdSelect" updateText={this.updateText} />
                    <Dropzone updateFile={this.updateFile} styleBorder="DropzoneBorder" styleCenter="DropzoneCenter"> 
                        <div>
                            <UploadButton className="FileSelect" updateFile={this.updateFile}/>
                        </div>
                    </Dropzone>
                </div>
                <div>
                    <SubmitButton loading={this.state.loading} onPress={this.onPress} text={this.props.text} selectedFile={this.props.selectedFile} />
                </div>
            </div>
        );
    }
}