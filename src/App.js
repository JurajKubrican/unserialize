import React, { Component } from 'react';
import Visualizer from './Visualizer.js';
import './App.css';

import lightBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Paper from 'material-ui/Paper';


//import styled from 'styled-components';

import unserialize from  'locutus/php/var/unserialize';
import {parseString} from 'xml2js';



class App extends Component {

  constructor(){
    injectTapEventPlugin();
    const data = {
      one:1,
      two:"two",
      three:[
        'three1',
        'three2',
        'three3'
      ]
    };

    let state = {
      url:'',
      text:JSON.stringify(data),
      data:data,
      curTime:0,
      source:'text',
      format:{
        mode:'auto',
        type:'json'
      }
    }
    super();
    this.state = state;
  }

  fetch(url,method){
    if(!url)
      return;

    fetch(url,{
      method: method,
    })
      .then(function(response) {
        return response.text()
          .then(function(text){
            let state  = this.state;
            state.text = text;
            this.setState(state);
            this.parseText();
          }.bind(this))
      }.bind(this));
  }

  countdown(){
    if(this.state.source !== 'url')
      return;

    let state = this.state;
    if( state.curTime <= 0 ){
      this.fetch(this.state.url,"GET",[]);
      state.curTime = 100;
    }else{
      state.curTime --;
    }
    this.setState(state);
  }

  componentDidMount() {
    setInterval(() => {
      this.countdown()
    }, 50);
  }


  setVal(name,value){
    let state = this.state;
    state[name] = value;
    this.setState(state);
  }

  setUrl(e){
    let state = this.state;
    state.url = e.target.value;
    state.source = 'url';
    this.setState(state);
  }

  setText(e){
    let state = this.state;
    state.text = e.target.value;
    state.source = 'text';
    this.setState(state);
    this.parseText();
  }

  parseText(){
    let state = this.state;

    if(state.format.mode === 'auto'){
      try{
        state.data = JSON.parse(state.text);
        state.format.type ='json';
      }catch(e){
        try{
          state.data = unserialize(state.text);
          state.format.type ='php';
        }catch(e){
          parseString(state.text, function (err, result) {
            state.data = result;
          });
          state.format.type ='xml';
        }
      }

    }else{
      try{
        switch(state.format.type){
          case'json':
            state.data = JSON.parse(state.text);
            break;
          case'php':
            state.data = unserialize(state.text);
            break;
          case'xml':
            parseString(state.text, function (err, result) {
              state.data = result;
            });
            break;
          default:
            state.data = false;
            break;
        }
      }catch(e){
        state.data = false;
      }
    }

    this.setState(state);
  }


  render() {

    let input = false;
    if(this.state.source === 'text'){
      input = (<formgroup>
        <Paper>
          <textarea name="text" id="text" cols="30" rows="10"  onChange={(e) => {this.setText(e)}} value={this.state.text}/>
        </Paper>
      </formgroup>);
    }else{
      input = ( <formgroup>
        <label htmlFor="url">URL</label>
        <input type="text" name="url" value={this.state.url} onChange={(e) => {this.setUrl(e)}} id="url"/>
        <span>{this.state.curTime / 10}</span>
      </formgroup>);
    }


    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Paper>
          <div>
            <RaisedButton key="0" primary={this.state.source==='text'} label="Text"  onTouchTap={()=>{this.setVal('source','text')}} />
            <RaisedButton key="1" primary={this.state.source==='url'}  label="URL" onTouchTap={()=>{this.setVal('source','url')}} />
            {input}
            <RaisedButton key="2" primary={this.state.format.mode==='auto'} label="JSON"  onTouchTap={()=>{this.setVal('format',{mode:'auto',type:'json'})}} />
            <RaisedButton key="3" secondary={this.state.format.type==='json'} label="JSON"  onTouchTap={()=>{this.setVal('format',{mode:'manu',type:'json'})}} />
            <RaisedButton key="4" secondary={this.state.format.type==='php'}  label="PHP" onTouchTap={()=>{this.setVal('format',{mode:'manu',type:'php'})}} />
            <RaisedButton key="5" secondary={this.state.format.type==='xml'} label="XML"  onTouchTap={()=>{this.setVal('format',{mode:'manu',type:'xml'})}} />

            <Visualizer data={this.state.data}/>
          </div>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default App;
