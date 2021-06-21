import { connect } from 'react-redux'
import EditUnitOfMeasurePopup from './EditUnitOfMeasurePopup'
import { closeEditPopup, putEditedDataRequest } from '../../actions'
import { makeGetConfig, makeGetMeasureOptions, makeGetPopupValues } from '../../selectors'

const mapDispatchToProps = {
    closeEditPopup,
    putEditedDataRequest
}

const makeMapStateToProps = () => {
    const getConfig = makeGetConfig()
    const getMeasureOptions = makeGetMeasureOptions()
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
