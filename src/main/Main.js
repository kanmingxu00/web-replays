import React, { Component } from 'react';
// import './Main.css';
import Upload from './upload/Upload.js'
import Replay from './replay/Replay.js'

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchstate: false,
            text: '',
            selectedFile: '',
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
            gameData: [],
        }
        this.onPress = this.onPress.bind(this);
        this.updateText = this.updateText.bind(this);
        this.updateFile = this.updateFile.bind(this);
        this.replayFile = [];
        this.reportWindowSize = this.reportWindowSize.bind(this);
        this.timeoutHandle = null;
        //this.ref = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('resize', this.reportWindowSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.reportWindowSize)
    }

    addFileData = (key, value) => {
        if (!this.replayFile[key]) {
            this.replayFile[key] = [];
        }
        this.replayFile[key].push(value);
    };

    allDataReceived = () => {
        console.log("Starting replay");
        console.log(this.replayFile);
        console.log(this.replayFile[46587])
    };

    reportWindowSize = () => {
        if (this.state.switchstate) {
            if (this.timeoutHandle) {
                window.clearTimeout(this.timeoutHandle);
            }
            this.timeoutHandle = window.setTimeout(() => {
                if (window.innerHeight !== this.state.windowHeight) {
                    console.log("this is epic height");
                    this.setState({
                        windowHeight: window.innerHeight,
                    });
                }
                if (window.innerWidth !== this.state.windowWidth) {
                    this.setState({
                        windowWidth: window.innerWidth,
                    });
                }
            }, 400);
        }
    }

    handleDragIn(event) {
        event.preventDefault();
        event.stopPropagation();
    }


    onPress = () => {
        // this.updateText(file);
        this.setState({
            switchstate: true
        });
        //set url to match id.
        //window.history.replaceState(null, "Web Replays", "/" + this.state.text);
        window.location.hash = this.state.text;
    }


    onPressReplay = () => {
        this.updateText('');
        this.updateFile('');
        this.setState({ switchstate: false });
        //clear the match id in the url, because it will keep trying to load it
        //window.history.replaceState(null, "Web Replays", "/");
        window.location.hash = '';
    }

    updateText = (matchid) => this.setState({ text: matchid });

    updateFile(file) {
        this.setState({
            selectedFile: file,
        });
    }

    renderInner() {
        console.log(this.state.windowHeight);
        return (
            <div>
                <div>
                    {this.state.switchstate ?
                        <Replay
                            onPress={this.onPressReplay}
                            text={this.state.text}
                            windowWidth={this.state.windowWidth}
                            windowHeight={this.state.windowHeight}
                            gameData={this.state.gameData}
                            replayFile={this.state.replayFile}
                        /> :
                        <Upload
                            onPress={this.onPress}
                            text={this.state.text}
                            selectedFile={this.state.selectedFile}
                            updateText={this.updateText}
                            updateFile={this.updateFile}
                            addFileData={this.addFileData}
                            allDataReceived={this.allDataReceived}
                        />}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderInner()}
            </div>
        )
    }
}
