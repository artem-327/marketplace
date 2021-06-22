import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
// Components
import UnitOfPackagingTable from './UnitOfPackagingTable'
// Actions
import {
  getDataRequest,
  openEditPopup,
  closeConfirmPopup,
  deleteConfirmation,
  deleteUnitOfPackaging,
  getMeasureTypesDataRequest,
  getAllUnitsOfMeasuresDataRequest
} from '../../actions'
import {
  getProductForms,
  getProductConditions,
  getProductGrades,
  getPackagingTypes
} from '../../../global-data/actions'
// Services
import { withDatagrid } from '../../../datagrid'
import { makeRows } from './UnitOfPackagingTable.services'
// Selectors
import {
    makeGetConfig,
    makeGetFilterValue,
    makeGetLoading,
    makeGetConfirmMessage,
    makeGetDeleteRowById
} from '../../selectors'

const mapDispatchToProps = {
    getDataRequest,
    deleteUnitOfPackaging,
    openEditPopup,
    closeConfirmPopup,
    deleteConfirmation,
    getMeasureTypesDataRequest,
    getAllUnitsOfMeasuresDataRequest,
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

    const mapStateToProps = (state, { datagrid }) => {
        let cfg = getConfig(state)
        return {
            config: cfg['packaging-types'],
            rows: makeRows(datagrid),
            filterValue: getFilterValue(state),
            loading: getLoading(state),
            confirmMessage: getConfirmMessage(state),
            deleteRowById: getDeleteRowById(state)
        }
    }
    return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, mapDispatchToProps)(injectIntl(UnitOfPackagingTable)))
  