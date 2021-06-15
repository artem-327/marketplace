import { connect } from 'react-redux'
import TablesHandlers from './TablesHandlers'
import * as Actions from '../actions'
import { makeGetTableHandlersFilters, makeGetSearchedCompanies, makeGetSearchedCompaniesLoading, makeGetCompanyProductUnmappedOnly } from '../selectors'

const makeMapStateToProps = () => {
    const getTableHandlersFilters = makeGetTableHandlersFilters()
    const getSearchedCompanies = makeGetSearchedCompanies()
    const getSearchedCompaniesLoading = makeGetSearchedCompaniesLoading()
    const getCompanyProductUnmappedOnly = makeGetCompanyProductUnmappedOnly()

    const mapStateToProps = state => {
        return {
            tableHandlersFilters: getTableHandlersFilters(state),
            searchedCompanies: getSearchedCompanies(state),
            searchedCompaniesByName: getSearchedCompanies(state),
            searchedCompaniesLoading: getSearchedCompaniesLoading(state),
            companyProductUnmappedOnly: getCompanyProductUnmappedOnly(state)
        }
      }
    return mapStateToProps
}

export default connect(makeMapStateToProps, Actions)(TablesHandlers)
