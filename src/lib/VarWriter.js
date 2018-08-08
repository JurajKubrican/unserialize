'use strict';


import esRules from './es.json'
import phpRules from './php.json'
import React from "react";


class varWriter {

    data;

    constructor(object) {
        this.data = object
    }


    traverse(data, rules) {

        let type = typeof(data);
        let output = '';
        switch (type) {
            case 'object':
                for (let i in data) {
                    if (!data.hasOwnProperty(i))
                        continue;
                    output += `<tr key={key++}>
                        <td>{i}</td>
                        <td>` + this.traverse(data[i], phpRules) + `</td>
                    </tr>`;
                }
                if (data instanceof Array) {
                    type = 'array';
                }
                return (
                    `<table style={style.table} className="Visualizer">
                        <tbody>
                        <tr>
                            <td></td>
                            <td style={style.typeWrapper}>{type}</td>
                        </tr>
                        {components}
                        </tbody>
                    </table>`;
            //case 'string':
            //case 'number':
            default:
                return (<span>{data}</span>);
        }

    }


    php(data) {

        this.traverse(data, phpRules)

    }

}


