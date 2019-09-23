import * as AT from './action-types'

import { uniqueArrayByKey, mapAutocompleteData } from '~/utils/functions'

export const initialState = {
  fileIds: [],
  listDocumentTypes: [],
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
  myProductOffersPageLoaded: -1,
  searchedProducts: [],
  searchedProductsLoading: false,
  warehousesList: [],
  loading: false,
  autocompleteData: [],
  autocompleteDataLoading: false,
  documentTypesFetching: false,
  simpleEditOpen: false,
  popupValues: {}
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action

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

    case AT.INVENTORY_ADD_PRODUCT_OFFER_REJECTED: {
      return {
        ...state,
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

    case AT.INVENTORY_EDIT_PRODUCT_OFFER_REJECTED: {
      return {
        ...state,
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
      let { data } = action.payload

      let filteredAttachments = data.attachments.reduce(function (filtered, att) {
        if (att.documentType.id === 2) {
          var returnedAtt = { id: att.id, name: att.name, linked: true, documentType: { ...att.documentType } }
          filtered.push(returnedAtt)
        }
        return filtered
      }, [])

      let filteredAdditional = data.attachments.reduce(function (filtered, att) {
        if (att.documentType.id !== 2) {
          var returnedAtt = { id: att.id, name: att.name, linked: true, documentType: { ...att.documentType } }
          filtered.push(returnedAtt)
        }
        return filtered
      }, [])

      let searchedLists = {}
      if (action.payload.data.manufacturer) {
        searchedLists.searchedManufacturers = [{
          key: action.payload.data.manufacturer.id,
          value: action.payload.data.manufacturer.id,
          text: action.payload.data.manufacturer.name
        }]
      }
      if (action.payload.data.origin) {
        searchedLists.searchedOrigins = [{
          key: action.payload.data.origin.id,
          value: action.payload.data.origin.id,
          text: action.payload.data.origin.name
        }]
      }

      let days = data.processingTimeDays

      return {
        ...state,
        ...action.payload.data,
        loading: false,
        fileIds: action.payload.data.attachments.map(att => {
          att.attachment = true
          return att
        }).concat(state.fileIds),
        poCreated: false,
        ...searchedLists,

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
                  linked: true,
                  documentType: { ...att.documentType }
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
          pricingTiers: data.pricingTiers.map((pricingTier, index) => {
            return {
              ...pricingTier,
              quantityFrom: !index ? data.minimum : pricingTier.quantityFrom,
              manuallyModified: 1
            }
          }),
          processingTimeDays: days,
          processingTimeDW: typeof days === "undefined" ? 1 : (days % 5 ? 1 : 5),
          processingTimeNum: days % 5 ? days : days / 5,
          product: data.product,
          productCondition: data.productCondition ? data.productCondition.id : null,
          productForm: data.productForm ? data.productForm.id : null,
          productGrade: data.productGrades && data.productGrades.length ? data.productGrades[0].id : null,
          splits: data.splits,
          tradeName: data.tradeName,
          validityDate: data.lots[0].expirationDate ? data.lots[0].expirationDate.substring(0, 10) : '', // TODO: check all lots and get one date (nearest or farthest date?)
          warehouse: state.warehousesList.find((wh) => wh.id === data.warehouse.id) ? data.warehouse.id : null // data.warehouse.id
        }
      }
    }

    case AT.INVENTORY_DELETE_PRODUCT_OFFER_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.INVENTORY_DELETE_PRODUCT_OFFER_FULFILLED: {
      return {
        ...state,
        loading: false,
        myProductOffers: state.myProductOffers.filter(p => p.id !== action.payload)
      }
    }

    case AT.INVENTORY_GET_DOCUMENT_TYPES_PENDING: {
      return {
        ...state,
        documentTypesFetching: true
      }
    }

    case AT.INVENTORY_GET_DOCUMENT_TYPES_FULFILLED: {
      return {
        ...state,
        documentTypesFetching: false,
        listDocumentTypes: action.payload.data.map((docType) => {
          return {
            key: docType.id,
            text: docType.name,
            value: docType.id
          }
        })
      }
    }

    case AT.INVENTORY_GET_DOCUMENT_TYPES_REJECTED: {
      return {
        ...state,
        documentTypesFetching: false
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
            price: 0.001,
            manuallyModified: 0
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

    // case AT.INVENTORY_PATCH_BROADCAST_FULFILLED: {
    //   return {
    //     ...state,
    //     myProductOffers: state.myProductOffers.map(po => {
    //       if (po.id === action.payload.productOfferId) {
    //         return {
    //           ...po,
    //           status: action.payload.broadcasted
    //         }
    //       } else {
    //         return po
    //       }
    //     })
    //   }
    // }


    /* GET_AUTOCOMPLETE_DATA */

    case AT.GET_AUTOCOMPLETE_DATA_PENDING: {
      return {
        ...state,
        autocompleteDataLoading: true
      }
    }

    case AT.GET_AUTOCOMPLETE_DATA_FULFILLED: {
      return {
        ...state,
        autocompleteDataLoading: false,
        autocompleteData: uniqueArrayByKey(payload.concat(state.autocompleteData), 'id'),
      }
    }

    case AT.GET_AUTOCOMPLETE_DATA_REJECTED: {
      return {
        ...state,
        autocompleteDataLoading: false
      }
    }

    case AT.SIMPLE_EDIT_TRIGGER: {
      let simpleEditOpen = !state.simpleEditOpen
      if (payload.force !== null) simpleEditOpen = payload.force

      return {
        ...state,
        simpleEditOpen,
        popupValues: payload.popupValues
      }
    }

    default: {
      return state
    }
  }

}

