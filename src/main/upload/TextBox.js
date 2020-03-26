import React, { Component } from 'react';

export default class Main extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(event) {
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