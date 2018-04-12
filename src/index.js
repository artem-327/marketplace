import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './store';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
// import { Router, Route, IndexRoute, hashHistory } from "react-router";
import {Switch, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login'
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route path="/" component={App}/>
            </Switch>
        </Provider>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
