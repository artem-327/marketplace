import { connect } from 'react-redux'
// Components
import EditUnitOfMeasurePopup from './EditUnitOfMeasurePopup'
// Actions
import { closeEditPopup, putEditedDataRequest } from '../../actions'
// Selectors
import { makeGetConfig, makeGetPopupValues } from '../../selectors'
import { makeGetMeasureTypesDropdown } from '../../../global-data/selectors'

const mapDispatchToProps = {
    closeEditPopup,
    putEditedDataRequest
}

const makeMapStateToProps = () => {
    const getConfig = makeGetConfig()
    const getMeasureOptions = makeGetMeasureTypesDropdown()
    const getPopupValues = makeGetPopupValues()
    
    const mapStateToProps = state => {
        let cfg = getConfig(state)
        return {
            config: cfg['units-of-measure'],
            popupValues: getPopupValues(state),
            measureOptions: getMeasureOptions(state)
        }
    }
    return mapStateToProps
}

export default connect(makeMapStateToProps, mapDispatchToProps)(EditUnitOfMeasurePopup)
