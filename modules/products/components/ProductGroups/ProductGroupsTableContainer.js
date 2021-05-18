import { connect } from 'react-redux'
import { withDatagrid } from '../../../datagrid'
import ProductGroupsTable from './ProductGroupsTable'
import { ArrayToFirstItem } from '../../../../components/formatted-messages'
import { openPopup, deleteProductGroups } from '../../actions'
import {
    makeGetFilterValue,
    makeGetEditedId,
    makeGetLoading
} from '../../selectors'

const mapDispatchToProps = {
    openPopup,
    deleteProductGroups
}

const makeMapStateToProps = () => {
    const getFilterValue = makeGetFilterValue()
    const getEditedId = makeGetEditedId()
    const getLoading = makeGetLoading()

    const mapStateToProps = (state, { handleFilterChange, datagrid }) => {
        return {
            rows: datagrid.rows.map((row, _i) => ({
                ...row,
                rawData: row,
                tags: (
                    <ArrayToFirstItem
                        key={_i}
                        values={row.tags ? row.tags.map(d => (d.name ? d.name : d)) : ''}
                        rowItems={3}
                        ids={row.tags ? row.tags.map(d => (d.id ? d.id : d)) : ''}
                        tags={true}
                        onTagClick={handleFilterChange}
                    />
                )
            })),
            filterValue: getFilterValue(state),
            editedId: getEditedId(state),
            loading: getLoading(state)            
        }
    }
    return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, mapDispatchToProps)(ProductGroupsTable))
