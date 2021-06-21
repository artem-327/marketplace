import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { injectIntl } from 'react-intl'
import { withDatagrid } from '../../../datagrid'
import AddEditLogisticProvider from './AddEditLogisticProvider'
import { makeGetPopupValues, makeGetlogisticsProvidersFetching, makeGetLogisticsProviders, makeGetUpdating } from '../../selectors'

const makeMapStateToProps = () => {
    const getPopupValues = makeGetPopupValues()
    const getlogisticsProvidersFetching = makeGetlogisticsProvidersFetching()
    const getLogisticsProviders = makeGetLogisticsProviders()
    const getUpdating = makeGetUpdating()

    const mapStateToProps = state => {
        return {
            popupValues: getPopupValues(state),
            logisticsProvidersFetching: getlogisticsProvidersFetching(state),
            logisticsProviders: getLogisticsProviders(state),
            updating: getUpdating(state)
        }
    }
    return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, Actions)(injectIntl(AddEditLogisticProvider)))
