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
import companies from './modules/companies';
import productOffers from './modules/productOffers';
import popup from './modules/popup';
import filter from './modules/filter';
import packageTypes from './modules/packageTypes';
import cart from "./modules/cart";
import broadcastRules from "./modules/broadcastRule";
import merchants from "./modules/merchants";
import products, {initialState as productsInit} from './modules/products';

const reducer = combineReducers({
    identity,
    companies,
    locale,
    location,
    productOffers,
    products,
    packageTypes,
    cart,
    search,
    popup,
    broadcastRules,
    forms: combineForms({
        filter,
        merchants,
        addProductOffer: productOffers,
        productMapping: productsInit.productsMapping,
        productOffering: productsInit.productOffering,
        loginForm: identityFormInit.loginForm.data,
        registrationForm: identityFormInit.registrationForm.data,
        searchForm: searchFormInit.searchForm.data,
    }, 'forms'),
});


const middleware = applyMiddleware(thunk, promise(), createLogger());
// const middleware = applyMiddleware(thunk, promise());

export default createStore(reducer, middleware)