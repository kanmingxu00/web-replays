import React, { Component } from 'react';
import './Replay.scss';
import StandardButton from '../StandardButton.js';
import MinimapContainer from './MinimapContainer';
import DotaRender from './DotaRender';


export default class Replay extends Component {
    constructor(props) {
        super(props);
        this.text = this.props.text;
        this.onPress = this.props.onPress;
        this.windowHeight = this.props.windowHeight;
    }

    

    render() {
        //old button: <BackButton onPress={this.onPress} buttonText={'Back'}/>
        return (

            <div>
                <div>
                    <StandardButton className="BackButton" function={this.onPress} buttonText={'Back'} />
                    Replay id: {this.text}
                </div>
                <DotaRender />
                <div className="MiniMapContainer">
                    <MinimapContainer length={this.windowHeight/3} />
                </div>
            </div>
        )
    }
}