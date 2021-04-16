import { createSelector } from 'reselect'

const getMainContainer = state => state?.layout?.mainContainer

export const makeGetMainContainer = () => createSelector([getMainContainer], mainContainer => mainContainer)
