import * as AT from './action-types'

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
  broadcastedProductOffers: [],
  broadcastedProductOffersPageLoaded: -1,
  searchedProducts: [],
  searchedProductsLoading: false,
  warehousesList: [],
  loading: false
}

export default function reducer(state = initialState, action) {
    const {type, payload} = action

    switch (type) {
        case AT.MARKETPLACE_GET_BROADCASTED_PRODUCT_OFFERS_PENDING: {
          return { ...state,
            loading: true
          }
        }

        case AT.MARKETPLACE_GET_BROADCASTED_PRODUCT_OFFERS_FULFILLED: {
          let {data, pageNumber} = action.payload
          return {
            ...state,
            loading: false,
            broadcastedProductOffers: [
              ...state.broadcastedProductOffers,
              ...(pageNumber > state.broadcastedProductOffersPageLoaded ? data : [])
            ],
            broadcastedProductOffersPageLoaded: pageNumber
          }
        }

        default: {
          return state
        }
    }
}