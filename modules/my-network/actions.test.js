import moxios from 'moxios'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
//Api calls
import api from '../../api'
//Reducers
import { initialState } from './reducer'
//Actions
import { search } from './actions'
import * as types from './action-types'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('search TradePass connection', () => {
  let store

  beforeEach(() => {
    moxios.install(api)
    store = mockStore(initialState)
  })
  afterEach(() => {
    moxios.uninstall()
  })
  test('SEARCH_PENDING and SEARCH_FULFILLED after successful call action `search`', () => {
    const res = { connectedCompany: 'some values' }
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: res
      })
    })
    const expectedActions = [{ type: types.SEARCH_PENDING }, { type: types.SEARCH_FULFILLED, payload: res }]
    return store.dispatch(search(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  test('SEARCH_PENDING and SEARCH_REJECTED after call unsuccessful (without id parameter) action `search`', () => {
    const errorResp = {
      status: 400,
      response: new Error('Error: Request failed with status code 400')
    }

    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      request.respondWith(errorResp)
    })

    const expectedActions = [
      { type: types.SEARCH_PENDING },
      { type: types.SEARCH_REJECTED, error: new Error('Request failed with status code 400') } //Without word 'Error: '
    ]

    return store.dispatch(search()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
