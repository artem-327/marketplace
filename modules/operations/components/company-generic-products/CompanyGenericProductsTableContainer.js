import { connect } from 'react-redux'
// Components
import CompanyGenericProductsTable from './CompanyGenericProductsTable'
// Actions
import * as Actions from '../../actions'
// Services
import { downloadAttachment } from '../../../inventory/actions'
import { withDatagrid } from '../../../datagrid'
import { getRows } from './CompanyGenericProductsTable.services'
// Selectors
import { makeGetFilterValue, makeGetLoading } from '../../selectors'

const makeMapStateToProps = () => {
    const getFilterValue = makeGetFilterValue()
    const getLoading = makeGetLoading()

    const mapStateToProps = (state, { datagrid }) => {
        return {
            filterValue: getFilterValue(state),
            loading: getLoading(state),
            rows: getRows(datagrid)
        }
    }
    return mapStateToProps
}
  
const mapDispatchToProps = {
    ...Actions,
    downloadAttachment
}

export default withDatagrid(connect(makeMapStateToProps, mapDispatchToProps)(CompanyGenericProductsTable))
