import * as AT from './action-types'

import { uniqueArrayByKey, getSafe } from '~/utils/functions'

export const initialState = {
  fileIds: [],
  listConditions: [],
  listForms: [],
  listGrades: [],
  lotFiles: [],
  poCreated: false,
  searchedManufacturers: [],
  searchedManufacturersLoading: false,
  searchedOrigins: [],
  searchedOriginsLoading: false,
  searchedProductsLoading: false,
  broadcastedProductOffers: [],
  broadcastedProductOffersPageLoaded: -1,
  warehousesList: [],
  loading: false,
  autocompleteData: [],
  autocompleteDataLoading: false,
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {

    case AT.GET_AUTOCOMPLETE_DATA_MARKETPLACE_PENDING: {
      return {
        ...state,
        autocompleteDataLoading: true
      }
    }

    case AT.GET_AUTOCOMPLETE_DATA_MARKETPLACE_FULFILLED: {
      const rVal = {
        ...state,
        autocompleteDataLoading: false,
        autocompleteData: uniqueArrayByKey(payload, 'id').map((el) => {
          const productCode = getSafe(() => el.mfrProductCode, '')
          const productName = getSafe(() => el.mfrProductName, '')
          return {
            key: el.id,
            text: `${productCode} ${productName}`,
            value: JSON.stringify({ id: el.id, name: el.echoProduct.elements[0].casProduct.chemicalName, casNumber: el.echoProduct.elements[0].casProduct.casNumber }),
            content: {
              productCode: productCode,
              productName: productName,
              casProducts: getSafe(() => el.echoProduct.elements, [])
            }
          }
        })
      }
      return rVal
    }

    case AT.GET_AUTOCOMPLETE_DATA_MARKETPLACE_REJECTED: {
      return {
        ...state,
        autocompleteDataLoading: false,
      }
    }


    default: {
      return state
    }
  }
}