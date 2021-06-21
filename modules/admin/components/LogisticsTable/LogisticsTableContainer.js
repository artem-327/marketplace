import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { deleteLogisticsProvider, openPopup } from '../../actions'
import { withDatagrid } from '../../../datagrid'
import LogisticsTable from './LogisticsTable'
import { makeGetEditId, makeGetFilterValue, makeGetLoading } from '../../selectors'
import { makeRows } from './LogisticsTable.services'

const mapDispatchToProps = {
    deleteLogisticsProvider,
    openPopup
}

const makeMapStateToProps = () => {
    const getEditId = makeGetEditId()
    const getFilterValue = makeGetFilterValue()
    const getLoading = makeGetLoading()

    const mapStateToProps = (state, { datagrid }) => {
        return {
            rows: makeRows(datagrid),
            editId: getEditId(state),
            filterValue: getFilterValue(state),
            loading: getLoading(state)
        }
    }
    return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, mapDispatchToProps)(injectIntl(LogisticsTable)))
