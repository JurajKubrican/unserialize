import React, {Component} from 'react';
import Visualizer from './Visualizer.jsx';


import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/es/Button/Button";
import Paper from "@material-ui/core/es/Paper/Paper";


import exampleData from './example.json'


import strToObj from './strToObj'

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
};

class VisualizerApp extends Component {

    constructor() {
        super();
        this.state = {
            url: '',
            text: JSON.stringify(exampleData),
            source: 'text',
        };

        this.fetchUrl = this.fetchUrl.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    fetchUrl() {
        fetch('https://wt-kubrican_juraj-gmail_com-0.sandbox.auth0-extend.com/urlBounce?url=' + this.state.url, {
            method: 'GET',
        }).then((response) => {
            return response.json()
        }).then((data) => {
            this.setState({text: data.text});
        }).catch(() => {

        })
    }


    setVal(name, value) {
        this.setState({[name]: value});
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    render() {
        const [data, format] = strToObj(this.state.text);
        let input = false;

        if (this.state.source === 'text') {
            input = (<div>
                <textarea name={"text"} cols="30" rows="10" onChange={this.handleChange} value={this.state.text}/>
            </div>);
        } else {
            // let width = {'width':this.state.curTime + 'px'};
            input = (<div>
                <TextField name={'url'} helperText="URL" value={this.state.url} onChange={this.handleChange}/>
                <Button style={style.button} onClick={this.fetchUrl}>Refresh</Button>
            </div>);
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
                    <div style={style.panel}>
                        {format}
                        <Visualizer data={data}/>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default VisualizerApp;
