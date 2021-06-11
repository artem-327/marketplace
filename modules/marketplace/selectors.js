import { createSelector } from 'reselect'
//Services
import { getRows, getCompaniesDropdown } from './services'

const getDatagridRows = props => props?.datagrid?.rows
const getSearchedCompaniesDropdown = props => props?.marketplace?.searchedCompanies


export const makeGetDatagridRows = () => {
  return createSelector([getDatagridRows], rows => getRows(rows))
}

export const makeGetSearchedCompaniesDropdown = () => {
  return createSelector([getSearchedCompaniesDropdown], searchedCompanies => getCompaniesDropdown(searchedCompanies))
}