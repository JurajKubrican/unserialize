import React from "react";

import { php, es } from "../../lib/VarWriter";

const getAuthToken = (data: any) => {
  const result = {
    customerId: "customerId",
    authorization: data.token_type + " " + data.access_token,
    idToken: data.id_token,
  };

  return JSON.stringify(result, null, " ");
};
type Props = {
  data: any;
};

export const TextOutput: React.FC<Props> = ({ data }) => {
  return (
    <>
      <textarea name="name" cols={50} rows={20} value={php(data)} readOnly />
      <textarea name="name" cols={50} rows={20} value={es(data)} readOnly />
      <textarea
        name="name"
        cols={50}
        rows={20}
        value={getAuthToken(data)}
        readOnly
      />
    </>
  );
};
