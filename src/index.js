import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './reducers';

ReactDOM.render(
  <Provider store={createStore(rootReducer)}>
  <App />
  </Provider>,
  document.getElementById('root')
);
