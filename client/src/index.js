import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import { Provider } from 'react-redux';

import store from 'reduxFiles/store';
import App from 'components/App'
import './index.css';


ReactDOM.render(
  <Provider store={ store }>
    <Router history={hashHistory}>
      {/* <Route path="/app" component={App}/>  */}
      <Route path="/*" component ={App}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
