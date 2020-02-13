import { connect } from 'react-redux'

import InventoryFilter from './InventoryFilter'
import * as Actions from '../actions'
import { currency } from '~/constants/index'
import { getAutocompleteData, applyDatagridFilter } from '~/modules/inventory/actions'

import {
  fetchProductConditions,
  fetchProductForms,
  fetchPackagingTypes,
  fetchProductGrade,
  fetchWarehouses,
  fetchManufacturer
} from '~/src/modules/products'

import { getSafe } from '~/utils/functions'

import { fetchWarehouseDistances } from '~/src/modules/location'

function mapStateToProps(store) {
  return {
    ...store.filter.filter,
    ...store.filter.products,
    preferredCurrency: getSafe(() => store.auth.identity.preferredCurrency.code, currency),
    warehouseDistances: store.location.warehouseDistances,
    autocompleteDataLoading: store.simpleAdd.autocompleteDataLoading,
    autocompleteData: store.simpleAdd.autocompleteData,
  }
}

const mapDispatchToProps = {
  fetchProductConditions,
  fetchProductForms,
  fetchPackagingTypes,
  fetchWarehouseDistances,
  fetchProductGrade,
  fetchWarehouses,
  getAutocompleteData,
  applyDatagridFilter,
  ...Actions
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryFilter)
