import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { combineReducers } from 'redux'
import { combineForms } from 'react-redux-form';
import { localeReducer as locale } from 'react-localize-redux';

import companies from './modules/companies'
import productOffers from './modules/productOffers'
import filter from './modules/filter';
import popup from './modules/popup';
import identity, {initialState as identityFormInit} from './modules/identity';
import inventory, {initialState as inventoryFormInit} from './modules/inventory'
import search, {initialState as searchFormInit} from './modules/search'

const reducer = combineReducers({
    filter,
    identity,
    companies,
    locale,
    inventory,
    productOffers,
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