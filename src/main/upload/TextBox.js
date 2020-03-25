import React, { Component } from 'react';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onPress = this.props.onPress.bind(this)
        this.updateText = this.props.updateText.bind(this)

    }

    handleChange(event) {
        this.setState({text: event.target.value});
    }

    handleSubmit(event) {
        this.updateText(this.state.text);
        this.onPress();
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
            <label>
              Match id:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        )

    }


}