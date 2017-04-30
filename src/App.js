import React, { Component } from 'react';
import Visualizer from './Visualizer.js';
import './App.css';

import lightBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TextField from 'material-ui/TextField';
// import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';


//import styled from 'styled-components';

import unserialize from  'locutus/php/var/unserialize';
import {parseString} from 'xml2js';

const style = {
    flexRow:{
        display: 'flex',
        flexDirection: 'row',
    },
    flexCol:{
        display: 'flex',
        flexDirection: 'column',
    },
    button:{
        display: 'block',
        marginBottom: '5px',
        marginRight: '10px',
    },
    panel:{
        minHeight:'60px',
    },
    loader:{
        width:'200px',
        height:'20px',
        position:'relative',
    },
    loaderInside:{
        height:'20px',
        position:'absolute',
        backgroundColor:'red'
    },

}

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
            timer:false,
            source:'text',
            format:{
                mode:'auto',
                type:'json'
            }
        }
        super();
        this.state = state;
    }

    fetchUrl(){
        console.log(this.state.url);


        fetch(this.state.url,{
            method: 'GET',
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


    // countdown(){
    //     if(this.state.source !== 'url')
    //         return;
    //
    //     let state = this.state;
    //     if( state.curTime <= 0 ){
    //         this.fetch(this.state.url,"GET",[]);
    //         state.curTime = 100;
    //     }else{
    //         state.curTime --;
    //     }
    //     this.setState(state);
    // }
    //
    // componentDidMount() {
    //     setInterval(() => {
    //         this.countdown()
    //     }, 50);
    // }


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

    parseText(format){
        let state = this.state;
        if(format){
          state.format = format;
        }

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
                state.data = ['error'];
            }
        }

        this.setState(state);
    }


    render() {

        let input = false;
        if(this.state.source === 'text'){
            input = (<formgroup>
              <textarea name="text" id="text" cols="30" rows="10"  onChange={(e) => {this.setText(e)}} value={this.state.text}/>
            </formgroup>);
        }else{
          // let width = {'width':this.state.curTime + 'px'};
            input = ( <formgroup>
              <TextField hintText="URL" value={this.state.url} onChange={(e) => {this.setUrl(e)}} id="url"/>
              <RaisedButton style={style.button} key="0"  label="Refresh"  onTouchTap={()=>{this.fetchUrl()}} />
              {/*<Toggle label="AutoRefesh" value={this.state.timer} onChange={(val)=>this.setVal('timer',val)}/>*/}
              {/*<div style={style.loader} ><div style={{...style.loaderInside,...width}}> </div></div>*/}

            </formgroup>);
        }


        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
              <div style={style.flexCol}>
                <Paper style={style.flexRow}>
                  <div style={style.flexCol}>
                    <RaisedButton style={style.button} key="0" primary={this.state.source==='text'} label="Text"  onTouchTap={()=>{this.setVal('source','text')}} />
                    <RaisedButton style={style.button} key="1" primary={this.state.source==='url'}  label="URL" onTouchTap={()=>{this.setVal('source','url')}} />
                  </div>
                  <div style={style.panel}>
                      {input}
                  </div>
                </Paper>
                <Paper style={style.flexRow}>
                  <div style={style.flexCol}>
                    <RaisedButton style={style.button} key="2" primary={this.state.format.mode==='auto'} label="AUTO"  onTouchTap={()=>{this.parseText({mode:'auto',type:'json'})}} />
                    <RaisedButton style={style.button} key="3" secondary={this.state.format.type==='json'} label="JSON"  onTouchTap={()=>{this.parseText({mode:'manu',type:'json'})}} />
                    <RaisedButton style={style.button} key="4" secondary={this.state.format.type==='php'}  label="PHP" onTouchTap={()=>{this.parseText({mode:'manu',type:'php'})}} />
                    <RaisedButton style={style.button} key="5" secondary={this.state.format.type==='xml'} label="XML"  onTouchTap={()=>{this.parseText({mode:'manu',type:'xml'})}} />
                  </div>
                  <div style={style.panel}>
                    <Visualizer data={this.state.data}/>
                  </div>
                </Paper>
              </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
