import React from "react";

const style = {
  table: {
    border: "1px solid black",
  },
  typeWrapper: {
    background: "green",
  },
};

type Props = {
  data: any;
};

export const Visualizer: React.FC<Props> = ({ data }) => {
  let type = typeof data;
  const components = [];
  let key = 0;
  switch (type) {
    case "object":
      for (let i in data) {
        if (!data.hasOwnProperty(i)) continue;
        components.push(
          <tr key={key++}>
            <td>{i}</td>
            <td>
              <Visualizer data={data[i]} />
            </td>
          </tr>
        );
      }
      return (
        <table style={style.table} className="Visualizer">
          <tbody>
            <tr>
              <td></td>
              <td style={style.typeWrapper}>{data instanceof Array?'array':type}</td>
            </tr>
            {components}
          </tbody>
        </table>
      );
    default:
      return <span>{data}</span>;
  }
};
