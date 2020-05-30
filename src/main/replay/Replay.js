import React, { Component } from 'react';
import './Replay.scss';
import StandardButton from '../StandardButton.js';
import MinimapContainer from './MinimapContainer';
import DotaRender from './DotaRender';
import HorizontalScroll from './HorizontalScroll';


export default class Replay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tick: 0,
        }
        this.text = this.props.text;
        this.onPress = this.props.onPress;
        this.windowWidth = this.props.windowWidth;
        this.windowHeight = this.props.windowHeight;
        this.gameData = this.props.gameData;
        this.replayData = this.props.replayData;
        //this crashes lol!
        //document.documentElement.requestFullscreen();
        
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ tick: this.state + 1 }), 1000/30);
    }

    componentWillReceiveProps(nextProps) {
        this.windowWidth = nextProps.windowWidth;
        this.windowHeight = nextProps.windowHeight;
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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
                <HorizontalScroll windowWidth={this.windowWidth} windowHeight={this.windowHeight} />
                <div className="MiniMapContainer">
                    <MinimapContainer length={this.windowHeight / 1080 * 280} />
                </div>
            </div>
        )
    }
}