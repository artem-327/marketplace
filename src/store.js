import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { localeReducer as locale } from 'react-localize-redux';
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { combineReducers } from 'redux'
import { combineForms } from 'react-redux-form';

import identity, {initialState as identityFormInit} from './modules/identity';
import location from './modules/location';
import companies from './modules/companies';
import productOffers, {initialState as addProductsInit} from './modules/productOffers';
import popup from './modules/popup';
import filter, {initialState as filterInit} from './modules/filter';
import packageTypes from './modules/packageTypes';
import cart from "./modules/cart";
import broadcastRules from "./modules/broadcastRule";
import merchants, {initialState as merchantsInit} from "./modules/merchants";
import products, {initialState as productsInit} from './modules/products';
import errors from "./modules/errors";

//TODO::unite forms reducers
const reducer = combineReducers({
    identity,
    companies,
    locale,
    location,
    productOffers,
    products,
    packageTypes,
    cart,
    popup,
    broadcastRules,
    merchants,
    filter,
    errors,
    forms: combineForms({
        filter: filterInit.data,
        addProductOffer: addProductsInit.addProductOffer,
        productMapping: productsInit.productsMapping,
        productOffering: productsInit.productOffering,
        loginForm: identityFormInit.loginForm.data,
        registrationForm: identityFormInit.registrationForm.data,
        merchants: merchantsInit,
    }, 'forms'),
});


const middleware = applyMiddleware(thunk, promise(), createLogger());
// const middleware = applyMiddleware(thunk, promise());

export default createStore(reducer, middleware)