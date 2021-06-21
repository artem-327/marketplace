import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import FormPopup from './FormPopup'
import {
  closeRegisterDwollaAccount,
  postDwollaAccount
} from '../../actions'
import { getCountries } from '../../../global-data/actions'
import { makeGetPopupValues, makeGetCountries } from '../../selectors'

const mapDispatchToProps = {
    closeRegisterDwollaAccount,
    getCountries,
    postDwollaAccount
}

const makeMapStateToProps = () => {
    const getPopupValues = makeGetPopupValues()
    const getCountries = makeGetCountries()

    const mapStateToProps = state => {
        return {
            popupValues: getPopupValues(state),
            countries: getCountries(state)
        }
    }
    return mapStateToProps
}

export default connect(makeMapStateToProps, mapDispatchToProps)(injectIntl(FormPopup))
