import React, { useState } from 'react'
import { Visualizer } from './Visualizer/Visualizer'
import { TextOutput } from './TextOutput/TextOutput'
import { v4 } from 'uuid'

import exampleData from './example.json'

import { strToObj } from './strToObj'
import { Box, Button, TextField } from '@material-ui/core'

const style: any = {
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
    textarea: {
        width: '100%',
    },
}

export const VisualizerApp = () => {
    const [url, setUrl] = useState('https://tools.knet.sk/example.xml')
    const [text, setText] = useState(JSON.stringify(exampleData))

    const fetchUrl = () => {
        if (!url.match(/https?:\/\/\w+/i)) {
            setUrl('http://' + url)
        }
        fetch(
            'https://wt-kubrican_juraj-gmail_com-0.sandbox.auth0-extend.com/urlBounce?url=' +
                url,
            {
                method: 'GET',
            }
        )
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setText(data.text)
            })
            .catch(() => {})
    }

    const handleChangeUrl = (e: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setUrl(e.target.value)
    }
    const handleChangeText = (e: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setText(e.target.value)
    }

    const [data, format] = strToObj(text)

    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex">
                <Box display="flex">
                    <Box display="flex">
                        <textarea
                            name={'text'}
                            style={style.textarea}
                            onChange={handleChangeText}
                            value={text}
                        />
                    </Box>
                    <Box display="flex">
                        <TextField
                            name={'url'}
                            helperText="URL"
                            value={url}
                            onChange={handleChangeUrl}
                        />
                        <Button style={style.button} onClick={fetchUrl}>
                            Refresh
                        </Button>
                    </Box>
                </Box>
                <Box display="flex">
                    {format}
                    <Visualizer data={data} />
                </Box>
                <Box>
                    <TextField value={v4()} InputProps={{ readOnly: true }} />
                    <br />
                    <TextField value={v4()} InputProps={{ readOnly: true }} />
                    <br />
                    <TextField value={v4()} InputProps={{ readOnly: true }} />
                    <br />
                    <TextField value={v4()} InputProps={{ readOnly: true }} />
                    <br />
                    <TextField value={v4()} InputProps={{ readOnly: true }} />
                    <br />
                    <TextField value={v4()} InputProps={{ readOnly: true }} />
                    <br />
                </Box>
            </Box>
            <Box display="flex">
                <div style={style.flexRow}>
                    <div style={style.panel}>
                        <TextOutput data={data} />
                    </div>
                </div>
            </Box>
        </Box>
    )
}
