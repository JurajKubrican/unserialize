import React, { Component } from 'react';

import styled from 'styled-components';


const Wrapper = styled.table`
 border:1px solid black;
`;

const TypeWrapper = styled.td`
 background:green;
`;


class Visualizer extends Component {
  render() {
    let data = this.props.data;
    let type = typeof(data);
    let components = []
    let key = 0;
    switch(type){
      case 'object':
        for(let i in data) {
          if (!data.hasOwnProperty(i))
            continue;
          components.push(<tr key={key++}><td key="0">{i}</td><td key="1"><Visualizer  data={data[i]} /></td></tr>) ;
        }
        if(data instanceof Array){
          type = 'array';
        }
        return (
          <Wrapper className="Visualizer">
            <tbody>
            <tr><td></td><TypeWrapper>{type}</TypeWrapper></tr>
            {components}
            </tbody>
          </Wrapper>) ;
      case 'string':
      case 'number':
      default:
        return (<span>{data}</span>);
    }

  }
}

export default Visualizer;
