import { connect } from 'react-redux'
import TablesHandlers from './TablesHandlers'
//Actions
import * as Actions from '../actions'
import { openImportPopup } from '../../settings/actions'
//Selectors
import {
  makeGetTableHandlersFilters,
  makeGetSearchedCompanies,
  makeGetSearchedCompaniesByName,
  makeGetSearchedCompaniesLoading,
  makeGetCompanyProductUnmappedOnly
} from '../selectors'

const makeMapStateToProps = () => {
  const getTableHandlersFilters = makeGetTableHandlersFilters()
  const getSearchedCompanies = makeGetSearchedCompanies()
  const getSearchedCompaniesByName = makeGetSearchedCompaniesByName()
  const getSearchedCompaniesLoading = makeGetSearchedCompaniesLoading()
  const getCompanyProductUnmappedOnly = makeGetCompanyProductUnmappedOnly()

  const mapStateToProps = state => {
    return {
      tableHandlersFilters: getTableHandlersFilters(state),
      searchedCompanies: getSearchedCompanies(state),
      searchedCompaniesByName: getSearchedCompaniesByName(state),
      searchedCompaniesLoading: getSearchedCompaniesLoading(state),
      companyProductUnmappedOnly: getCompanyProductUnmappedOnly(state)
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps, { ...Actions, openImportPopup })(TablesHandlers)
