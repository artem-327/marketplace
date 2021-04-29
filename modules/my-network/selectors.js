import { createSelector } from 'reselect'
//Services
import { getRowDetail } from './MyNetwork.services'

const getLoadingMyNetwork = state => state?.myNetwork?.loading
const getLoadingDetailRowMyNetwork = state => state?.myNetwork?.loadingDetailRow
const getInviteDetailCompanyMyNetwork = state => state?.myNetwork?.companyNetworkConnection
const getModifiedRowsMyNetwork = (state, rows) => rows
const getDetailRowMyNetwork = (state, rows) => state?.myNetwork?.detailRow

export const makeGetLoadingMyNetwork = () => createSelector([getLoadingMyNetwork], loading => loading)
export const makeGetLoadingDetailRowMyNetwork = () =>
  createSelector([getLoadingDetailRowMyNetwork], loadingDetailRow => loadingDetailRow)
export const makeGetInviteDetailCompanyMyNetwork = () =>
  createSelector([getInviteDetailCompanyMyNetwork], companyNetworkConnection => getRowDetail(companyNetworkConnection))
export const makeGetModifiedRowsMyNetwork = () =>
  createSelector([getModifiedRowsMyNetwork, getDetailRowMyNetwork], (rows, detailRow) =>
    rows?.length ? rows.map(row => getRowDetail(row, detailRow)) : []
  )
