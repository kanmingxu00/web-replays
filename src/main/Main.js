import React, { Component } from 'react';
// import './Main.css';
import Upload from './upload/Upload.js'
import Replay from './replay/Replay.js'
import SwitchButton from './SwitchButton.js'

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchstate: false,
        }
        this.onPress = this.onPress.bind(this)
    }

    onPress() {
        this.setState({
            switchstate: true
        })
    }

    renderInner() {
        return this.state.switchstate ? <Replay /> : <Upload />
    }

    render() {
        return (
            <div>
                <SwitchButton onPress={this.onPress} /> 
                {this.renderInner()}
            </div>
            
        )
    }
}