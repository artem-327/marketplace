import { connect } from 'react-redux'

import Filter from './Filter'
import * as Actions from '../actions'
import {
  getCountries,
  getPackagingTypes,
  getProductConditions,
  getProductForms,
  getProductGrades
} from '../../global-data/actions'
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
    countriesLoading: store.globalData.countriesLoading,
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
  getCountries,
  getPackagingTypes,
  getProductConditions,
  getProductForms,
  getProductGrades,
  ...Actions
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
