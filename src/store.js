import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { localeReducer as locale } from 'react-localize-redux';
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { combineReducers } from 'redux'
import { combineForms } from 'react-redux-form';

import identity, {initialState as identityFormInit} from './modules/identity';
import location from './modules/location';
import search, {initialState as searchFormInit} from './modules/search';
import products from './modules/products';
import companies from './modules/companies'

import productOffers from './modules/productOffers'
import popup from './modules/popup';
import filter from './modules/filter';
import packageTypes from './modules/packageTypes';
import addInventory from './modules/addInventory';

const reducer = combineReducers({
    identity,
    companies,
    locale,
    location,
    productOffers,
    products,
    packageTypes,
    search,
    popup,
    addInventory,
    forms: combineForms({
        filter,
        addProductOffer: productOffers,
        loginForm: identityFormInit.loginForm.data,
        registrationForm: identityFormInit.registrationForm.data,
        searchForm: searchFormInit.searchForm.data,
    }, 'forms'),
});


const middleware = applyMiddleware(thunk, promise(), createLogger());

export default createStore(reducer, middleware)