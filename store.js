// import { createStore, applyMiddleware, combineReducers } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import { createLogger } from 'redux-logger'
// import thunkMiddleware from 'redux-thunk'
// import promiseMiddleware from 'redux-promise-middleware'
// import { combineForms } from 'react-redux-form'
// import createSagaMiddleware from 'redux-saga'

// const logger = createLogger({
//   predicate: (getState, action) => process.env.NODE_ENV === "development"
// })
// const sagaMiddleware = createSagaMiddleware()

// // Orders
// import ordersReducers from './modules/orders/reducers'
// import ordersSaga from './modules/orders/saga'

// const reducers = combineReducers({
//   orders: ordersReducers
// })

// const middleware = applyMiddleware(
//   thunkMiddleware, 
//   sagaMiddleware, 
//   promiseMiddleware,
//   logger, 
// )

// export function initializeStore (initialState = {}) {
//   const store = createStore(
//     reducers,
//     initialState,
//     composeWithDevTools(middleware)
//   )

//   sagaMiddleware.run(
//     ordersSaga
//   )

//   return store
// }

import store from './src/store'

export default store