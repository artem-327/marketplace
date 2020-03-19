import { connect } from 'react-redux'

import WantedBoardFilter from './WantedBoardFilter'
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

function mapStateToProps(store) {
  return {
    ...store.filter.filter,
    ...store.filter.products,
    preferredCurrency: getSafe(() => store.auth.identity.preferredCurrency.code, currency),
    autocompleteDataLoading: store.simpleAdd.autocompleteDataLoading,
    autocompleteData: store.simpleAdd.autocompleteData,
  }
}

const mapDispatchToProps = {
  fetchProductConditions,
  fetchProductForms,
  fetchPackagingTypes,
  fetchProductGrade,
  fetchWarehouses,
  getAutocompleteData,
  applyDatagridFilter,
  ...Actions
}

export default connect(mapStateToProps, mapDispatchToProps)(WantedBoardFilter)