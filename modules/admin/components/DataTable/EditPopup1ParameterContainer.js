import { connect } from 'react-redux'
import { closeEditPopup, putEditedDataRequest } from '../../actions'
import {
  getProductForms,
  getProductConditions,
  getProductGrades,
  getPackagingTypes
} from '../../../global-data/actions'
import EditPopup1Parameter from './EditPopup1Parameter'
import { makeGetConfig, makeGetPopupValues } from '../../selectors'

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

    const mapStateToProps = (state, { currentTab }) => {
        let cfg = getConfig(state)
        return {
            config: cfg[currentTab],
            popupValues: getPopupValues(state)
        }
    }
    return mapStateToProps
}

export default connect(makeMapStateToProps, mapDispatchToProps)(EditPopup1Parameter)
  