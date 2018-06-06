import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { combineReducers } from 'redux'
import { combineForms } from 'react-redux-form';
import identity, {initialState as identityFormInit} from './modules/identity';
import inventory, {initialState as inventoryFormInit} from './modules/inventory'
import productOffers from './modules/productOffers'
import filter, {initialState as filterFormInit} from './modules/filter';
import { localeReducer as locale } from 'react-localize-redux';
import search, {initialState as searchFormInit} from './modules/search'

const reducer = combineReducers({
    filter,
    identity,
    locale,
    inventory,
    productOffers,
    search,
    forms: combineForms({
        filterForm: filterFormInit.filterForm.data,
        loginForm: identityFormInit.loginForm.data,
        registrationForm: identityFormInit.registrationForm.data,
        inventoryLocationForm: inventoryFormInit.location.data,
        inventoryProductsForm: inventoryFormInit.products.data,
        searchForm: searchFormInit.searchForm.data,
    }, 'forms'),
});


const middleware = applyMiddleware(thunk, promise(), createLogger());

export default createStore(reducer, middleware)