import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { combineReducers, compose } from 'redux'
import { combineForms } from 'react-redux-form'
import createSagaMiddleware from 'redux-saga'
import { throttle } from 'lodash'
//actions
import { LOGIN_INIT } from './modules/auth/action-types'
import { loadState, saveState } from './utils/storePersist'
//sagas
import ordersSaga from './modules/orders/saga'
//reducers
import settings from './modules/settings/reducers'
import admin from './modules/admin/reducers'
import profile from './modules/profile/reducers'
import marketplace from './modules/marketplace/reducer'
import filter, { initialState as filterInit } from './modules/filter/reducer'
import simpleAdd from './modules/inventory/reducer'
import shiping from './modules/shipping/reducer'
import cart, { initialState as cartInit } from './modules/purchase-order/reducer'
import ordersReducers from './modules/orders/reducers'
import zip from './modules/zip-dropdown/reducer'
import businessTypes from './modules/company-form/reducer'
import auth from './modules/auth/reducer'
import broadcast from './modules/broadcast/reducer'
import messages from './modules/messages/reducer'
import companyProductInfo from './modules/company-product-info/reducer'
import operations from './modules/operations/reducers'
import wantedBoard from './modules/wanted-board/reducer'
import search from './modules/search/reducer'
import alerts from './modules/alerts/reducer'
import layout from './modules/layout/reducer'
import companiesAdmin from './modules/companies/reducer'
import productsAdmin from './modules/products/reducer'
import documentTypes from './modules/document-types/reducer'
import marketSegments from './modules/market-segments/reducer'
import exportInventory from './modules/export-inventory/reducer'
import dashboard from './modules/dashboard/reducer'
import vellociRegister from './modules/velloci-register/reducer'
import addBankAccounts from './modules/add-bank-accounts/reducer'
import myNetwork from './modules/my-network/reducer'
import globalData from './modules/global-data/reducer'

const reducer = combineReducers({
  auth,
  admin,
  businessTypes,
  companyProductInfo,
  shiping,
  cart,
  filter,
  simpleAdd,
  marketplace,
  messages,
  orders: ordersReducers,
  zip,
  forms: combineForms(
    {
      filter: filterInit.data,
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
  operations,
  wantedBoard,
  search,
  layout,
  alerts,
  companiesAdmin,
  productsAdmin,
  documentTypes,
  marketSegments,
  exportInventory,
  dashboard,
  vellociRegister,
  addBankAccounts,
  myNetwork,
  globalData
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

export const middlewares = [thunk]

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

  sagaMiddleware.run(ordersSaga)

  return store
}
