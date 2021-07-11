import reducer, { initialState } from './reducer'

describe('`Inventory` reducers', () => {
  test('when previous state is undefined, return false', () => {
    const newState = reducer(undefined, {})
    expect(newState).toStrictEqual(initialState)
  })

  test('return previous state when uknown action type', () => {
    const newState = reducer(initialState, { type: 'unknown' })
    expect(newState).toStrictEqual(initialState)
  })
})
