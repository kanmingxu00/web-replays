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
            replayFile: '',
        }
        this.onPress = this.onPress.bind(this);
        this.updateText = this.updateText.bind(this);
        this.updateFile = this.updateFile.bind(this);

    }

    renderInner() {
        return (
            <div>
                <label> { this.state.selectedFile !== '' ? this.state.selectedFile.name : this.state.text } </label>
                <div>
                    {this.state.switchstate ?
                    <Replay onPress={this.onPressReplay} text={this.state.text} /> : 
                    <Upload onPress={this.onPress} updateText={this.updateText} updateFile={this.updateFile}/> }
                </div> 
            </div>

        )
    }



    onPress = (file) => {
        console.log("is this getting triggered")
        this.updateText(file)
        this.setState({ switchstate: true })
    }

    onPressReplay = () => {
        this.updateText('');
        this.updateFile('');
        this.setState({ switchstate: false });
    }
    
    updateText = (matchid) => this.setState({ text: matchid });

    updateFile(file) {
        this.setState({
            selectedFile: file,
        });
    }

    render() {
        return (
            <div> 
                {this.renderInner()}
            </div>  
        )
    }
}