import { connect } from 'react-redux'
import PhoneNumber from './PhoneNumber'
import { getCountries } from '../../global-data/actions'
import { injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'

function mapStateToProps({ globalData, auth }) {
  return {
    defaultCountryCode: getSafe(() => auth.identity.homeBranch.deliveryAddress.address.country.phoneCode, '1'),
    phoneCountryCodes: globalData.countries.map(d => {
      return {
        key: d.id,
        text: '+' + d.phoneCode,
        value: d.phoneCode,
        description: d.name
      }
    }),
    phoneCountryCodesLoading: globalData.countriesLoading
  }
}

export default connect(mapStateToProps, { getCountries })(injectIntl(PhoneNumber))
