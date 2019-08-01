import React from 'react';
import ReactDOM from 'react-dom';

// Router imports
import { HashRouter } from 'react-router-dom';
import Routes from './routes';

ReactDOM.render(
  <HashRouter>
    <Routes />
  </HashRouter>,

// Pin location
  document.getElementById('root')

);