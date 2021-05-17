import { storeFactory } from '../../test/testUtils'
import { initialState } from './reducer'
import { SEARCH_REJECTED, SEARCH_FULFILLED } from './action-types'

import { search } from './actions'

const id = 1
const initState = { ...initialState }
describe('search action dispatcher', () => {
  describe('no id ', () => {
    let store
    beforeEach(() => {
      store = storeFactory(initState)
    })

    test('updates state correctly for unsuccessfull search', async () => {
      await store.dispatch(search(''))
      const newState = store.getState()
      const expectedState = {
        ...initState,
        loading: false,
        isError: true
      }
      expect(newState).toEqual(expectedState)
    })
    test('updates state correctly for successfull search', async () => {
      await store.dispatch(search(id))
      const newState = store.getState()
      const expectedState = {
        ...initState,
        loading: false,
        companyNetworkConnection: { connectedCompany: null },
        isError: false
      }
      expect(newState).toEqual(expectedState)
    })
  })
  describe('with some id ', () => {
    let store
    beforeEach(() => {
      store = storeFactory(initState)
    })

    test('updates state correctly for unsuccessfull search', async () => {
      await store.dispatch(search(0))
      const newState = store.getState()
      const expectedState = {
        ...initState,
        loading: false,
        isError: true
      }
      expect(newState).toEqual(expectedState)
    })
    test('updates state correctly for successfull search', async () => {
      await store.dispatch(search(id))
      const newState = store.getState()
      const expectedState = {
        ...initState,
        loading: false,
        companyNetworkConnection: { connectedCompany: 'some values' },
        isError: false
      }
      expect(newState).toEqual(expectedState)
    })
  })
})
