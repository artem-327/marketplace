import moxios from 'moxios'
import api from '../../api'
import apiCalls from './api'

describe('search TradePass connection', () => {
  beforeEach(() => {
    moxios.install(api)
  })
  afterEach(() => {
    moxios.uninstall()
  })
  test('get CompanyTradepassResponse', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { connectedCompany: 'some values' }
      })
    })
    //Update to test app in redux
    return apiCalls.search().then(res => {
      expect(res.data).toStrictEqual({ connectedCompany: 'some values' })
    })
  })
})
