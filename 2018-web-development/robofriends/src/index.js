import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'font-awesome/css/font-awesome.min.css';
import 'tachyons';
import './index.css';
console.assert(React);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
