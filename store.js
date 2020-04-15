import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { combineReducers, compose } from 'redux'
import { combineForms } from 'react-redux-form'
import createSagaMiddleware from 'redux-saga'
import { loadState, saveState } from '~/utils/storePersist'
import { throttle } from 'lodash'

// import jwtDecode from 'jwt-decode'
// import moment from "moment"

// import identity, {initialState as identityFormInit, logout} from './modules/identity'
import identity, { initialState as identityFormInit } from '~/src/modules/identity'
import users from '~/src/modules/users'

import companies from '~/src/modules/companies'
import productOffers, { initialState as addProductsInit } from '~/src/modules/productOffers'
import marketplace from '~/modules/marketplace/reducer'
import shippingQuotes, { initialState as shippingQuotesInit } from '~/src/modules/shippingQuotes'
import popup from '~/src/modules/popup'
import filter, { initialState as filterInit } from '~/modules/filter/reducer'
import oldFilter, { initialState as oldFilterInit } from '~/src/modules/filter' // TODO: remove it when not needed
import packageTypes from '~/src/modules/packageTypes'
import brcRules, { initialState as broadcastInit } from '~/src/modules/broadcast'
// import cart, { initialState as cartInit } from "./modules/cart"
import merchants, { initialState as merchantsInit } from '~/src/modules/merchants'
import products, { initialState as productsInit } from '~/src/modules/products'
import location from '~/src/modules/location'
import errors from '~/src/modules/errors'
import dataTables from '~/src/modules/dataTables'
import settings from '~/modules/settings/reducers'
import admin from '~/modules/admin/reducers'
import profile from '~/modules/profile/reducers'

import { show as saveFilterItem } from '~/src/components/Filter/components/SavedFilters/reducers/SaveFilterItem.reducers'
import companiesSaga from '~/src/saga/companies'
import officesSaga from '~/src/saga/offices'
import merchantsSaga from '~/src/saga/merchants'
import usersSaga from '~/src/pages/administration/users/saga/users'
import operatorsSaga from '~/src/pages/administration/operators/saga/operators'
import cartSaga from '~/src/pages/cart/saga/cart'
import locationsSaga from '~/src/saga/locations'
import broadcastSaga from '~/src/saga/broadcast'
import productOffersSaga from '~/src/saga/productOffers'
import shippingQuotesSaga from '~/src/saga/shippingQuotes'
import chatWidget from '~/modules/chatWidget/reducer'

// Simple Add/Edit Inventory
import simpleAdd from '~/modules/inventory/reducer'
import shiping from '~/modules/shipping/reducer'
import cart, { initialState as cartInit } from '~/modules/purchase-order/reducer'
// Orders
import ordersReducers from '~/modules/orders/reducers'
import ordersSaga from '~/modules/orders/saga'

import zip from '~/modules/zip-dropdown/reducer'
import businessTypes from '~/modules/company-form/reducer'

import auth from '~/modules/auth/reducer'
import { LOGIN_INIT } from '~/modules/auth/action-types'

import broadcast from '~/modules/broadcast/reducer'

import messages from '~/modules/messages/reducer'
import phoneNumber from '~/modules/phoneNumber/reducer'

import companyProductInfo from '~/modules/company-product-info/reducer'
import operations from '~/modules/operations/reducers'
import holds from '~/modules/marketplace/holds/reducer'
import wantedBoard from '~/modules/wanted-board/reducer'

import layout from '~/modules/layout/reducer'

const reducer = combineReducers({
  auth,
  admin,
  businessTypes,
  companyProductInfo,
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
  oldFilter,
  errors,
  dataTables,
  saveFilterItem,
  simpleAdd,
  marketplace,
  messages,
  orders: ordersReducers,
  zip,
  forms: combineForms(
    {
      filter: filterInit.data,
      oldFilter: oldFilterInit.data,
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
    },
    'forms'
  ),
  settings,
  profile,
  broadcast,
  phoneNumber,
  chatWidget,
  operations,
  holds,
  wantedBoard,
  layout
})

const rootReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_INIT: {
      state = undefined
    }
  }
  return reducer(state, action)
}

const logger = createLogger({
  predicate: (getState, action) => process.env.NODE_ENV === 'development'
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
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose

export const makeStore = preloadedState => {
  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware()

  const middleware = composeEnhancers(applyMiddleware(thunk, promise(), sagaMiddleware, logger))
  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

  const { auth } = loadState() || {}
  let store = createStore(rootReducer, { auth }, middleware)
  // let store = createStore(reducer, middleware)

  store.subscribe(
    throttle(() => {
      const { auth } = store.getState()
      saveState({ auth })
    }, 1000)
  )

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

  return store
}
