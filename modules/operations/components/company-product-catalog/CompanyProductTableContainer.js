import { connect } from 'react-redux'
import CompanyProductTable from './CompanyProductTable'
import { withDatagrid } from '../../../datagrid'
import { makeGetFilterValue, makeGetLoading } from '../../selectors'
import { getRows } from './CompanyProductTable.services'

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