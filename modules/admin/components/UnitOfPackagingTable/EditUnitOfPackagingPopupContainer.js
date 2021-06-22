import { connect } from 'react-redux'
// Components
import EditUnitOfPackagingPopup from './EditUnitOfPackagingPopup'
// Actions
import {closeEditPopup, putEditedDataRequest} from '../../actions'
import {
  getProductForms,
  getProductConditions,
  getProductGrades,
  getPackagingTypes
} from '../../../global-data/actions'
// Selectors
import { makeGetConfig, makeGetPopupValues, makeGetMeasureOptions, makeGetDimensionUnits, makeGetWeightUnits } from '../../selectors'

const mapDispatchToProps = {
    closeEditPopup,
    putEditedDataRequest,
    getProductForms,
    getProductConditions,
    getProductGrades,
    getPackagingTypes
}

const makeMapStateToProps = () => {
    const getConfig = makeGetConfig()
    const getPopupValues = makeGetPopupValues()
    const getMeasureOptions = makeGetMeasureOptions()
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
