import { connect } from 'react-redux'
import { withDatagrid } from '../../../datagrid'
import ProductCatalogTable from './Table'
//Actions
import * as Actions from '../../actions'
import { downloadAttachment } from '../../../inventory/actions'
import { getSafe } from '../../../../utils/functions'
import {
    makeGetCatEditedId,
    makeGetFilterValue,
    makeGetProductRows
} from '../../selectors'

const makeMapStateToProps = () => {
    const getCatEditedId = makeGetCatEditedId()
    const getFilterValue = makeGetFilterValue()
    const getProductRows = makeGetProductRows()

    const mapStateToProps = (state, { datagrid }) => {
        return {
            editedId: getCatEditedId(state),
            filterValue: getFilterValue(state),
            rows: getProductRows(datagrid)
        }
    }
    return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, { ...Actions, downloadAttachment })(ProductCatalogTable))
