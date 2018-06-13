import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { combineReducers } from 'redux';
import { combineForms } from 'react-redux-form';
import identity, {initialState as identityFormInit} from './modules/identity';
import location, {initialState as locationFormInit} from './modules/location';
import productOffers, {initialState as pro} from './modules/productOffers';
import filter from './modules/filter';
import { localeReducer as locale } from 'react-localize-redux';
import search, {initialState as searchFormInit} from './modules/search';
import products from './modules/products';
import popup from './modules/popup';
import dropdown, {initialState as productTypeInit} from './modules/dropdown';

const reducer = combineReducers({
    filter,
    identity,
    locale,
    location,-
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
        productType: productTypeInit.productType.data,
        form: productTypeInit.form.data.productForms,
        condition: productTypeInit.condition.data.productConditions,
        package: productTypeInit.package.data.packageTypes
    }, 'forms'),
});


const middleware = applyMiddleware(thunk, promise(), createLogger());

export default createStore(reducer, middleware)