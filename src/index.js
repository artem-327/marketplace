import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import store from './store';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import {Switch, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login'
import Registration from './pages/registration'
import axios from "axios";
import { setAuthToken } from './utils/auth';
import {getIdentity}from './modules/identity';
import { IntlProvider } from 'react-intl';
import messages_en from './translations/en.json';

const messages = {
    en: messages_en
};


axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common = {
    "responseType": "json",
    "Content-Type": "application/json",
};

if(localStorage.jwtoken){
    setAuthToken(localStorage.jwtoken);
    store.dispatch(getIdentity())
}

ReactDOM.render(
    <IntlProvider locale='en' messages={messages['en']}>
        <BrowserRouter>
            <Provider store={store}>
               <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/registration" component={Registration}/>
                    <Route path="/" component={App}/>
                </Switch>
            </Provider>
        </BrowserRouter>
    </IntlProvider>, document.getElementById('root'));
registerServiceWorker();
