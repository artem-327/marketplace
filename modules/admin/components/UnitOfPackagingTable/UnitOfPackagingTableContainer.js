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
  deleteUnitOfPackaging
} from '../../actions'
import {
  getProductForms,
  getProductConditions,
  getProductGrades,
  getPackagingTypes,
  getMeasureTypes,
  getUnits
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
  makeGetDeleteRowById,
  makeGetMeasureOptions,
  makeGetUnits
} from '../../selectors'

const mapDispatchToProps = {
    getDataRequest,
    deleteUnitOfPackaging,
    openEditPopup,
    closeConfirmPopup,
    deleteConfirmation,
    getMeasureTypes,
    getUnits,
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
    const getMeasureOptions = makeGetMeasureOptions()
    const getMakeGetUnits = makeGetUnits()

    const mapStateToProps = (state, { datagrid }) => {
        let cfg = getConfig(state)
        return {
            config: cfg['packaging-types'],
            rows: makeRows(datagrid),
            filterValue: getFilterValue(state),
            loading: getLoading(state),
            confirmMessage: getConfirmMessage(state),
            deleteRowById: getDeleteRowById(state),
            measureOptions: getMeasureOptions(state),
            units: getMakeGetUnits(state)
        }
    }
    return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, mapDispatchToProps)(injectIntl(UnitOfPackagingTable)))
  