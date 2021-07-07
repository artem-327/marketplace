import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
// Components
import Map from './Map'
// Actions
import {
  changeHeadersCSV,
  handleSaveMapCSV,
  handleChangeMapCSVName,
  getCSVMapCompanyGenericProduct,
  getCSVMapProductOffer,
  selectSavedMap,
  postCSVMapCompanyGenericProduct,
  putCSVMapCompanyGenericProduct,
  deleteCSVMapCompanyGenericProduct,
  postCSVMapProductOffer,
  putCSVMapProductOffer,
  deleteCSVMapProductOffer,
  getCSVMapCompanies,
  postCSVMapCompanies,
  putCSVMapCompanies,
  deleteCSVMapCompanies
} from '../../../../settings/actions'
// Selectors
import {
    makeGetCsvFileId,
    makeGetCSV,
    makeGetMappedHeaders,
    makeGetMaps,
    makeGetMapName,
    makeGetSelectedSavedMap,
    makeGetCsvWithoutHeader
} from '../../../selectors'

const mapDispatchToProps = {
    changeHeadersCSV,
    handleSaveMapCSV,
    handleChangeMapCSVName,
    getCSVMapCompanyGenericProduct,
    getCSVMapProductOffer,
    selectSavedMap,
    postCSVMapCompanyGenericProduct,
    putCSVMapCompanyGenericProduct,
    deleteCSVMapCompanyGenericProduct,
    postCSVMapProductOffer,
    putCSVMapProductOffer,
    deleteCSVMapProductOffer,
    getCSVMapCompanies,
    postCSVMapCompanies,
    putCSVMapCompanies,
    deleteCSVMapCompanies
}

const makeMapStateToProps = () => {
    const getCsvFileId = makeGetCsvFileId()
    const getCSV = makeGetCSV()
    const getMappedHeaders = makeGetMappedHeaders()
    const getMaps = makeGetMaps()
    const getMapName = makeGetMapName()
    const getSelectedSavedMap = makeGetSelectedSavedMap()
    const getCsvWithoutHeader = makeGetCsvWithoutHeader()

    const mapStateToProps = state => {
        return {
            csvFileId: getCsvFileId(state),
            CSV: getCSV(state),
            mappedHeader: getMappedHeaders(state),
            maps: getMaps(state),
            mapName: getMapName(state),
            selectedSavedMap: getSelectedSavedMap(state),
            csvWithoutHeader: getCsvWithoutHeader(state)
        }
    }
    return mapStateToProps
}

export default injectIntl(connect(makeMapStateToProps, mapDispatchToProps)(withToastManager(Map)))
  