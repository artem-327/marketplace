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
    myProductOffers: [],
    searchedProducts: [],
    searchedProductsLoading: false,
    warehousesList: [],
    loading: false,
}

export default function reducer(state = initialState, action) {
    const {type, payload} = action

    switch (type) {
        case AT.INVENTORY_ADD_PRODUCT_OFFER_PENDING: {
          return {
            ...state,
            loading: true
          }
        }

        case AT.INVENTORY_ADD_PRODUCT_OFFER_FULFILLED: {
          return {
            ...state,
            poCreated: true,
            loading: false
          }
        }

        case AT.INVENTORY_EDIT_PRODUCT_OFFER_PENDING: {
          return {
            ...state,
            loading: true
          }
        }

        case AT.INVENTORY_EDIT_PRODUCT_OFFER_FULFILLED: {
          return {
            ...state,
            poCreated: true,
            loading: false
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

        case AT.INVENTORY_GET_PRODUCT_OFFER_PENDING: {
          return {
            ...state,
            loading: true
          }
        }

        case AT.INVENTORY_GET_PRODUCT_OFFER_FULFILLED: {
          let {data} = action.payload

          let filteredAttachments = data.attachments.reduce(function(filtered, att) {
            if (att.type === 'Spec Sheet') {
              var returnedAtt = {id: att.id, name: att.name, linked: true}
              filtered.push(returnedAtt)
            }
            return filtered
          }, [])

          let filteredAdditional = data.attachments.reduce(function(filtered, att) {
            if (att.type !== 'Spec Sheet') {
              var returnedAtt = {id: att.id, name: att.name, linked: true}
              filtered.push(returnedAtt)
            }
            return filtered
          }, [])
          
          return {
            ...state,
            ...action.payload.data,
            loading: false,
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
            }]: [],
            
            initialState: {
              additional: filteredAdditional,
              assayMax: data.assayMax,
              assayMin: data.assayMin,
              attachments: filteredAttachments,
              doesExpire: !!data.lots[0].expirationDate,
              externalNotes: data.externalNotes,
              lots: data.lots.map(lot => {
                return {
                  ...lot,
                  expirationDate: lot.expirationDate ? lot.expirationDate.substring(0, 10) : '',
                  manufacturedDate: lot.manufacturedDate ? lot.manufacturedDate.substring(0, 10) : '',
                  attachments: lot.attachments && lot.attachments.length ? lot.attachments.map(att => {
                    return {
                      id: att.id,
                      name: att.name,
                      linked: true
                    }
                  }) : []
                }
              }),
              internalNotes: data.internalNotes,
              manufacturer: data.manufacturer ? data.manufacturer.id : null,
              minimum: data.minimum,
              multipleLots: true,
              origin: data.origin ? data.origin.id : null,
              pkgAmount: data.pkgAmount,
              priceTiers: data.pricingTiers.length,
              pricing: {
                price: data.pricing.price
              },
              pricingTiers: data.pricingTiers,
              processingTimeDays: 1,
              product: data.product,
              productCondition: data.productCondition ? data.productCondition.id : null,
              productForm: data.productForm ? data.productForm.id : null,
              productGrade: data.productGrades && data.productGrades.length ? data.productGrades[0].id : null,
              splits: data.splits,
              tradeName: data.tradeName,
              validityDate: data.lots[0].expirationDate ? data.lots[0].expirationDate.substring(0, 10) : '', // TODO: check all lots and get one date (nearest or farthest date?)
              warehouse: data.warehouse.id
            }
          }
        }

        case AT.INVENTORY_GET_MY_PRODUCT_OFFERS_PENDING: {
          return { ...state,
            loading: true
          }
        }

        case AT.INVENTORY_GET_MY_PRODUCT_OFFERS_FULFILLED: {
          let {data} = action.payload
          return {
            ...state,
            loading: false,
            myProductOffers: action.payload.data
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
            ...initialState,
            listConditions: state.listConditions,
            listForms: state.listForms,
            listGrades: state.listGrades,
            warehousesList: state.warehousesList,
            initialState: {
              ...action.payload.data,
              pricingTiers: [{
                quantityFrom: 1,
                price: ''
              }]
            }
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

        default: {
          return state
        }
    }
}