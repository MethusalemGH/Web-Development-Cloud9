import React, { Component } from 'react';
import './Hello.css';
console.assert(React);


class Hello extends Component {
  render() {
    return (
      <div className='f2 tc'>
        <h1>{this.props.greeting}</h1>
        <p><i className='fa fa-angellist'></i>{this.props.welcome}<i className='fa fa-angellist'></i></p>
      </div>
    );
  }
}

export default Hello;
