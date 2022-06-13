import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from "@material-ui/core/styles"
import deepPurple from "./themes/deepPurple";

//import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={deepPurple}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);