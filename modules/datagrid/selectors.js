import { createSelector } from 'reselect'

const getQueryDatagrid = props => props?.datagrid?.query
const getLoadingDatagrid = props => props?.datagrid?.loading
const getRowsDatagrid = props => props?.datagrid?.rows

export const makeGetQueryDatagrid = () => createSelector([getQueryDatagrid], query => query)
export const makeGetLoadingDatagrid = () => createSelector([getLoadingDatagrid], loading => loading)
export const makeGetRowsDatagrid = () => createSelector([getRowsDatagrid], rows => rows)
