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
        this.updateText(event.target.value);
    }

    render() {
        return(
            <label>
                <input
                    type="text" 
                    className={this.props.className} 
                    value={this.state.value} 
                    onChange={this.handleChange}
                    placeholder="Match ID"
                />
                
            </label>
          
        )

    }


}