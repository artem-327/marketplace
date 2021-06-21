import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import DataTable from './DataTable'
import { getDataRequest, openEditPopup, closeConfirmPopup, deleteConfirmation } from '../../actions'
import {
  getProductForms,
  getProductConditions,
  getProductGrades,
  getPackagingTypes
} from '../../../global-data/actions'
import { withDatagrid } from '../../../datagrid'
import { makeGetConfig, makeGetFilterValue, makeGetLoading, makeGetConfirmMessage, makeGetDeleteRowById } from '../../selectors'

const mapDispatchToProps = {
    getDataRequest,
    openEditPopup,
    closeConfirmPopup,
    deleteConfirmation,
    getProductForms,
    getProductConditions,
    getProductGrades,
    getPackagingTypes
}

const makeMapStateToProps = () => {
    const getConfig = makeGetConfig()
    const getFilterValue = makeGetFilterValue()
    const getLoading = makeGetLoading()
    const getConfirmMessage = makeGetConfirmMessage()
    const getDeleteRowById = makeGetDeleteRowById()

    const mapStateToProps = (state, { datagrid, currentTab }) => {
        let cfg = getConfig(state)
        return {
            config: cfg[currentTab],
            rows: datagrid.rows,
            filterValue: getFilterValue(state),
            loading: getLoading(state),
            confirmMessage: getConfirmMessage(state),
            deleteRowById: getDeleteRowById(state)
        }
    }
    return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, mapDispatchToProps)(injectIntl(DataTable)))
