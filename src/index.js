import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App';
import * as serviceWorker from './serviceWorker';

import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './redux/reducers';
import {Provider} from "react-redux";

let store = createStore(
  combineReducers({...reducers}),
  {},
  compose(applyMiddleware(thunkMiddleware))
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
