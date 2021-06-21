import { connect } from 'react-redux'
import AddNewUnitOfPackagingPopup from './AddNewUnitOfPackagingPopup'
import { closeAddPopup, postNewRequest } from '../../actions'
import {
  getProductForms,
  getProductConditions,
  getProductGrades,
  getPackagingTypes
} from '../../../global-data/actions'
import { makeGetDimensionUnits, makeGetWeightUnits, makeGetMeasureOptions, makeGetConfig } from '../../selectors'

const mapDispatchToProps = {
    closeAddPopup,
    postNewRequest,
    getProductForms,
    getProductConditions,
    getProductGrades,
    getPackagingTypes
}

const makeMapStateToProps = () => {
    const getDimensionUnits = makeGetDimensionUnits()
    const getWeightUnits = makeGetWeightUnits()
    const getMeasureOptions = makeGetMeasureOptions()
    const getConfig = makeGetConfig()

    const mapStateToProps = state => {
        let cfg = getConfig(state)
        return {
            config: cfg['packaging-types'],
            measureOptions: getMeasureOptions(state),
            dimensionUnits: getDimensionUnits(state),
            weightUnits: getWeightUnits(state)
        }
    }
    return mapStateToProps
}

export default connect(makeMapStateToProps, mapDispatchToProps)(AddNewUnitOfPackagingPopup)
  