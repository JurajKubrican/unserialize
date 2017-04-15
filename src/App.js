import React, { Component } from 'react';
import Visualizer from './Visualizer.js'
import './App.css';

class App extends Component {
  render() {
    let data = {
      one:1,
      two:"two",
      three:[
        'three1',
        'three2',
        'three3'
      ]
    };
    return (
      <Visualizer data={data}/>
    );
  }
}

export default App;
