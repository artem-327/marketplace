import { SEARCH, SEARCH_FULFILLED } from './action-types'
import reducer, { initialState } from './reducer'

test('when previos state is undefined, return false', () => {
  const newState = reducer(undefined, {})
  expect(newState).toStrictEqual(initialState)
})

test('return previos state when uknown action type', () => {
  const newState = reducer(initialState, { type: 'unknown' })
  expect(newState).toStrictEqual(initialState)
})

test('return `companyNetworkConnection` for action type SEARCH_FULFILLED', () => {
  const newState = reducer(initialState, { type: SEARCH_FULFILLED })
  expect(newState).toStrictEqual({
    ...initialState,
    loading: false,
    companyNetworkConnection: { connectedCompany: undefined }, //TODO
    isError: false
  })
})
