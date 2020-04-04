import React, { Component } from 'react';
import './Upload.scss';
import TextBox from './TextBox.js';
import SubmitButton from './SubmitButton.js';
import Dropzone from './Dropzone.js';
import UploadButton from './UploadButton.js';
import StandardButton from '../StandardButton.js';

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


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

        this.updateText = this.props.updateText.bind(this);
        this.updateFile = this.props.updateFile.bind(this);

        this.getSubmitButtonText = this.getSubmitButtonText.bind(this);
    }

    componentDidMount() {
        let pathname = window.location.pathname;
        pathname = pathname.replace('/', ''); //Filter slashes from url
        if (pathname !== '') {
            this.updateText(pathname);

            this.onPress(pathname);
        }
        
    }

    componentWillReceiveProps(props) {
        console.log('props updated------------');
        //this.props = props;

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

    /*
        Match id validation
            - Check if it's a valid integer, let download service throw other errors?
            - There's more to it, but thats backend.
    */
    onPress(url) {
        if (url != null) { //Existence of url should override file
            if (!this.isValidInteger(url)) {
                this.setState({ errorLabel: 'Invalid match id!' });
                return;
            }
        }
        else if (this.props.selectedFile !== '') { //Selected file exists 
            if (!this.isValidDem(this.props.selectedFile)) {
                this.setState({ errorLabel: 'Demo file invalid!', });
                return;
            }
        } else if (this.props.text !== '') { //Text exists inside TextBox
            if (!this.isValidInteger(this.props.text)) {
                this.setState({ errorLabel: 'Please enter a valid match id!' });
                return;
            }
            
        } else { //Neither
            this.setState({ errorLabel: 'Please enter a match id or upload a file!' });
            return;
        }
        this.setState({
            loading: true,
        })
        this.callServer().then(this.onP)
    }

    isValidInteger(id) {
        return !isNaN(id);
    }

    isValidDem(file) {
        //File extension validation
        let splitName = file.name.split(".");
        if (splitName.length === 1 || (splitName[0] === "" && splitName.length === 2)) {
            return false;
        } else if (splitName.pop() === 'dem') {
            return true;
        }
    }

    getSubmitButtonText() {
        console.log('get button text is called');
        return 'Watch ' + (this.props.selectedFile !== '' ? this.props.selectedFile.name : this.props.text);
    }

    //TODO: george
    //show the 'x' button only when a file is selected.
    render() {
        //Old submit button: 
        //<SubmitButton className="SubmitReplay" loading={this.state.loading} onPress={this.onPress} text={this.props.text} selectedFile={this.props.selectedFile}/>

        return (
            <Dropzone updateFile={this.updateFile} styleZone="Dropzone" styleBorder="DropzoneBorder" styleCenter="DropzoneCenter" >
                <div>
                    <div>
                        <label> {this.state.errorLabel}</label>
                    </div>
                    <div>
                        <div className="Rows">
                            <div>
                                <TextBox
                                    className="IdSelect"
                                    updateText={this.updateText}
                                />
                            </div>
                            <div>
                                <UploadButton
                                    className={"FileSelect"}
                                    updateFile={this.updateFile}
                                />
                                <StandardButton
                                    className={"ClearButton"}
                                    function={this.updateFile}
                                    funcParam={''}
                                    buttonText={'Cancel selected'}
                                />
                            </div>
                        </div>

                    </div>
                    <div>
                        {!this.state.loading ?
                            <StandardButton
                                function={this.onPress}
                                buttonText={this.getSubmitButtonText}
                                className="SubmitReplay"
                            /> :
                            <Loader
                                type="TailSpin"
                                color="#00BFFF"
                                height={100}
                                width={100}
                                timeout={0} //3 secs
                            />}
                    </div>
                </div>
            </Dropzone>
        );
    }
}