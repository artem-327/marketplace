import { createSelector } from 'reselect'
//Services
import { prepareDataForTable } from './components/Insurance/Insurance.services'

const getDatagridRows = state => state?.settings?.insuranceRows
const getLoading = state => state?.settings?.loading
const getOpenPopup = state => state?.settings?.isOpenPopup

export const makeGetDatagridRows = () => {
  return createSelector([getDatagridRows], rows => prepareDataForTable(rows))
}
export const makeGetLoading = () => {
  return createSelector([getLoading], loading => loading)
}
export const makeGetOpenPopup = () => {
  return createSelector([getOpenPopup], isOpenPopup => isOpenPopup)
}
