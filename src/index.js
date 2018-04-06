import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './store';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
// import { Router, Route, IndexRoute, hashHistory } from "react-router";
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
