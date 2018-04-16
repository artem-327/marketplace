import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import { combineReducers } from 'redux'
import { combineForms } from 'react-redux-form';
import identity, {initialState as loginFormInit} from './modules/identity';
import contact, {initialState as landingFormInit} from './modules/contact'
import { localeReducer as locale } from 'react-localize-redux';

const reducer = combineReducers({
    identity,
    contact,
    locale,
    forms: combineForms({
        loginForm: loginFormInit.identity.data,
        landingForm: landingFormInit.landingForm.data
    }, 'forms'),
});


const middleware = applyMiddleware(thunk, promise(), createLogger());

export default createStore(reducer, middleware)