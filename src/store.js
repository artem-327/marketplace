import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { combineReducers } from 'redux';
import { combineForms } from 'react-redux-form';
import identity, {initialState as identityFormInit} from './modules/identity';
import location, {initialState as locationFormInit} from './modules/location';
import productOffers from './modules/productOffers';
import filter from './modules/filter';
import { localeReducer as locale } from 'react-localize-redux';
import search, {initialState as searchFormInit} from './modules/search';
import products from './modules/products';
import popup from './modules/popup';
import dropdown from './modules/dropdown';

const reducer = combineReducers({
    filter,
    identity,
    locale,
    location,
    productOffers,
    products,
    search,
    popup,
    dropdown,
    forms: combineForms({
        filter,
        loginForm: identityFormInit.loginForm.data,
        registrationForm: identityFormInit.registrationForm.data,
        locationForm: locationFormInit.location.data,
        searchForm: searchFormInit.searchForm.data,
    }, 'forms'),
});


const middleware = applyMiddleware(thunk, promise(), createLogger());

export default createStore(reducer, middleware)