import * as AT from './action-types'

import {uniqueArrayByKey, getSafe} from '~/utils/functions'

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
  autocompleteDataLoading: false
}

export default function reducer(state = initialState, action) {
  const {type, payload} = action

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
        autocompleteData: uniqueArrayByKey(payload, 'id').map(el => {
          const productCode = getSafe(() => el.code, '')
          const productName = getSafe(() => el.name, '')

          return {
            ...el,
            key: el.id,
            text: `${productName} ${productCode} `,
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
      }
      return rVal
    }

    case AT.GET_AUTOCOMPLETE_DATA_MARKETPLACE_REJECTED: {
      return {
        ...state,
        autocompleteDataLoading: false
      }
    }

    default: {
      return state
    }
  }
}
