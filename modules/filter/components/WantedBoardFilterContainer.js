import { connect } from 'react-redux'

import WantedBoardFilter from './WantedBoardFilter'
import * as Actions from '../actions'
import {
  getPackagingTypes,
  getProductConditions,
  getProductForms,
  getProductGrades
} from '../../global-data/actions'
import { currency } from '~/constants/index'
import { getAutocompleteData, applyDatagridFilter, searchCasNumber } from '~/modules/wanted-board/actions'

import { getSafe } from '~/utils/functions'

function mapStateToProps(store) {
  return {
    ...store.filter,
    ...store.filter.wantedBoardListings,
    preferredCurrency: getSafe(() => store.auth.identity.preferredCurrency.code, currency),
    autocompleteDataLoading: store.wantedBoard.autocompleteDataLoading,
    autocompleteData: store.wantedBoard.autocompleteData.map(el => ({
      ...el,
      value: JSON.stringify({
        id: el.key,
        name: el.text
      })
    })),
    searchedCasNumbersLoading: store.wantedBoard.searchedCasNumbersLoading,
    searchedCasNumbers: store.wantedBoard.searchedCasNumbers.map(el => ({
      ...el,
      value: JSON.stringify({
        id: el.key,
        name: el.text
      })
    })),
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
  searchCasNumber,
  getPackagingTypes,
  getProductConditions,
  getProductForms,
  getProductGrades,
  ...Actions
}

export default connect(mapStateToProps, mapDispatchToProps)(WantedBoardFilter)