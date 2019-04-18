import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { combineReducers, compose } from 'redux'
import { combineForms } from 'react-redux-form'
import createSagaMiddleware from 'redux-saga'
import {loadState, saveState} from '~/utils/storePersist'
import {throttle} from 'lodash'

// import jwtDecode from 'jwt-decode'
// import moment from "moment"

// import identity, {initialState as identityFormInit, logout} from './modules/identity'
import identity, { initialState as identityFormInit } from './modules/identity'
import users from './modules/users'

import companies from './modules/companies'
import productOffers, { initialState as addProductsInit } from './modules/productOffers'
import shippingQuotes, { initialState as shippingQuotesInit } from './modules/shippingQuotes'
import popup from './modules/popup'
import filter, { initialState as filterInit } from './modules/filter'
import packageTypes from './modules/packageTypes'
import brcRules, { initialState as broadcastInit } from "./modules/broadcast"
import cart, { initialState as cartInit } from "./modules/cart"
import merchants, { initialState as merchantsInit } from "./modules/merchants"
import products, { initialState as productsInit } from './modules/products'
import location from './modules/location'
import errors from "./modules/errors"
import dataTables from "./modules/dataTables"
import settings from './pages/settings/reducers'
import admin from './pages/admin/reducers'

import { show as saveFilterItem } from './components/Filter/components/SavedFilters/reducers/SaveFilterItem.reducers'
import companiesSaga from "./saga/companies"
import officesSaga from "./saga/offices"
import merchantsSaga from "./saga/merchants"
import usersSaga from "./pages/administration/users/saga/users"
import operatorsSaga from "./pages/administration/operators/saga/operators"
import cartSaga from "./pages/cart/saga/cart"
import locationsSaga from "./saga/locations"
import broadcastSaga from "./saga/broadcast"
import productOffersSaga from "./saga/productOffers"
import shippingQuotesSaga from "./saga/shippingQuotes"
import settingsSaga from "./pages/settings/saga"
import adminSaga from "./pages/admin/saga"

// Simple Add/Edit Inventory
import simpleAdd from  '~/modules/inventory/reducer'
import shiping from '~/modules/shiping/reducer'

// Orders
import ordersReducers from './pages/orders/reducers'
import ordersSaga from './pages/orders/saga'

import auth from '~/modules/auth/reducer'

const reducer = combineReducers({
  auth,
  admin,
  identity,
  brcRules,
  companies,
  users,
  location,
  productOffers,
  shippingQuotes,
  shiping,
  products,
  packageTypes,
  cart,
  popup,
  merchants,
  filter,
  errors,
  dataTables,
  saveFilterItem,
  simpleAdd,
  orders: ordersReducers,
  forms: combineForms({
    filter: filterInit.data,
    brcRules: broadcastInit.broadcastData,
    addProductOffer: addProductsInit.addProductOffer,
    shippingQuotes: shippingQuotesInit.shippingQuotes,
    productMapping: productsInit.productsMapping,
    productOffering: productsInit.productOffering,
    loginForm: identityFormInit.loginForm.data,
    registrationForm: identityFormInit.registrationForm.data,
    merchants: merchantsInit,
    cart: cartInit,
    shippingEdit: {},
    settingsPopup: {
      editWarehouse: {},
      addNewWarehouse: {},
      newProduct: {}
    }
  }, 'forms'),
  settings,
})

const logger = createLogger({
  predicate: (getState, action) => process.env.NODE_ENV === "development"
})

// Middleware to check token expiration and potentially redirect user to login package
// const checkTokenExpirationMiddleware = store => next => action => {
//     const token = localStorage.getItem('jwtoken')
//     if (token) {
//         const expirationTime = moment(jwtDecode(token).exp)
//         const nowTime = moment(Date.now() / 1000)
//       if (expirationTime < nowTime) {
//         next(action)
//         store.dispatch(logout())
//       }
//     }
//     next(action)
//   }

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose


export const makeStore = (preloadedState) => {
  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware()

  const middleware = composeEnhancers(applyMiddleware(thunk, promise(), sagaMiddleware, logger))
  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

  const {auth} = loadState() || {}
  let store = createStore(reducer, {auth}, middleware)
  // let store = createStore(reducer, middleware)

  store.subscribe(throttle(() => {
    const {auth} = store.getState()
    saveState({auth})
  }, 1000))

  sagaMiddleware.run(companiesSaga)
  sagaMiddleware.run(officesSaga)
  sagaMiddleware.run(usersSaga)
  sagaMiddleware.run(operatorsSaga)
  sagaMiddleware.run(merchantsSaga)
  sagaMiddleware.run(cartSaga)
  sagaMiddleware.run(locationsSaga)
  sagaMiddleware.run(broadcastSaga)
  sagaMiddleware.run(productOffersSaga)
  sagaMiddleware.run(shippingQuotesSaga)
  //sagaMiddleware.run(simpleAddSaga)
  sagaMiddleware.run(ordersSaga)
  sagaMiddleware.run(settingsSaga)
  sagaMiddleware.run(adminSaga)
  
  return store
}
