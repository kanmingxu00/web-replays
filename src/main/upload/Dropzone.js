import React, { Component } from 'react'

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dragging: false,
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.updateFile = this.props.updateFile.bind(this);
    }

    onChangeHandler(e) {
        if (e.length !== 1) {
            this.updateFile('');
        } else if (e.length === 1) {
            //console.log(e[0]);
            this.updateFile(e[0]);
        }
    }

    dropRef = React.createRef()

    handleDrag = (event) => {
        event.preventDefault();
        event.stopPropagation();

    }

    handleDragIn = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.dragCounter++;
        if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
            this.setState({ dragging: true, });
        }
    }

    handleDragOut = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.dragCounter--;
        if (this.dragCounter <= 0) { 
            this.setState({ dragging: false, });
        }
    }

    handleDrop = (event) => {    
        event.preventDefault();
        event.stopPropagation();
        this.setState({ dragging: false, })
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
          this.onChangeHandler(event.dataTransfer.files)
          event.dataTransfer.clearData()
          this.dragCounter = 0
        }
    }

    componentDidMount() {
        let div = this.dropRef.current;
        div.addEventListener('dragenter', this.handleDragIn);
        div.addEventListener('dragleave', this.handleDragOut);
        div.addEventListener('dragover', this.handleDrag);
        div.addEventListener('drop', this.handleDrop);
    }

    componentWillUnmount() {
        this.dragCounter = 0

        let div = this.dropRef.current;
        div.removeEventListener('dragenter', this.handleDragIn);
        div.removeEventListener('dragleave', this.handleDragOut);
        div.removeEventListener('dragover', this.handleDrag);
        div.removeEventListener('drop', this.handleDrop);
    }


    render() {
        return(
            <div 
                ref={this.dropRef}
                className={this.props.style}
            >
                {this.state.dragging &&
                <div className={this.props.styleBorder}>
                    <div className={this.props.styleCenter}>
                        <div> Drop File </div>
                    </div>
                </div>
            }
            {this.props.children}
            </div>
        );

    }

}