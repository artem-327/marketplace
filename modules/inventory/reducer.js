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
    searchedProducts: [],
    searchedProductsLoading: false,
    warehousesList: []
}

export default function reducer(state = initialState, action) {
    const {type, payload} = action

    switch (type) {
        case AT.INVENTORY_ADD_PRODUCT_OFFER_FULFILLED: {
          return {
            ...state,
            poCreated: true
          }
        }

        case AT.INVENTORY_GET_PRODUCT_CONDITIONS_FULFILLED: {
          return {
            ...state,
            listConditions: action.payload.data.map(condition => {
              return {
                key: condition.id,
                value: condition.id,
                text: condition.name
              }
            })
          }
        }

        case AT.INVENTORY_GET_PRODUCT_FORMS_FULFILLED: {
          return {
            ...state,
            listForms: action.payload.data.map(form => {
              return {
                key: form.id,
                value: form.id,
                text: form.name
              }
            })
          }
        }

        case AT.INVENTORY_GET_PRODUCT_GRADES_FULFILLED: {
          return {
            ...state,
            listGrades: action.payload.data.map(grade => {
              return {
                key: grade.id,
                value: grade.id,
                text: grade.name
              }
            })
          }
        }

        case AT.INVENTORY_GET_PRODUCT_OFFER_FULFILLED: {
          let {data} = action.payload
          return {
            ...state,
            ...action.payload.data,
            fileIds: action.payload.data.attachments.map(att => {
              att.attachment = true
              return att
            }).concat(state.fileIds),
            poCreated: false,
            searchedManufacturers: action.payload.data.manufacturer ? [{
              key: action.payload.data.manufacturer.id,
              value: action.payload.data.manufacturer.id,
              text: action.payload.data.manufacturer.name
            }] : [],
            searchedOrigins: action.payload.data.origin ? [{
              key: action.payload.data.origin.id,
              value: action.payload.data.origin.id,
              text: action.payload.data.origin.name
            }]: []
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

        case AT.INVENTORY_RESET_FORM: {
          return {
            ...initialState
          }
        }

        case AT.INVENTORY_SEARCH_MANUFACTURERS_PENDING: {
          return {
            ...state,
            searchedManufacturersLoading: true
          }
        }

        case AT.INVENTORY_SEARCH_MANUFACTURERS_FULFILLED: {
          return {
            ...state,
            searchedManufacturers: action.payload.data,
            searchedManufacturersLoading: false
          }
        }

        case AT.INVENTORY_SEARCH_ORIGINS_PENDING: {
          return {
            ...state,
            searchedOriginsLoading: true
          }
        }

        case AT.INVENTORY_SEARCH_ORIGINS_FULFILLED: {
          return {
            ...state,
            searchedOrigins: action.payload.data,
            searchedOriginsLoading: false
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
          if (action.payload.data.fileType === 'Spec Sheet') {
            state.fileIds.push(
              action.payload.data.fileId
            )
          } else {
            state.lotFiles.push(
              {
                id: action.payload.data.fileId,
                name: action.payload.data.fileName,
                lotId: 0
              }
            )
          }

          return {
            ...state
          }
        }

        default: {
          return state
        }
    }
}