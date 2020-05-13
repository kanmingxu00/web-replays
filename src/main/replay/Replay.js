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
        this.windowWidth = this.props.windowWidth;
        this.windowHeight = this.props.windowHeight;
        //this crashes lol!
        //document.documentElement.requestFullscreen();
        
    }

    componentWillReceiveProps(nextProps) {
        this.windowWidth = nextProps.windowWidth;
        this.windowHeight = nextProps.windowHeight;
        
    }


    render() {
        //old button: <BackButton onPress={this.onPress} buttonText={'Back'}/>
        return (

            <div>
                <div>
                    <StandardButton className="BackButton" function={this.onPress} buttonText={'<-'} />
                </div>
                <div className="DotaRenderContainer">
                    <DotaRender windowWidth={this.windowWidth} windowHeight={this.windowHeight}/>
                </div>
                
                <div className="MiniMapContainer">
                    <MinimapContainer length={this.windowHeight / 1080 * 280} />
                </div>
            </div>
        )
    }
}