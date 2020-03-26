import React, { Component } from 'react';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
        this.handleChange = this.handleChange.bind(this)
        this.updateText = this.props.updateText.bind(this)

    }

    handleChange(event) {
        this.setState({text: event.target.value});
        this.updateText(event.target.value);

    }

    render() {
        return(
            <label>
              Match id:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
          
        )

    }


}