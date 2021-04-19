import { createSelector } from 'reselect'

const getSidebar = state => state?.cart?.sidebar

export const makeGetSidebar = () => createSelector([getSidebar], sidebar => sidebar)
