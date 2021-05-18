import { connect } from 'react-redux'
import { withDatagrid } from '../../../datagrid'
import ProductGroupsTable from './ProductGroupsTable'
import { ArrayToFirstItem } from '../../../../components/formatted-messages'
import { openPopup, deleteProductGroups } from '../../actions'

const mapDispatchToProps = {
    openPopup,
    deleteProductGroups
}

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
        filterValue: state.productsAdmin.filterValue,
        editedId: state.productsAdmin.editedId,
        loading: state.productsAdmin.loading
    }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(ProductGroupsTable))
