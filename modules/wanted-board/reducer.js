import * as AT from './action-types'
import { uniqueArrayByKey, getSafe } from '~/utils/functions'

export const initialState = {
  editedId: null,
  editWindowOpen: null,
  sidebarValues: null,
  editInitTrig: false,
  loading: false,
  autocompleteData: [],
  autocompleteDataLoading: false,
  listPackagingTypes: [],
  listPackagingTypesLoading: false,
  listConditions: [],
  listConditionsLoading: false,
  listForms: [],
  listFormsLoading: false,
  listGrades: [],
  listGradesLoading: false,
  listWarehouses: [],
  listWarehousesLoading: false,
  listCountries: [],
  listCountriesLoading: false,
  listUnits: [],
  listUnitsLoading: false,
  searchedManufacturers: [],
  searchedManufacturersLoading: false,
  searchedCasNumbers: [],
  searchedCasNumbersLoading: false,
  openedSubmitOfferPopup: false,
  popupValues: null,




  //datagridFilter: { filters: [] },
  //datagridFilterUpdate: false
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {

    case AT.WB_OPEN_SUBMIT_OFFER: {
      return {
        ...state,
        openedSubmitOfferPopup: true,
        popupValues: payload
      }
    }

    case AT.WB_CLOSE_POPUP: {
      return {
        ...state,
        openedSubmitOfferPopup: false,
      }
    }

    case AT.WB_CLOSE_DETAIL_SIDEBAR: {
      return {
        ...state,
        editWindowOpen: null,
      }
    }

    case AT.WB_HANDLE_FILTERS_VALUE: {
      return {
        ...state,
        filterValue: action.payload
      }
    }


    case AT.WB_SIDEBAR_DETAIL_TRIGGER: {
      return {
        ...state,
        editInitTrig: !state.editInitTrig,
        editWindowOpen: payload.activeTab,
        sidebarValues: payload.row
      }
    }

    case AT.WB_GET_AUTOCOMPLETE_DATA_PENDING: { return { ...state, autocompleteDataLoading: true } }
    case AT.WB_GET_AUTOCOMPLETE_DATA_REJECTED: { return { ...state, autocompleteDataLoading: false } }
    case AT.WB_GET_AUTOCOMPLETE_DATA_FULFILLED: {
      return {
        ...state,
        autocompleteDataLoading: false,
        autocompleteData: uniqueArrayByKey(action.payload.map(el => {
            const productCode = getSafe(() => el.intProductCode, el.mfrProductCode)
            const productName = getSafe(() => el.intProductName, el.mfrProductName)
            return {
              ...el,
              key: el.id,
              text: `${productName} ${productCode}`,
              value: JSON.stringify({
                id: el.id,
                name: productName,
                casNumber: productCode
              }),
              content: {
                productCode: productCode,
                productName: productName,
                casProducts: getSafe(() => el.echoProduct.elements, [])
              }
            }
          })
          .concat(state.autocompleteData), 'key')
      }
    }

    case AT.WB_GET_PACKAGING_TYPES_PENDING: { return { ...state, listPackagingTypesLoading: true } }
    case AT.WB_GET_PACKAGING_TYPES_REJECTED: { return { ...state, listPackagingTypesLoading: false } }
    case AT.WB_GET_PACKAGING_TYPES_FULFILLED: {
      return {
        ...state,
        listPackagingTypesLoading: false,
        listPackagingTypes: payload.map(data => {
          return {
            key: data.id,
            value: data.id,
            text: data.name
          }
        })
      }
    }

    case AT.WB_GET_CONDITIONS_PENDING: { return { ...state, listConditionsLoading: true } }
    case AT.WB_GET_CONDITIONS_REJECTED: { return { ...state, listConditionsLoading: false } }
    case AT.WB_GET_CONDITIONS_FULFILLED: {
      return {
        ...state,
        listConditionsLoading: false,
        listConditions: payload.map(data => {
          return {
            key: data.id,
            value: data.id,
            text: data.name
          }
        })
      }
    }

    case AT.WB_GET_FORMS_PENDING: { return { ...state, listFormsLoading: true } }
    case AT.WB_GET_FORMS_REJECTED: { return { ...state, listFormsLoading: false } }
    case AT.WB_GET_FORMS_FULFILLED: {
      return {
        ...state,
        listFormsLoading: false,
        listForms: payload.map(data => {
          return {
            key: data.id,
            value: data.id,
            text: data.name
          }
        })
      }
    }

    case AT.WB_GET_GRADES_PENDING: { return { ...state, listGradesLoading: true } }
    case AT.WB_GET_GRADES_REJECTED: { return { ...state, listGradesLoading: false } }
    case AT.WB_GET_GRADES_FULFILLED: {
      return {
        ...state,
        listGradesLoading: false,
        listGrades: payload.map(data => {
          return {
            key: data.id,
            value: data.id,
            text: data.name
          }
        })
      }
    }

    case AT.WB_GET_UNITS_PENDING: { return { ...state, listUnitsLoading: true } }
    case AT.WB_GET_UNITS_REJECTED: { return { ...state, listUnitsLoading: false } }
    case AT.WB_GET_UNITS_FULFILLED: {
      return {
        ...state,
        listUnitsLoading: false,
        listUnits: payload.map(data => {
          return {
            key: data.id,
            value: data.id,
            text: data.nameAbbreviation
          }
        })
      }
    }

    case AT.WB_GET_WAREHOUSES_PENDING: { return { ...state, listWarehousesLoading: true } }
    case AT.WB_GET_WAREHOUSES_REJECTED: { return { ...state, listWarehousesLoading: false } }
    case AT.WB_GET_WAREHOUSES_FULFILLED: {
      return {
        ...state,
        listWarehousesLoading: false,
        listWarehouses: payload
      }
    }

    case AT.WB_GET_COUNTRIES_PENDING: { return { ...state, listCountriesLoading: true } }
    case AT.WB_GET_COUNTRIES_REJECTED: { return { ...state, listCountriesLoading: false } }
    case AT.WB_GET_COUNTRIES_FULFILLED: {
      return {
        ...state,
        listCountriesLoading: false,
        listCountries: payload.map(data => {
          return {
            key: data.id,
            value: data.id,
            text: data.name
          }
        })
      }
    }

    case AT.WB_SEARCH_MANUFACTURERS_PENDING: { return { ...state, searchedManufacturersLoading: true } }
    case AT.WB_SEARCH_MANUFACTURERS_REJECTED: { return { ...state, searchedManufacturersLoading: false } }
    case AT.WB_SEARCH_MANUFACTURERS_FULFILLED: {
      return {
        ...state,
        searchedManufacturersLoading: false,
        searchedManufacturers: uniqueArrayByKey(action.payload.map(data => {
          return {
            key: data.id,
            value: data.id,
            text: data.name
          }
        })
          .concat(state.searchedManufacturers), 'key')
      }
    }

    case AT.WB_SEARCH_CAS_NUMBER_PENDING: { return { ...state, searchedCasNumbersLoading: true } }
    case AT.WB_SEARCH_CAS_NUMBER_REJECTED: { return { ...state, searchedCasNumbersLoading: false } }
    case AT.WB_SEARCH_CAS_NUMBER_FULFILLED: {
      return {
        ...state,
        searchedCasNumbersLoading: false,
        searchedCasNumbers: uniqueArrayByKey(action.payload.map(data => {
          return {
            key: data.id,
            value: data.id,
            text: data.casNumber
          }
        })
          .concat(state.searchedCasNumbers), 'key')
      }
    }



    default: {
      return state
    }
  }
}
