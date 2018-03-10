import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Hello from './Hello.js';
import 'tachyons';
import 'font-awesome/css/font-awesome.min.css';
import registerServiceWorker from './registerServiceWorker';
console.assert(React);

ReactDOM.render(<Hello greeting = {'Hello World!'} welcome = {' - Welcome to React. - '} />, document.getElementById('root'));
registerServiceWorker();
