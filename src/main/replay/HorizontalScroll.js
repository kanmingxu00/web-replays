import React, { Component } from 'react';
import './HorizontalScroll.scss';


export default class HorizontalScroll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: this.props.windowHeight * 5 / 6,
            left: this.props.windowWidth / 4,
            length: this.props.windowWidth / 2,
            position: 0
        }
        this.text = this.props.text;
        this.onPress = this.props.onPress;
        this.gameData = this.props.gameData;
        this.replayData = this.props.replayData;
        //this crashes lol!
        //document.documentElement.requestFullscreen();
    }

    componentWillReceiveProps(props) {
        this.setState({
            top: this.props.windowHeight * 5 / 6,
            left: this.props.windowWidth / 4,
            length: this.props.windowWidth / 2,
        })
    }

    onBarClick(event) {
        this.setState({
            position: (event.clientX - this.state.left) / this.state.length,
        })
    }

    render() {
        const barStyle = {
            left: this.state.left,
            width: this.state.length,
            top: this.state.top,
        };
        const scrollStyle = {
            left: this.state.left + this.state.position * this.state.length,
            top: this.state.top,
        }
        return (
            <div>
                <div
                    style={barStyle}
                    className="HorizBar"
                    onClick={this.onBarClick}
                />

                <div
                    style={scrollStyle}
                    className="Scroller"
                />
            </div>
        )
    }
}