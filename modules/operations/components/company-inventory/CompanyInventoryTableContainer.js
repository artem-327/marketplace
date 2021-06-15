import { connect } from 'react-redux'
import { withDatagrid } from '../../../datagrid'
import CompanyInventoryTable from './CompanyInventoryTable'
import { makeGetFilterValue, makeGetLoading } from '../../selectors'
import { getRows } from './CompanyInventoryTable.services'


const mapDispatchToProps = {}

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

export default withDatagrid(connect(makeMapStateToProps, mapDispatchToProps)(CompanyInventoryTable))