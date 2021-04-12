import { createSelector } from 'reselect'
//Services
import { prepareDataForTable } from './components/Insurance/Insurance.services'

const getDatagridRows = rows => rows

export const makeGetDatagridRows = () => {
  return createSelector([getDatagridRows], rows => prepareDataForTable(rows))
}
