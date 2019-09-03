import { connect } from 'react-redux'

import AddressForm from './AddressForm'

import { getCountries } from '~/modules/settings/actions'
import { getAddressSearch, removeEmpty } from '~/modules/settings/actions'
import { addZip } from '~/modules/zip-dropdown/actions'

function mapStateToProps({ settings }) {
  let { countries } = settings
  let addressDatalistOptions = settings.addressSearch.map((a) => (
    a.streetAddress + ', ' + a.city + ', ' + a.zip.zip + ', ' + a.country.name + (a.province ? ', ' + a.province.name : '')
  ))

  return {
    countries,
    countriesLoading: settings.countriesLoading,
    addressDatalistOptions,
    addressDatalistData: settings.addressSearch,
    loading: settings.loading
  }
}

const mapDispatchToProps = {
  getCountries,
  getAddressSearch,
  removeEmpty,
  addZip
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm)
