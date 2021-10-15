import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './App/Layout/index.css';
import App from './App/Layout/App';
import reportWebVitals from './reportWebVitals';
import { eventContext, store } from './App/Stores/store';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <eventContext.Provider value={store}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </eventContext.Provider>,
  

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
