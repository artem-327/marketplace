import { connect } from 'react-redux'

import WantedBoardFilter from './WantedBoardFilter'
import * as Actions from '../actions'
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
    }))
  }
}

const mapDispatchToProps = {
  getAutocompleteData,
  applyDatagridFilter,
  searchCasNumber,
  ...Actions
}

export default connect(mapStateToProps, mapDispatchToProps)(WantedBoardFilter)