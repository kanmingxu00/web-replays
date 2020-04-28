import React, { Component } from 'react';


export default class Canvas extends Component{

    render() {
        return (
            <canvas ref="canvas" id="myCanvas" width="480" height="320"/>
        )
    }
}