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
    ...store.filter,
    warehouseDistances: store.location.warehouseDistances,
    packagingTypes: store.products.packagingTypes,
    productConditions: store.products.productConditions,
    productForms: store.products.productForms,
    productAge: store.products.productAge,
    productGradeTypes: store.products.productGrade,
    location: store.products.location
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
