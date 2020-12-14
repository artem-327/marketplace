import { connect } from 'react-redux'
import PhoneNumber from './PhoneNumber'
import * as Actions from '../actions'
import { injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'

function mapStateToProps({ phoneNumber, auth }) {
  return {
    defaultCountryCode: getSafe(() => auth.identity.homeBranch.deliveryAddress.address.country.phoneCode, '1'),
    phoneCountryCodes: phoneNumber.phoneCountryCodes.map(d => {
      return {
        key: d.id,
        text: '+' + d.phoneCode,
        value: d.phoneCode,
        description: d.name
      }
    })
  }
}

export default connect(mapStateToProps, Actions)(injectIntl(PhoneNumber))
