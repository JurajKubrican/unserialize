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

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const [data, format] = strToObj(this.state.text);

        return (
            <div style={style.flexCol}>
                <Paper>
                    <div style={style.flexRow}>
                        <div style={style.flexCol}>
                            <textarea name={"text"} cols="30" rows="10" onChange={this.handleChange}
                                      value={this.state.text}/>
                        </div>
                        <div style={style.flexCol}>
                            <TextField name={'url'} helperText="URL" value={this.state.url}
                                       onChange={this.handleChange}/>
                            <Button style={style.button} onClick={this.fetchUrl}>Refresh</Button>
                        </div>
                    </div>
                    <div style={style.flexRow}>
                        <div style={style.panel}>
                            {format}
                            <Visualizer data={data}/>
                        </div>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default VisualizerApp;
