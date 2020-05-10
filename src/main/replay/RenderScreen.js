import React, { Component } from 'react';
import GetDataArray from '../server/GrpcClient'


export default class Canvas extends Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        const canvas = this.canvasRef;
        const ctx = canvas.getContext("2d");
        let array = GetDataArray();
        //rendering here
    }

    render() {
        return (
            <canvas ref={this.canvasRef} id="myCanvas" width="480" height="320"/>
        )
    }
}