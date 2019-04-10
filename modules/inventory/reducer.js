import * as AT from './action-types'

export const initialState = {
    fileIds: [],
    searchedProducts: [],
    searchedProductsLoading: false,
    warehousesList: []
}

export default function reducer(state = initialState, action) {
    const {type, payload} = action

    switch (type) {
        case AT.INVENTORY_GET_PRODUCT_OFFER_FULFILLED: {
            let {data} = action.payload
            return {
                ...state,
                ...action.payload.data
            }
        }

        case AT.INVENTORY_GET_WAREHOUSES_FULFILLED: {
            return {
                ...state,
                warehousesList: action.payload.data.map((warehouse) => {
                    return {
                      ...warehouse,
                      text: warehouse.name,
                      value: warehouse.id
                    }
                })
            }
        }

        case AT.INVENTORY_SEARCH_PRODUCTS_PENDING: {
            return {
                ...state,
                searchedProductsLoading: true
            }
        }

        case AT.INVENTORY_SEARCH_PRODUCTS_FULFILLED: {
            return {
                ...state,
                searchedProducts: action.payload.data,
                searchedProductsLoading: false
            }
        }

        case AT.INVENTORY_FILL_PRODUCT: {
            return {
              ...state,
              searchedProducts: action.payload.data,
              searchedProductsLoading: false
            }
        }

        case AT.INVENTORY_SET_FILE_ID: {
            state.fileIds.push({
                id: action.payload.fileId
            })

            return {
                ...state
            }
        }

        default: {
            return state
        }
    }
}