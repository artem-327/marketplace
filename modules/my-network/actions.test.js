import moxios from 'moxios'
import api from '../../api'
import { storeFactory } from '../../test/testUtils'
import { initialState } from './reducer'
import { search } from './actions'

describe('search TradePass connection', () => {
  beforeEach(() => {
    moxios.install(api)
  })
  afterEach(() => {
    moxios.uninstall()
  })
  test('get CompanyTradepassResponse', () => {
    const store = storeFactory(initialState)
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { connectedCompany: 'some values' }
      })
    })
    return store.dispatch(search()).then(() => {
      const connectedCompany = store.getState()?.companyNetworkConnection?.connectedCompany
      expect(connectedCompany).toEqual({ connectedCompany: 'some values' })
    })
  })
})
