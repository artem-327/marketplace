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
  listConditions: [],
  listForms: [],
  listGrades: [],
  listWarehouses: [],
  listCountries: [],
  searchedManufacturers: [],
  searchedManufacturersLoading: false,







  datagridFilter: { filters: [] },
  datagridFilterUpdate: false
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {

    case AT.WB_CLOSE_DETAIL_SIDEBAR: {
      return {
        ...state,
        editWindowOpen: null,
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

    case AT.WB_GET_AUTOCOMPLETE_DATA_PENDING: {
      return {
        ...state,
        autocompleteDataLoading: true
      }
    }
    case AT.WB_GET_AUTOCOMPLETE_DATA_FULFILLED: {
      return {
        ...state,
        autocompleteDataLoading: false,
        autocompleteData: uniqueArrayByKey(action.payload, 'id')
          .map(el => {
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
          .concat(state.autocompleteData)
      }
    }
    case AT.WB_GET_AUTOCOMPLETE_DATA_REJECTED: {
      return {
        ...state,
        autocompleteDataLoading: false
      }
    }





    case AT.WB_GET_PACKAGING_TYPES_FULFILLED: {
      console.log('!!!!!!!!!! WB_GET_PACKAGING_TYPES_FULFILLED payload', payload)
      return {
        ...state,
        listPackagingTypes: payload.map(data => {
          return {
            key: data.id,
            value: data.id,
            text: data.name
          }
        })
      }
    }
    case AT.WB_GET_CONDITIONS_FULFILLED: {
      console.log('!!!!!!!!!! WB_GET_CONDITIONS_FULFILLED payload', payload)
      return {
        ...state,
        listConditions: payload.map(data => {
          return {
            key: data.id,
            value: data.id,
            text: data.name
          }
        })
      }
    }
    case AT.WB_GET_FORMS_FULFILLED: {
      console.log('!!!!!!!!!! WB_GET_FORMS_FULFILLED payload', payload)
      return {
        ...state,
        listForms: payload.map(data => {
          return {
            key: data.id,
            value: data.id,
            text: data.name
          }
        })
      }
    }
    case AT.WB_GET_GRADES_FULFILLED: {
      console.log('!!!!!!!!!! WB_GET_GRADES_FULFILLED payload', payload)
      return {
        ...state,
        listGrades: payload.map(data => {
          return {
            key: data.id,
            value: data.id,
            text: data.name
          }
        })
      }
    }
    case AT.WB_GET_WAREHOUSES_FULFILLED: {
      console.log('!!!!!!!!!! WB_GET_WAREHOUSES_FULFILLED payload', payload)
      return {
        ...state,
        listWarehouses: payload
      }
    }
    case AT.WB_GET_COUNTRIES_FULFILLED: {
      console.log('!!!!!!!!!! WB_GET_COUNTRIES_FULFILLED payload', payload)
      return {
        ...state,
        listCountries: payload.map(data => {
          return {
            key: data.id,
            value: data.id,
            text: data.name
          }
        })
      }
    }

    case AT.WB_SEARCH_MANUFACTURERS_PENDING: {
      return {
        ...state,
        searchedManufacturersLoading: true,
      }
    }
    case AT.WB_SEARCH_MANUFACTURERS_REJECTED: {
      return {
        ...state,
        searchedManufacturersLoading: false,
      }
    }
    case AT.WB_SEARCH_MANUFACTURERS_FULFILLED: {
      console.log('!!!!!!!!!! WB_SEARCH_MANUFACTURERS_FULFILLED payload', payload)
      return {
        ...state,
        searchedManufacturers: payload.map(data => {
          return {
            key: data.id,
            value: data.id,
            text: data.name
          }
        }),
        searchedManufacturersLoading: false,
      }
    }



    default: {
      return state
    }
  }
}
