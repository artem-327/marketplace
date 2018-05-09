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
import Registration from './pages/registration'
import axios from "axios";
import { initialize, addTranslationForLanguage } from 'react-localize-redux';
import { setAuthToken } from './utils/auth';
import {getIdentity}from './modules/identity';

const enJson = require('./translations/en.json');

const languages = [{ name: 'English', code: 'en' }];
store.dispatch(initialize(languages, { defaultLanguage: 'en' }));

store.dispatch(addTranslationForLanguage(enJson, 'en'));
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common = {
    "responseType": "json",
    "Content-Type": "application/json'"
};

if(localStorage.jwtoken){
    setAuthToken(localStorage.jwtoken);
    store.dispatch(getIdentity())
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
           <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/registration" component={Registration}/>
                <Route path="/" component={App}/>
            </Switch>
        </Provider>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
