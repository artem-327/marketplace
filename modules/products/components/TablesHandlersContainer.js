import { connect } from 'react-redux'
import TablesHandlers from './TablesHandlers'
//Services
import { getSafe } from '../../../utils/functions'
//Actions
import * as Actions from '../actions'
import { openImportPopup } from '../../settings/actions'


const mapStateToProps = state => {
    return {
      tableHandlersFilters: state.productsAdmin.tableHandlersFilters,
      searchedCompanies: state.productsAdmin.searchedCompanies.map(d => ({
        key: d.id,
        value: d.id,
        text: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, '')
      })),
      searchedCompaniesByName: state.productsAdmin.searchedCompanies.map(d => ({
        key: d.id,
        value: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, ''),
        text: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, '')
      })),
      searchedCompaniesLoading: state.productsAdmin.searchedCompaniesLoading,
      companyProductUnmappedOnly: state.productsAdmin.companyProductUnmappedOnly
    }
}
  
export default connect(mapStateToProps, { ...Actions, openImportPopup })(TablesHandlers)
