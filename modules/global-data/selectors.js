import { createSelector } from 'reselect'

// Services
import { getSafe } from '../../utils/functions'

const getUserRoles = state => state.globalData.companyUserRoles
const getAdminRoles = state => state.globalData.adminRoles.map(d => d.id)





export const makeGetUserRoles = () => createSelector([getUserRoles], userRoles => userRoles)
export const makeGetAdminRoles = () => createSelector([getAdminRoles], adminRoles => adminRoles)







