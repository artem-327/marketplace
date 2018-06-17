import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { localeReducer as locale } from 'react-localize-redux';
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { combineReducers } from 'redux'
import { combineForms } from 'react-redux-form';

import identity, {initialState as identityFormInit} from './modules/identity';
import inventory, {initialState as inventoryFormInit} from './modules/inventory'
import search, {initialState as searchFormInit} from './modules/search';
import products from './modules/products';

import productOffers from './modules/productOffers'
import popup from './modules/popup';
import filter from './modules/filter';
import packageTypes from './modules/packageTypes';

const reducer = combineReducers({
    identity,
    locale,
    inventory,
    productOffers,
    products,
    packageTypes,
    search,
    popup,
    forms: combineForms({
        filter,
        loginForm: identityFormInit.loginForm.data,
        registrationForm: identityFormInit.registrationForm.data,
        inventoryLocationForm: inventoryFormInit.location.data,
        inventoryProductsForm: inventoryFormInit.products.data,
        searchForm: searchFormInit.searchForm.data,
    }, 'forms'),
});


const middleware = applyMiddleware(thunk, promise(), createLogger());

export default createStore(reducer, middleware)