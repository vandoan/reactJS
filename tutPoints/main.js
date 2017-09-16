import React from 'react';
import ReactDom from 'react-dom';
import App from './App.jsx';

ReactDom.render(<App  contentProp = "Content from props from main.js..." />, document.getElementById('app'));