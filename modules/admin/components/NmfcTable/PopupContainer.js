import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
// Components
import Popup from './Popup'
// Actions
import { closeAddPopup } from '../../actions'
import { addNmfcNumber, editNmfcNumber } from '../../actions'
// Selectors
import { makeGetConfig, makeGetPopupValues } from '../../selectors'

const mapDispatchToProps = {
    closeAddPopup,
    addNmfcNumber,
    editNmfcNumber
}

const makeMapStateToProps = () => {
    const getConfig = makeGetConfig()
    const getPopupValues = makeGetPopupValues()
    
    const mapStateToProps = state => {
        let cfg = getConfig(state) 

        return {
            config: cfg['nmfc-numbers'],
            popupValues: getPopupValues(state)
        }
    }
    return mapStateToProps
}

export default connect(makeMapStateToProps, mapDispatchToProps)(injectIntl(Popup))
