import { connect } from 'react-redux'

import InventoryFilter from './InventoryFilter'
import * as Actions from '../actions'
import {
  getPackagingTypes,
  getProductConditions,
  getProductForms,
  getProductGrades
} from '../../global-data/actions'
import { currency } from '~/constants/index'
import { getAutocompleteData, applyDatagridFilter } from '~/modules/inventory/actions'

import { getSafe } from '~/utils/functions'

function mapStateToProps(store) {
  return {
    ...store.filter,
    ...store.filter.inventory,
    preferredCurrency: getSafe(() => store.auth.identity.preferredCurrency.code, currency),
    autocompleteDataLoading: store.simpleAdd.autocompleteDataLoading,
    autocompleteData: store.simpleAdd.autocompleteData,
    productConditions: store.globalData.productConditions,
    productConditionsLoading: store.globalData.productConditionsLoading,
    productForms: store.globalData.productForms,
    productFormsLoading: store.globalData.productFormsLoading,
    productGrades: store.globalData.productGrades,
    productGradesLoading: store.globalData.productGradesLoading,
    packagingTypes: store.globalData.packagingTypes,
    packagingTypesUnique: store.globalData.packagingTypesUnique,
    packagingTypesLoading: store.globalData.packagingTypesLoading
  }
}

const mapDispatchToProps = {
  getAutocompleteData,
  applyDatagridFilter,
  getPackagingTypes,
  getProductConditions,
  getProductForms,
  getProductGrades,
  ...Actions
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryFilter)
