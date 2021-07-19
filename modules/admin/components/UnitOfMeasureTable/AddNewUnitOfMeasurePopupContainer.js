import { connect } from 'react-redux'
// Components
import AddNewUnitOfMeasurePopup from './AddNewUnitOfMeasurePopup'
// Actions
import { closeAddPopup, postNewRequest } from '../../actions'
// Selectors
import { makeGetConfig } from '../../selectors'
import { makeGetMeasureTypesDropdown } from '../../../global-data/selectors'

const mapDispatchToProps = {
    closeAddPopup,
    postNewRequest
}

const makeMapStateToProps = () => {
    const getConfig = makeGetConfig()
    const getMeasureOptions = makeGetMeasureTypesDropdown()
    
    const mapStateToProps = state => {
        let cfg = getConfig(state)
        return {
            config: cfg['units-of-measure'],
            measureOptions: getMeasureOptions(state)
        }
    }
    return mapStateToProps
}

export default connect(makeMapStateToProps, mapDispatchToProps)(AddNewUnitOfMeasurePopup)
