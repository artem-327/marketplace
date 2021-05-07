import { storeFactory } from '../../test/testUtils'
import { search } from './actions'
import { initialState } from './reducer'
import { SEARCH_REJECTED, SEARCH_FULFILLED } from './action-types'

const id = 1
const initState = { initialState }
let store
describe('search action dispatcher', () => {
  describe('no id ', () => {
    beforeEach(() => {
      store = storeFactory(initState)
    })
    test('fires a search request action type `SEARCH_REJECTED`', () => {
      store.dispatch(search('')).then(() => {
        expect(store.getActions()).toContainEqual({ type: SEARCH_REJECTED })
      })
    })
    test('updates state correctly for unsuccessfull search', () => {
      store.dispatch(search('')).then(() => {
        const newState = store.getState()
        const expectedState = {
          ...initState,
          loading: false,
          isError: true
        }
        expect(newState).toEqual(expectedState)
      })
    })
    test('updates state correctly for successfull search', () => {
      store.dispatch(search(id)).then(() => {
        const newState = store.getState()
        const expectedState = {
          ...initState,
          loading: false,
          companyNetworkConnection: { connectedCompany: undefined },
          isError: false
        }
        expect(newState).toEqual(expectedState)
      })
    })
  })
  describe('with some id ', () => {
    beforeEach(() => {
      store = storeFactory(initState)
    })
    test('fires a search request action type `SEARCH_FULFILLED`', () => {
      store.dispatch(search(id)).then(() => {
        console.log('store.getActions()', store.getActions())
        expect(store.getActions()).toContainEqual({ type: SEARCH_FULFILLED, payload: 'aha' })
      })
    })
    test('updates state correctly for unsuccessfull search', () => {
      store.dispatch(search(0)).then(() => {
        const newState = store.getState()
        const expectedState = {
          ...initState,
          loading: false,
          isError: true
        }
        expect(newState).toEqual(expectedState)
      })
    })
    test('updates state correctly for successfull search', () => {
      store.dispatch(search(id)).then(() => {
        const newState = store.getState()
        const expectedState = {
          ...initState,
          loading: false,
          companyNetworkConnection: { connectedCompany: undefined },
          isError: false
        }
        expect(newState).toEqual(expectedState)
      })
    })
  })
})
