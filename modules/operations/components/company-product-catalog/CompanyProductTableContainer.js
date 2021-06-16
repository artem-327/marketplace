import { connect } from 'react-redux'
// Components
import CompanyProductTable from './CompanyProductTable'
// Services
import { withDatagrid } from '../../../datagrid'
import { getRows } from './CompanyProductTable.services'
// Selectors
import { makeGetFilterValue, makeGetLoading } from '../../selectors'

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

export default withDatagrid(connect(makeMapStateToProps, mapDispatchToProps)(CompanyProductTable))