import { connect } from 'react-redux'
import { withDatagrid } from '../../../datagrid'
import ProductCatalogTable from './Table'
//Actions
import * as Actions from '../../actions'
import { downloadAttachment } from '../../../inventory/actions'
import { getSafe } from '../../../../utils/functions'
import {
    makeGetCatEditedId,
    makeGetFilterValue
} from '../../selectors'

const makeMapStateToProps = () => {
    const getCatEditedId = makeGetCatEditedId()
    const getFilterValue = makeGetFilterValue()

    const mapStateToProps = (state, { datagrid }) => {
        return {
            editedId: getCatEditedId(state),
            filterValue: getFilterValue(state),
            rows: datagrid.rows.map(c => ({
                ...c,
                company: getSafe(() => c.company, [])
            }))
        }
    }
    return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, { ...Actions, downloadAttachment })(ProductCatalogTable))
