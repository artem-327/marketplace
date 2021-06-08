import { connect } from 'react-redux'

import Filter from './Filter'
import * as Actions from '../actions'
import { getCountries } from '../../global-data/actions'
import { currency } from '~/constants/index'
import { getAutocompleteData, applyDatagridFilter } from '~/modules/marketplace/actions'

import { getSafe } from '~/utils/functions'

function mapStateToProps(store) {
  return {
    ...store.filter,
    ...store.filter.marketplace,
    preferredCurrency: getSafe(() => store.auth.identity.preferredCurrency.code, currency),
    autocompleteDataLoading: store.marketplace.autocompleteDataLoading,
    autocompleteData: store.marketplace.autocompleteData,
    countries: store.globalData.countries,
    countriesLoading: store.globalData.countriesLoading
  }
}

const mapDispatchToProps = {
  getAutocompleteData,
  applyDatagridFilter,
  getCountries,
  ...Actions
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
