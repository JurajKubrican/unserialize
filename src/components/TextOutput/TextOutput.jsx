import React, {Component} from 'react'

import {php, es} from '../../lib/VarWriter.js'


class TextOutput extends Component {
    render() {
        return (
            <div>
            <textarea name="name" id="" cols="30" rows="10">
                {php(this.props.data)}
            </textarea>
                <textarea name="name" id="" cols="30" rows="10">
                {es(this.props.data)}
            </textarea>
            </div>

        )

    }
}

export default TextOutput;
