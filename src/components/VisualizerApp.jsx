import React, { Component } from "react";
import Visualizer from "./Visualizer/Visualizer";
import TextOutput from "./TextOutput/TextOutput";

import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/es/Button/Button";
import Paper from "@material-ui/core/es/Paper/Paper";
import Grid from "@material-ui/core/es/Grid/Grid";

import exampleData from "./example.json";

import strToObj from "./strToObj";

const style = {
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    display: "block",
    marginBottom: "5px",
    marginRight: "10px",
  },
  panel: {
    minHeight: "60px",
  },
  textarea: {
    width: "100%",
  },
};

class VisualizerApp extends Component {
  constructor() {
    super();
    this.state = {
      url: "https://tools.knet.sk/example.xml",
      text: JSON.stringify(exampleData),
    };

    this.fetchUrl = this.fetchUrl.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  fetchUrl() {
    if (!this.state.url.match(/https?:\/\/\w+/i)) {
      this.setState({ url: "http://" + this.state.url });
    }
    fetch(
      "https://wt-kubrican_juraj-gmail_com-0.sandbox.auth0-extend.com/urlBounce?url=" +
        this.state.url,
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ text: data.text });
      })
      .catch(() => {});
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const [data, format] = strToObj(this.state.text);

    return (
      <Paper>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={4}>
            <Grid item sm={4}>
              <textarea
                name={"text"}
                style={style.textarea}
                onChange={this.handleChange}
                value={this.state.text}
              />
            </Grid>
            <Grid item sm={4}>
              <TextField
                name={"url"}
                helperText="URL"
                value={this.state.url}
                onChange={this.handleChange}
              />
              <Button style={style.button} onClick={this.fetchUrl}>
                Refresh
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div style={style.flexRow}>
              <div style={style.panel}>
                {format}
                <Visualizer data={data} />
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={4}>
            <div style={style.flexRow}>
              <div style={style.panel}>
                <TextOutput data={data} />
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default VisualizerApp;
