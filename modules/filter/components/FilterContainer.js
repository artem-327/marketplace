import { connect } from 'react-redux'

import Filter from './Filter'
import * as Actions from '../actions'

import {
  fetchProductConditions,
  fetchProductForms,
  fetchPackagingTypes,
  fetchProductGrade
} from '~/src/modules/products'

import { fetchWarehouseDistances } from '~/src/modules/location'

function mapStateToProps(store) {
  return {
    ...store.filter.filter,
    ...store.filter.products,
    preferredCurrency: store.auth.identity && store.auth.identity.preferredCurrency,
    warehouseDistances: store.location.warehouseDistances,
  }
}

const mapDispatchToProps = {
  fetchProductConditions,
  fetchProductForms,
  fetchPackagingTypes,
  fetchWarehouseDistances,
  fetchProductGrade,
  ...Actions
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
