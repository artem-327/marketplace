import { connect } from 'react-redux'

import InventoryFilter from './InventoryFilter'
import * as Actions from '../actions'
import { currency } from '~/constants/index'
import { getAutocompleteData, applyDatagridFilter } from '~/modules/inventory/actions'

import { getSafe } from '~/utils/functions'

function mapStateToProps(store) {
  return {
    ...store.filter,
    ...store.filter.inventory,
    preferredCurrency: getSafe(() => store.auth.identity.preferredCurrency.code, currency),
    autocompleteDataLoading: store.simpleAdd.autocompleteDataLoading,
    autocompleteData: store.simpleAdd.autocompleteData
  }
}

const mapDispatchToProps = {
  getAutocompleteData,
  applyDatagridFilter,
  ...Actions
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryFilter)
