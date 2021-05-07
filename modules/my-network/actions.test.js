import { SEARCH, SEARCH_PENDING } from './action-types'
import { search } from './actions'

describe.skip('search', () => {
  test('should create an action when a search fetch has started', () => {
    const expectedAction = {
      type: SEARCH_PENDING
    }
    expect(search()).toStrictEqual(expectedAction)
  })
})
