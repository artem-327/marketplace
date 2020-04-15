import { connect } from 'react-redux'

import Filter from './Filter'
import * as Actions from '../actions'
import { currency } from '~/constants/index'
import { getAutocompleteData, applyDatagridFilter } from '~/modules/marketplace/actions'

import { getSafe } from '~/utils/functions'

import { fetchWarehouseDistances } from '~/src/modules/location'

function mapStateToProps(store) {
  return {
    ...store.filter,
    ...store.filter.marketplace,
    preferredCurrency: getSafe(() => store.auth.identity.preferredCurrency.code, currency),
    warehouseDistances: store.location.warehouseDistances,
    autocompleteDataLoading: store.marketplace.autocompleteDataLoading,
    autocompleteData: store.marketplace.autocompleteData,
  }
}

const mapDispatchToProps = {
  fetchWarehouseDistances,
  getAutocompleteData,
  applyDatagridFilter,
  ...Actions
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
