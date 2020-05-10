import React, { Component } from 'react';
import './Minimap.scss';

export default class Minimap extends Component {
    constructor(props) {
        super(props);
        this.windowHeight = this.props.windowHeight;

        this.minimapStyle = {
            width: this.windowHeight,
            height: this.windowHeight,
            backgroundColor: 'white'
        };
    }



    render() {
        return (

            <div style={this.minimapStyle}> </div>
        )
    }

}