import React, { Component } from 'react';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: '',
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(e) {
        if (e.target.files.length != 1) {
            console.log("must submit 1 file");
        }
        console.log(e.target.files[0]);
    }

    render() {
        return (
            <input type="file" className={this.props.className} name="file" onChange={this.onChangeHandler}/>
        );
    }

}