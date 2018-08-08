import React, {Component} from 'react';


const style = {
    table: {
        'border': '1px solid black'
    },
    typeWrapper: {
        'background': 'green'
    }
};


class Visualizer extends Component {
    render() {
        const data = this.props.data;
        let type = typeof(data);
        const components = [];
        let key = 0;
        switch (type) {
            case 'object':
                for (let i in data) {
                    if (!data.hasOwnProperty(i))
                        continue;
                    components.push(<tr key={key++}>
                        <td>{i}</td>
                        <td><Visualizer data={data[i]}/></td>
                    </tr>);
                }
                if (data instanceof Array) {
                    type = 'array';
                }
                return (
                    <table style={style.table} className="Visualizer">
                        <tbody>
                        <tr>
                            <td></td>
                            <td style={style.typeWrapper}>{type}</td>
                        </tr>
                        {components}
                        </tbody>
                    </table>);
            //case 'string':
            //case 'number':
            default:
                return (<span>{data}</span>);
        }

    }
}

export default Visualizer;
