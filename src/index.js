import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import VisualizerApp from './components/VisualizerApp'

ReactDOM.render(<VisualizerApp />, document.getElementById('root'))
registerServiceWorker()
