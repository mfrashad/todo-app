import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Wrapper from './Wrapper';
import registerServiceWorker from './registerServiceWorker';
import WebFontLoader from 'webfontloader';


WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

ReactDOM.render(<Wrapper />, document.getElementById('root'));
//registerServiceWorker();
