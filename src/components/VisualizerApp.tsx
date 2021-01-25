import React, { useState } from "react";
import { Visualizer } from "./Visualizer/Visualizer";
import { TextOutput } from "./TextOutput/TextOutput";

import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";

import exampleData from "./example.json";

import {strToObj} from "./strToObj";

const style: any = {
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

export const VisualizerApp = () => {
  const [url, setUrl] = useState("https://tools.knet.sk/example.xml");
  const [text, setText] = useState(JSON.stringify(exampleData));

  const fetchUrl = () => {
    if (!url.match(/https?:\/\/\w+/i)) {
      setUrl("http://" + url);
    }
    fetch(
      "https://wt-kubrican_juraj-gmail_com-0.sandbox.auth0-extend.com/urlBounce?url=" +
        url,
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setText(data.text);
      })
      .catch(() => {});
  };

  const handleChangeUrl = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUrl(e.target.value);
  };
  const handleChangeText = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setText(e.target.value);
  };

  const [data, format] = strToObj(text);

  return (
    <Paper>
      <Grid container spacing={8}>
        <Grid item xs={12} sm={4}>
          <Grid item sm={4}>
            <textarea
              name={"text"}
              style={style.textarea}
              onChange={handleChangeText}
              value={text}
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              name={"url"}
              helperText="URL"
              value={url}
              onChange={handleChangeUrl}
            />
            <Button style={style.button} onClick={fetchUrl}>
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
};
