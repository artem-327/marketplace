import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
// Components
import LogisticsTable from './LogisticsTable'
// Actions 
import { deleteLogisticsProvider, openPopup } from '../../actions'
// Services
import { withDatagrid } from '../../../datagrid'
import { makeRows } from './LogisticsTable.services'
// Selectors
import { makeGetEditId, makeGetFilterValue, makeGetLoading } from '../../selectors'

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
