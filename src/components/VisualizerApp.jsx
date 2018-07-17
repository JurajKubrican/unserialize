import React, {Component} from 'react';
import Visualizer from './Visualizer.jsx';

import Serialize from 'php-serialize'
import {parseString} from 'xml2js';
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/es/Button/Button";
import Paper from "@material-ui/core/es/Paper/Paper";

const style = {
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    flexCol: {
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        display: 'block',
        marginBottom: '5px',
        marginRight: '10px',
    },
    panel: {
        minHeight: '60px',
    },
    loader: {
        width: '200px',
        height: '20px',
        position: 'relative',
    },
    loaderInside: {
        height: '20px',
        position: 'absolute',
        backgroundColor: 'red'
    },

};

class VisualizerApp extends Component {

    constructor() {
        const data = {
            one: 1,
            two: "two",
            three: [
                'three1',
                'three2',
                'three3'
            ]
        };

        let state = {
            url: '',
            text: JSON.stringify(data),
            data: data,
            curTime: 0,
            timer: false,
            source: 'text',
            format: {
                mode: 'auto',
                type: 'json'
            }
        };
        super();
        this.state = state;

        this.fetchUrl = this.fetchUrl.bind(this)
    }

    fetchUrl() {
        fetch(this.state.url, {
            method: 'GET',
        }).then(function (response) {
            return response.text()

        }).then(function (text) {
            let state = this.state;
            state.text = text;
            this.setState(state);
            this.parseText();
        })
    }


    setVal(name, value) {
        this.setState({[name]: value});
    }

    setUrl(e) {
        this.setState({text: e.target.value, source: ''});
    }

    setText(e) {
        this.setState({text: e.target.value, source: 'text'});
        this.parseText();
    }

    parseText(format) {
        let state = this.state;
        if (format) {
            state.format = format;
        }

        if (state.format.mode === 'auto') {
            let succ = false;
            try {
                state.data = JSON.parse(state.text);
                state.format.type = 'json';
                succ = true;
            } catch (e) {
            }

            if (!succ) {
                try {
                    state.data = Serialize.unserialize(state.text);
                    state.format.type = 'php';
                    succ = true;
                } catch (e) {

                }
            }

            if (!succ) {
                try {
                    parseString(state.text, function (err, result) {
                        state.data = result;
                    });
                    state.format.type = 'xml';
                    succ = true
                } catch (e) {

                }
            }
        }

        else {
            try {
                switch (state.format.type) {
                    case'json':
                        state.data = JSON.parse(state.text);
                        break;
                    case'php':
                        state.data = Serialize.unserialize(state.text);
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
            } catch (e) {
                state.data = ['error'];
            }
        }

        this.setState(state);
    }


    render() {

        let input = false;
        if (this.state.source === 'text') {
            input = (<formgroup>
                <textarea name="text" id="text" cols="30" rows="10" onChange={(e) => {
                    this.setText(e)
                }} value={this.state.text}/>
            </formgroup>);
        } else {
            // let width = {'width':this.state.curTime + 'px'};
            input = (<formgroup>
                <TextField hintText="URL" value={this.state.url} onChange={(e) => {
                    this.setUrl(e)
                }} id="url"/>
                <Button style={style.button} key="0" label="Refresh" onClick={() => {
                    this.fetchUrl()
                }}/>
            </formgroup>);
        }


        return (
            <div style={style.flexCol}>
                <Paper style={style.flexRow}>
                    <div style={style.flexCol}>
                        <Button style={style.button} color={this.state.source === 'text' ? "primary" : "secondary"}
                                onClick={() => {
                                    this.setVal('source', 'text')
                                }}>Text</Button>
                        <Button style={style.button} color={this.state.source === 'url' ? "primary" : "secondary"}
                                onClick={() => {
                                    this.setVal('source', 'url')
                                }}>URL</Button>
                    </div>
                    <div style={style.panel}>
                        {input}
                    </div>
                </Paper>
                <Paper style={style.flexRow}>
                    <div style={style.flexCol}>
                        <Button style={style.button}
                                color={this.state.format.mode === 'auto' ? "primary" : "secondary"}
                                onClick={() => {
                                    this.parseText({mode: 'auto', type: 'json'})
                                }}>AUTO</Button>
                        <Button style={style.button}
                                color={this.state.format.mode === 'json' ? "primary" : "secondary"}
                                onClick={() => {
                                    this.parseText({mode: 'manu', type: 'json'})
                                }}>JSON</Button>
                        <Button style={style.button}
                                color={this.state.format.mode === 'php' ? "primary" : "secondary"}
                                onClick={() => {
                                    this.parseText({mode: 'manu', type: 'php'})
                                }}>PHP</Button>
                        <Button style={style.button}
                                color={this.state.format.mode === 'xml' ? "primary" : "secondary"}
                                onClick={() => {
                                    this.parseText({mode: 'manu', type: 'xml'})
                                }}>XML</Button>
                    </div>
                    <div style={style.panel}>
                        <Visualizer data={this.state.data}/>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default VisualizerApp;
