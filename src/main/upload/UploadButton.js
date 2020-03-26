import React, { Component } from 'react';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: ''
        }

    }


    render() {
        return (
            <input type="file" name="file" onChange={this.onChangeHandler}/>
        );

    }

}