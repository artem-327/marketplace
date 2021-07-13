import { connect } from 'react-redux'
// Components
import Preview from './Preview'
// Actions
import {
    dataHeaderCSV,
    postCSVMapCompanyGenericProduct,
    putCSVMapCompanyGenericProduct,
    postCSVMapProductOffer,
    putCSVMapProductOffer,
    postCSVMapCompanies,
    putCSVMapCompanies
} from '../../../../settings/actions'
// Selectors
import {
    makeGetMappedHeaders,
    makeGetCSV,
    makeGetIsSaveMapCSV,
    makeGetMapName,
    makeGetSelectedSavedMap,
    makeGetCsvWithoutHeader
} from '../../../selectors'

const mapDispatchToProps = {
    dataHeaderCSV,
    postCSVMapCompanyGenericProduct,
    putCSVMapCompanyGenericProduct,
    postCSVMapProductOffer,
    putCSVMapProductOffer,
    postCSVMapCompanies,
    putCSVMapCompanies
}

const makeMapStateToProps = () => {
    const getMappedHeaders = makeGetMappedHeaders()
    const getCSV = makeGetCSV()
    const getIsSaveMapCSV = makeGetIsSaveMapCSV()
    const getMapName = makeGetMapName()
    const getSelectedSavedMap = makeGetSelectedSavedMap()
    const getCsvWithoutHeader = makeGetCsvWithoutHeader()

    const mapStateToProps = state => {
        return {
            mappedHeader: getMappedHeaders(state),
            CSV: getCSV(state),
            isSaveMapCSV: getIsSaveMapCSV(state),
            mapName: getMapName(state),
            selectedSavedMap: getSelectedSavedMap(state),
            csvWithoutHeader: getCsvWithoutHeader(state)
        }
    }
    return mapStateToProps
}

export default connect(makeMapStateToProps, mapDispatchToProps)(Preview)
  