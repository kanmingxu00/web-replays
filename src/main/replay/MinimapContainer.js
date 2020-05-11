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

    render() {
        console.log(this.length);
        const minimapStyle = {
            width: this.length,
            height: this.length,
            backgroundColor: 'white',
            color: 'white',
        };
        return (
            <div style={minimapStyle}> 
                <button />
            </div>
        )
    }

}