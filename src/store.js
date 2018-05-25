import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import { combineReducers } from 'redux'
import { combineForms } from 'react-redux-form';
import identity, {initialState as identityFormInit} from './modules/identity';
import contact from './modules/contact'
import inventory, {initialState as inventoryFormInit} from './modules/inventory'
import { localeReducer as locale } from 'react-localize-redux';
import merchants from './modules/merchants';
import productOff from './modules/productOff';

const reducer = combineReducers({
    identity,
    contact,
    locale,
    inventory,
    merchants,
    productOff,
    forms: combineForms({
        loginForm: identityFormInit.loginForm.data,
        registrationForm: identityFormInit.registrationForm.data,
        inventoryLocationForm: inventoryFormInit.location.data,
        inventoryProductsForm: inventoryFormInit.products.data
    }, 'forms'),
});


const middleware = applyMiddleware(thunk, promise(), createLogger());

export default createStore(reducer, middleware)