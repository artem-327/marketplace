import { createSelector } from 'reselect'

const getNextImmediate = state => state?.alerts?.nextImmediate

export const makeGetNextImmediate = () => {
  return createSelector([getNextImmediate], nextImmediate => nextImmediate)
}
