//import React from 'react';
//import ReactDOM from 'react-dom';

const React = require('react');
const ReactDOM = require('react-dom');

class Window() extends from React.component {
  render() {
    return (
      <h1>React Component</h1>
    );
  }
}

const app = document.getElementById('app');

ReactDOM.render(<Window/>, app);
