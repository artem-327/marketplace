import { connect } from 'react-redux'

import InventoryFilter from './InventoryFilter'
import * as Actions from '../actions'
import { currency } from '~/constants/index'

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
    warehouseDistances: store.location.warehouseDistances
  }
}

const mapDispatchToProps = {
  fetchProductConditions,
  fetchProductForms,
  fetchPackagingTypes,
  fetchWarehouseDistances,
  fetchProductGrade,
  fetchWarehouses,
  ...Actions
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryFilter)
