import { createSelector } from 'reselect'
//Services
import { getRows } from './services'

const getDatagridRows = props => props?.datagrid?.rows

export const makeGetDatagridRows = () => {
  return createSelector([getDatagridRows], rows => getRows(rows))
}
