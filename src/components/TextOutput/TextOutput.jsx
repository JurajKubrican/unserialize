import React, { Component } from "react";

import { php, es } from "../../lib/VarWriter.js";

const getAuthToken = (data) => {
  const result = {
    customerId: "customerId",
    authorization: data.token_type + " " + data.access_token,
    idToken: data.id_token,
  };

  return JSON.stringify(result);
};
class TextOutput extends Component {
  render() {
    const { data } = this.props;
    return (
      <>
        <textarea name="name" cols="50" rows="20" value={php(data)} readOnly />
        <textarea name="name" cols="50" rows="20" value={es(data)} readOnly />
        <textarea
          name="name"
          cols="50"
          rows="20"
          value={getAuthToken(data)}
          readOnly
        />
      </>
    );
  }
}

export default TextOutput;
