import moxios from 'moxios'
import api from '../../api'
import { storeFactory } from '../../test/testUtils'
import { initialState } from './reducer'
import { search } from './actions'
import myNetworkReducer from './reducer'

describe('search TradePass connection', () => {
  let store
  beforeEach(() => {
    moxios.install(api)
    store = storeFactory(myNetworkReducer, initialState)
  })
  afterEach(() => {
    moxios.uninstall()
  })
  test('get `connectedCompany` from reducer state after succesfully call action `search`', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: 'some values'
      })
    })
    return store.dispatch(search(1)).then(() => {
      const connectedCompany = store.getState()?.companyNetworkConnection
      expect(connectedCompany).toEqual({ connectedCompany: 'some values' })
    })
  })
  test('get `true` in `isError` from reducer state after unsuccesfully call action `search`', () => {
    const errorResp = {
      status: 400,
      response: new Error('Error: Request failed with status code 400')
    }

    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      request.respondWith(errorResp)
    })

    return store.dispatch(search()).then(() => {
      const isError = store.getState()?.isError
      expect(isError).toBeTruthy()
    })
  })
})
