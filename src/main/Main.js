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
        }
        this.onPress = this.onPress.bind(this);
        this.updateText = this.updateText.bind(this);
    }

    renderInner() {
        return this.state.switchstate ? <Replay onPress={this.onPressReplay} text={this.state.text} /> : <Upload onPress={this.onPress} updateText={this.updateText} />
    }

    onPressReplay = () => this.setState({ switchstate: false });

    onPress = (text) => {
        console.log(text)
        this.setState({
            switchstate: true,
        });
    };
    
    updateText = (matchid) => this.setState({ text: matchid });

    render() {
        return (
            <div> 
                {this.renderInner()}
            </div>  
        )
    }
}