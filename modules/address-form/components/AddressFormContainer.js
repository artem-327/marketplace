import { connect } from 'react-redux'

import AddressForm from './AddressForm'

import { getCountries } from '../../../modules/global-data/actions'
import { getAddressSearch, removeEmpty } from '~/modules/settings/actions'
import { addZip } from '~/modules/zip-dropdown/actions'

function mapStateToProps({ settings, globalData }) {
  let { countries } = globalData
  let addressDatalistOptions = settings.addressSearch.map(
    a =>
      a.streetAddress +
      ', ' +
      a.city +
      ', ' +
      a.zip.zip +
      ', ' +
      a.country.name +
      (a.province ? ', ' + a.province.name : '')
  )

  return {
    countries,
    countriesLoading: globalData.countriesLoading,
    addressDatalistOptions,
    addressDatalistData: settings.addressSearch,
    addressDatalistLength: settings.addressSearch.length,
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
