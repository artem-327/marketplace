import { connect } from 'react-redux'
import CompanyGenericProductsTable from './CompanyGenericProductsTable'
import * as Actions from '../../actions'
import { downloadAttachment } from '../../../inventory/actions'
import { withDatagrid } from '../../../datagrid'
import { makeGetFilterValue, makeGetLoading } from '../../selectors'
import { getRows } from './CompanyGenericProductsTable.services'

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
