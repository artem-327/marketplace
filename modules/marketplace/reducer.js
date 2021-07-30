import typeToReducer from 'type-to-reducer'
// Services
import { uniqueArrayByKey, getSafe } from '../../utils/functions'
// Actions
import {
  findProducts,
  getAutocompleteData,
  clearAutocompleteData,
  applyDatagridFilter,
  handleVariableSave,
  createHold,
  getCountHolds,
  rejectHold,
  cancelHold,
  approveHold,
  toCartHold,
  toggleHolds,
  openPopup,
  closePopup,
  makeOffer,
  deleteOffer,
  acceptOffer,
  rejectOffer,
  counterOffer,
  addOfferToCart,
  searchCompanies,
  saveSellerOption
} from './actions'

export const initialState = {
  searchedCompanies: [],
  searchedCompaniesLoading: false,
  loading: false,
  updating: false,
  autocompleteData: [],
  autocompleteDataLoading: false,
  datagridFilter: { filters: [] },
  datagridFilterReload: false,
  datagridFilterUpdate: false,
  tableHandlersFiltersListings: null,
  holds: [],
  typeHolds: 'my',
  countHolds: '',
  tableHandlersFiltersHolds: null,
  tableHandlersFiltersBidsSent: null,
  tableHandlersFiltersBidsReceived: null,
  isOpenPopup: false,
  popupValues: null,
  selectedSellerOption: null
}


export default typeToReducer(
  {
    [getAutocompleteData.pending]: (state, action) => {
      return {
        ...state,
        autocompleteDataLoading: true
      }
    },
    [getAutocompleteData.rejected]: (state, action) => {
      return {
        ...state,
        autocompleteDataLoading: false
      }
    },
    [getAutocompleteData.fulfilled]: (state, action) => {
      return {
        ...state,
        autocompleteDataLoading: false,
        autocompleteData: state.autocompleteData.concat(
          uniqueArrayByKey(action.payload, 'id').map(el => {
            const productName = getSafe(() => el.name, '')
            return {
              ...el,
              key: el.id,
              text: productName,
              value: JSON.stringify({
                id: el.id,
                name: productName
              }),
              content: {
                productName: productName,
                casProducts: getSafe(() => el.companyGenericProduct.elements, [])
              }
            }
          })
        )
      }
    },
    [clearAutocompleteData]: (state, action) => {
      return {
        ...state,
        autocompleteData: []
      }
    },
    [applyDatagridFilter]: (state, action) => {
      return {
        ...state,
        datagridFilter: action.payload.filter,
        datagridFilterReload: action.payload.reload,
        datagridFilterUpdate: !state.datagridFilterUpdate
      }
    },
    [handleVariableSave]: (state, action) => {
      return {
        ...state,
        [action.payload.variable]: action.payload.value
      }
    },
    [createHold.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [createHold.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [createHold.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        holds: action.payload
      }
    },
    [getCountHolds.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [getCountHolds.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [getCountHolds.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        countHolds: action.payload.data
      }
    },
    [rejectHold.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [rejectHold.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [rejectHold.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        holds: action.payload.data
      }
    },
    [cancelHold.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [cancelHold.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [cancelHold.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        holds: action.payload.data
      }
    },
    [approveHold.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [approveHold.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [approveHold.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        holds: action.payload.data
      }
    },
    [toCartHold.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [toCartHold.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [toCartHold.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        holds: action.payload.data
      }
    },
    [toggleHolds]: (state, action) => {
      return {
        ...state,
        typeHolds: action.payload
      }
    },
    [openPopup]: (state, action) => {
      return {
        ...state,
        isOpenPopup: true,
        popupValues: action.payload
      }
    },
    [closePopup]: (state, action) => {
      return {
        ...state,
        isOpenPopup: false,
        popupValues: null
      }
    },
    [makeOffer.pending]: (state, action) => {
      return {
        ...state,
        updating: true
      }
    },
    [makeOffer.rejected]: (state, action) => {
      return {
        ...state,
        updating: false
      }
    },
    [makeOffer.fulfilled]: (state, action) => {
      return {
        ...state,
        updating: false
      }
    },
    [deleteOffer.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [deleteOffer.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [deleteOffer.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [acceptOffer.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [acceptOffer.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [acceptOffer.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [rejectOffer.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [rejectOffer.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [rejectOffer.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [counterOffer.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [counterOffer.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [counterOffer.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [addOfferToCart.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [addOfferToCart.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [addOfferToCart.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [searchCompanies.pending]: (state, action) => {
      return {
        ...state,
        searchedCompaniesLoading: true
      }
    },
    [searchCompanies.rejected]: (state, action) => {
      return {
        ...state,
        searchedCompaniesLoading: false
      }
    },
    [searchCompanies.fulfilled]: (state, action) => {
      return {
        ...state,
        searchedCompaniesLoading: false,
        searchedCompanies: action.payload
      }
    },
    [saveSellerOption]: (state, action) => {
      return {
        ...state,
        selectedSellerOption: action.payload
      }
    },
  },
  initialState
)
