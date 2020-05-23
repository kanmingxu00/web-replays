import React, { Component } from 'react';
import './MinimapContainer.scss';

export default class Minimap extends Component {
    constructor(props) {
        super(props);
        this.length = this.props.length;
    }

    componentWillReceiveProps(nextProps) {
        this.length = nextProps.length;
    }


    //Border is 1/27th the width of the minimap.

    render() {
        console.log(this.length);
        const minimapStyle = {
            width: this.length,
            height: this.length,
            backgroundColor: 'LightSlateGray',
        };
        return (
            
            <div style={minimapStyle}> 
                <div className="MiniMap" />
            </div>
        )
    }

}