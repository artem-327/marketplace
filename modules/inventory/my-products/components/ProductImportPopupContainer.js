import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
import ProductImportPopup from './ProductImportPopup'
// Actions
import { changeBroadcast } from '../../actions'
import {
  closeImportPopup,
  getStoredCSV,
  postImportProductCSV,
  postImportProductMap,
  clearDataOfCSV,
  closeImportPopupCancel,
  postImportCompanyGenericProductCSV,
  postImportCompanyGenericProductMap,
  postImportProductOfferCSV,
  postImportProductOfferMap,
  handleSaveMapCSV,
  postImportCompaniesCSV,
  postImportCompaniesMap,
  changeCsvHeader
} from '../../../settings/actions'
import { getTemplates } from '../../../broadcast/actions'
// Services
import { getSafe } from '../../../../utils/functions'
// Selectors
import {
    makeGetApplicationName,
    makeGetCsvFileId,
    makeGetCSV,
    makeGetIsSaveMapCSV,
    makeGetMappedDataHeaderCSV,
    makeGetMappedHeaders,
    makeGetMissingRequired,
    makeGetSelectedSavedMap,
    makeGetCsvImportError,
    makeGetReloadFilter,
    makeGetCsvWithoutHeader,
    makeGetBroadcastTemplates,
    makeGetBroadcastOption,
    makeGetLoading
} from '../../selectors'

const mapDispatchToProps = {
    closeImportPopup,
    getStoredCSV,
    postImportProductCSV,
    postImportProductMap,
    clearDataOfCSV,
    closeImportPopupCancel,
    postImportCompanyGenericProductCSV,
    postImportCompanyGenericProductMap,
    postImportProductOfferCSV,
    postImportProductOfferMap,
    handleSaveMapCSV,
    postImportCompaniesCSV,
    postImportCompaniesMap,
    changeCsvHeader,
    getTemplates,
    changeBroadcast
}

const makeMapStateToProps = () => {
    const getApplicationName = makeGetApplicationName()
    const getCsvFileId = makeGetCsvFileId()
    const getCSV = makeGetCSV()
    const getIsSaveMapCSV = makeGetIsSaveMapCSV()
    const getMappedDataHeaderCSV = makeGetMappedDataHeaderCSV()
    const getMappedHeaders = makeGetMappedHeaders()
    const getMissingRequired = makeGetMissingRequired()
    const getSelectedSavedMap = makeGetSelectedSavedMap()
    const getCsvImportError = makeGetCsvImportError()
    const getReloadFilter = makeGetReloadFilter()
    const getCsvWithoutHeader = makeGetCsvWithoutHeader()
    const getBroadcastTemplates = makeGetBroadcastTemplates()
    const getBroadcastOption = makeGetBroadcastOption()
    const getLoading = makeGetLoading()

    const mapStateToProps = (state, { companies, companyGenericProduct }) => {
        return {
            applicationName: getApplicationName(state),
            csvFileId: getCsvFileId(state),
            CSV: getCSV(state),
            isSaveMapCSV: getIsSaveMapCSV(state),
            mappedDataHeaderCSV: getMappedDataHeaderCSV(state),
            mappedHeaders: getMappedHeaders(state),
            missingRequired: getMissingRequired(state),
            selectedSavedMap: getSelectedSavedMap(state),
            csvImportError: getCsvImportError(state),
            reloadFilter: getReloadFilter(state),
            csvWithoutHeader: getCsvWithoutHeader(state),
            broadcastTemplates: getBroadcastTemplates(state),
            broadcastOption: getBroadcastOption(state),
            companies: getSafe(() => companies, false),
            companyGenericProduct: getSafe(() => companyGenericProduct, false),
            loading: getLoading(state)
        }
    }
    return mapStateToProps
}
export default connect(makeMapStateToProps, mapDispatchToProps)(injectIntl(withToastManager(ProductImportPopup)))
