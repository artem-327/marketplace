import { createSelector } from 'reselect'
import { getSafe } from '../../utils/functions'

const getNextImmediate = state => getSafe(() => state.immediates.nextImmediate, null)

export const makeGetNextImmediate = () => {
  return createSelector([getNextImmediate], nextImmediate => nextImmediate)
}
