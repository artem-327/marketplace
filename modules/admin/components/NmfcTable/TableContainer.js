import Table from './Table'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
import { withDatagrid } from '../../../datagrid'
import { deleteNmfcNumber, openEditPopup } from '../../actions'
import { makeGetFilterValue, makeGetLoading, makeGetConfig } from '../../selectors'

const mapDispatchToProps = { deleteNmfcNumber, openEditPopup }

const makeMapStateToProps = () => {
    const getFilterValue = makeGetFilterValue()
    const getLoading = makeGetLoading()
    const getConfig = makeGetConfig()

    const mapStateToProps = state => {
        let cfg = getConfig(state)
        return {
            filterValue: getFilterValue(state),
            loading: getLoading(state),
            config: cfg['nmfc-numbers']
        }
    }
    return mapStateToProps
}

export default connect(makeMapStateToProps, mapDispatchToProps)(withDatagrid(withToastManager(injectIntl(Table))))
