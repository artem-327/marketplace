import { connect } from 'react-redux'
import { withDatagrid } from '../../../datagrid'
import ProductGroupsTable from './ProductGroupsTable'
import { openPopup, deleteProductGroups } from '../../actions'
import {
    makeGetFilterValue,
    makeGetEditedId,
    makeGetLoading,
    makeGetGroupRows
} from '../../selectors'

const mapDispatchToProps = {
    openPopup,
    deleteProductGroups
}

const makeMapStateToProps = () => {
    const getFilterValue = makeGetFilterValue()
    const getEditedId = makeGetEditedId()
    const getLoading = makeGetLoading()
    const getGroupRows = makeGetGroupRows()

    const mapStateToProps = (state, ownProps) => {
        return {
            rows: getGroupRows(ownProps),
            filterValue: getFilterValue(state),
            editedId: getEditedId(state),
            loading: getLoading(state)            
        }
    }
    return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, mapDispatchToProps)(ProductGroupsTable))
