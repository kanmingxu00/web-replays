import React, { Component } from 'react';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //selectedFile: '',
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.updateFile = this.props.updateFile.bind(this);
    }

    onChangeHandler(e) {
        if (e.target.files.length !== 1) {
            console.log("must submit 1 file");
            this.updateFile('');
        } else if (e.target.files.length === 1) {
            console.log(e.target.files[0]);
            this.updateFile(e.target.files[0]);
        }
    }

    render() {
        return (
		<div>
            <input id="fileSelect" type="file" className={this.props.className} name="file" onChange={this.onChangeHandler}/>
			<label class="button" htmlFor="fileSelect">Upload File</label>
        </div>
		);
    }

}