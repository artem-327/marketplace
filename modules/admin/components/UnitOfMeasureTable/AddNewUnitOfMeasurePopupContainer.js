import { connect } from 'react-redux'
import { closeAddPopup, postNewRequest } from '../../actions'
import AddNewUnitOfMeasurePopup from './AddNewUnitOfMeasurePopup'
import { makeGetConfig, makeGetMeasureOptions } from '../../selectors'

const mapDispatchToProps = {
    closeAddPopup,
    postNewRequest
}

const makeMapStateToProps = () => {
    const getConfig = makeGetConfig()
    const getMeasureOptions = makeGetMeasureOptions()
    
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
