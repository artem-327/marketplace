import { connect } from 'react-redux'
// Components
import EditUnitOfPackagingPopup from './EditUnitOfPackagingPopup'
// Actions
import {
  closeEditPopup,
  postNewRequest,
  putEditedDataRequest,
  getPackagingTypeImage,
  uploadPackagingTypeImage,
  deletePackagingTypeImage
} from '../../actions'
import {
  getProductForms,
  getProductConditions,
  getProductGrades,
  getPackagingTypes
} from '../../../global-data/actions'
// Selectors
import { makeGetConfig, makeGetPopupValues, makeGetDimensionUnits, makeGetWeightUnits } from '../../selectors'
import { makeGetMeasureTypesDropdown } from '../../../global-data/selectors'

const mapDispatchToProps = {
    closeEditPopup,
    postNewRequest,
    putEditedDataRequest,
    getProductForms,
    getProductConditions,
    getProductGrades,
    getPackagingTypes,
    getPackagingTypeImage,
    uploadPackagingTypeImage,
    deletePackagingTypeImage
}

const makeMapStateToProps = () => {
    const getConfig = makeGetConfig()
    const getPopupValues = makeGetPopupValues()
    const getMeasureOptions = makeGetMeasureTypesDropdown()
    const getDimensionUnits = makeGetDimensionUnits()
    const getWeightUnits = makeGetWeightUnits()

    const mapStateToProps = state => {
        let cfg = getConfig(state)
        return {
            config: cfg['packaging-types'],
            popupValues: getPopupValues(state),
            measureOptions: getMeasureOptions(state),
            dimensionUnits: getDimensionUnits(state),
            weightUnits: getWeightUnits(state)
        }
    }
    return mapStateToProps
}

export default connect(makeMapStateToProps, mapDispatchToProps)(EditUnitOfPackagingPopup)
