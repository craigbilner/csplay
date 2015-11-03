import React, { Component } from 'react';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colour: 'red'
    };
  }

  changeMyColour() {
    this.setState({
      colour: `#${(~~(Math.random() * (1 << 24))).toString(16)}`
    });
  }

  render() {
    return (
      <div style={{color: this.state.colour}}>
        <span>Hello world!</span>
        <button onClick={this.changeMyColour.bind(this)}>change my colour</button>
      </div>
    );
  }
}
