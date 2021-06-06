import * as AT from './action-types'

import { uniqueArrayByKey, getSafe } from '../../utils/functions'
//Constants
import { GLOBAL_RULES } from './my-listings/components/ModalDetail/ModalDetail.constants'

export const initialState = {
  fileIds: [],
  listDocumentTypes: [],
  documentTypesAll: [],
  documentTypesFederalOwnershipCertifications: [],
  documentTypesManagementCertifications: [],
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
  loadingMarkup: false,
  updatingDatagrid: false,
  autocompleteData: [],
  autocompleteDataLoading: false,
  documentTypesFetching: false,
  simpleEditOpen: false,
  popupValues: null,
  isOpenPopup: false,
  editTrig: false,
  isModalDetailOpen: false,
  modalActiveTab: 0,
  detailValues: null,
  product: null,
  editProductOfferInitTrig: false,
  editedId: null,
  productOfferStatuses: [],
  datagridFilter: { filters: [] },
  datagridFilterReload: false,
  datagridFilterUpdate: false,
  pricingEditOpenId: null,
  //isExportInventoryOpen: false,
  tableHandlersFilters: null,
  isOpenColumnSettingModal: false,
  myProductsUnmappedValue: 'ALL',
  myListingsFilters: null,
  myProductsFilters: null,
  sharedListingsFilters: null,
  tdsTemplatesLoading: false,
  tdsTemplates: [],
  broadcastOption: GLOBAL_RULES,
  activeTab: 0,
  isOpenPriceBookModal: false,
  rowPriceBook: null
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case AT.INVENTORY_OPEN_POPUP: {
      return {
        ...state,
        isOpenPopup: true,
        editTrig: !state.editTrig,
        popupValues: action.payload,
        editedId: action.payload ? action.payload.id : null
      }
    }
    case AT.INVENTORY_CLOSE_POPUP: {
      return {
        ...state,
        isOpenPopup: false,
        popupValues: null,
        editedId: null
      }
    }

    case AT.INVENTORY_ADD_PRODUCT_OFFER_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.INVENTORY_REMOVE_ATTACHMENT_LINK_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.INVENTORY_REMOVE_ATTACHMENT_LINK_REJECTED:
    case AT.INVENTORY_REMOVE_ATTACHMENT_LINK_FULFILLED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.INVENTORY_ADD_PRODUCT_OFFER_FULFILLED: {
      return {
        ...state,
        poCreated: true,
        loading: false
        //detailValues: payload
      }
    }

    case AT.INVENTORY_ADD_PRODUCT_OFFER_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.INVENTORY_EDIT_PRODUCT_OFFER_PENDING:
    case AT.INVENTORY_EDIT_GROUPED_PRODUCT_OFFER_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.INVENTORY_EDIT_PRODUCT_OFFER_FULFILLED:
    case AT.INVENTORY_EDIT_GROUPED_PRODUCT_OFFER_FULFILLED: {
      return {
        ...state,
        poCreated: true,
        loading: false
        //detailValues: payload
      }
    }

    case AT.INVENTORY_EDIT_PRODUCT_OFFER_REJECTED:
    case AT.INVENTORY_EDIT_GROUPED_PRODUCT_OFFER_REJECTED: {
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
      return {
        ...state,
        loading: false,
        detailValues: payload.data,
        editedId: payload.data.id
      }

      /* Not used anymore
      let { data } = action.payload
      let expirationDate = getSafe(() => data.validityDate)

      let filteredAttachments = data.attachments.reduce(function(filtered, att) {
        if (att.documentType.id === 2) {
          var returnedAtt = { id: att.id, name: att.name, linked: true, documentType: { ...att.documentType } }
          filtered.push(returnedAtt)
        }
        return filtered
      }, [])

      let filteredAdditional = data.attachments.reduce(function(filtered, att) {
        if (att.documentType.id !== 2) {
          var returnedAtt = { id: att.id, name: att.name, linked: true, documentType: { ...att.documentType } }
          filtered.push(returnedAtt)
        }
        return filtered
      }, [])

      return {
        ...state,
        loading: false,
        autocompleteData: uniqueArrayByKey(state.autocompleteData.concat(data.companyProduct)),
        initialState: {
          attachments: filteredAttachments,
          additional: filteredAdditional,
          lots:
            getSafe(() => data.lots, []).length > 0
              ? data.lots.map(el => ({
                  ...el,
                  manufacturedDate: moment(el.manufacturedDate).format('YYYY-MM-DD'),
                  expirationDate: moment(el.expirationDate).format('YYYY-MM-DD')
                }))
              : [
                  {
                    lotNumber: 'Lot #1',
                    pkgAvailable: 1,
                    manufacturedDate: '',
                    expirationDate: ''
                  }
                ],
          processingTimeDays: data.processingTimeDays ? data.processingTimeDays : 1,
          product: data.companyProduct.id,
          warehouse: data.warehouse.id,
          doesExpire: !!expirationDate,
          inStock: getSafe(() => data.inStock, true),
          expirationDate: expirationDate ? moment(expirationDate) : null,
          quantity: data.quantity,
          minimumRequirement: getSafe(() => !!data.minimum, false),
          minimum: getSafe(() => data.minPkg, 1),
          splits: getSafe(() => data.splitPkg, 1),
          priceTiers: data.pricingTiers.length > 0 ? data.pricingTiers.length : 1,
          pricingTiers:
            data.pricingTiers.length > 0
              ? data.pricingTiers.map(pt => ({
                  // ? ! ! id: pt.id,
                  //! ! price: pt.pricePerUOM.amount,
                  price: 1, // ! ! ! ! ! ! TODO temporary, opravit co nejdrive!
                  quantityFrom: pt.quantityFrom
                }))
              : [{ price: null, quantityFrom: 1 }],
          origin: getSafe(() => data.origin.id),
          tradeName: data.companyProduct.companyGenericProduct.name, // ! ! ? data.tradeName,
          productCondition: getSafe(() => data.condition.id),
          productForm: getSafe(() => data.form.id),
          productGrades: getSafe(() => data.grades.map(el => el.id)),
          assayMin: data.assayMin,
          assayMax: data.assayMax,
          internalNotes: data.internalNotes,
          externalNotes: data.externalNotes
        },
        product: data
      }
      */
      // let searchedLists = {}
      // if (action.payload.data.manufacturer) {
      //   searchedLists.searchedManufacturers = [{
      //     key: action.payload.data.manufacturer.id,
      //     value: action.payload.data.manufacturer.id,
      //     text: action.payload.data.manufacturer.name
      //   }]
      // }
      // if (action.payload.data.origin) {
      //   searchedLists.searchedOrigins = [{
      //     key: action.payload.data.origin.id,
      //     value: action.payload.data.origin.id,
      //     text: action.payload.data.origin.name
      //   }]
      // }

      // let days = data.processingTimeDays

      // return {
      //   ...state,
      //   ...action.payload.data,
      //   loading: false,
      //   fileIds: action.payload.data.attachments.map(att => {
      //     att.attachment = true
      //     return att
      //   }).concat(state.fileIds),
      //   poCreated: false,
      //   ...searchedLists,

      //   initialState: {
      //     additional: filteredAdditional,
      //     assayMax: data.assayMax,
      //     assayMin: data.assayMin,
      //     attachments: filteredAttachments,
      //     doesExpire: !!data.lots[0].expirationDate,
      //     externalNotes: data.externalNotes,
      //     lots: data.lots.map(lot => {
      //       return {
      //         ...lot,
      //         expirationDate: lot.expirationDate ? lot.expirationDate.substring(0, 10) : '',
      //         manufacturedDate: lot.manufacturedDate ? lot.manufacturedDate.substring(0, 10) : '',
      //         attachments: lot.attachments && lot.attachments.length ? lot.attachments.map(att => {
      //           return {
      //             id: att.id,
      //             name: att.name,
      //             linked: true,
      //             documentType: { ...att.documentType }
      //           }
      //         }) : []
      //       }
      //     }),
      //     internalNotes: data.internalNotes,
      //     manufacturer: data.manufacturer ? data.manufacturer.id : null,
      //     minimum: data.minimum,
      //     multipleLots: true,
      //     origin: data.origin ? data.origin.id : null,
      //     pkgAvailable: data.pkgAvailable,
      //     priceTiers: data.pricingTiers.length,
      //     pricing: {
      //       price: data.pricing.price
      //     },
      //     pricingTiers: data.pricingTiers.map((pricingTier, index) => {
      //       return {
      //         ...pricingTier,
      //         quantityFrom: !index ? data.minimum : pricingTier.quantityFrom,
      //         manuallyModified: 1
      //       }
      //     }),
      //     processingTimeDays: days,
      //     processingTimeDW: typeof days === "undefined" ? 1 : (days % 5 ? 1 : 5),
      //     processingTimeNum: days % 5 ? days : days / 5,
      //     product: data.product,
      //     productCondition: data.productCondition ? data.productCondition.id : null,
      //     productForm: data.productForm ? data.productForm.id : null,
      //     productGrade: data.productGrades && data.productGrades.length ? data.productGrades[0].id : null,
      //     splits: data.splits,
      //     tradeName: data.tradeName,
      //     validityDate: data.lots[0].expirationDate ? data.lots[0].expirationDate.substring(0, 10) : '', // TODO: check all lots and get one date (nearest or farthest date?)
      //     warehouse: state.warehousesList.find((wh) => wh.id === data.warehouse.id) ? data.warehouse.id : null // data.warehouse.id
      //   }
      // }
    }

    case AT.INVENTORY_GET_PRODUCT_OFFER_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.INVENTORY_DELETE_PRODUCT_OFFER_PENDING:
    case AT.INVENTORY_REMOVE_ATTACHMENT_PENDING: {
      return {
        ...state,
        updatingDatagrid: true
      }
    }

    case AT.INVENTORY_DELETE_PRODUCT_OFFER_FULFILLED: {
      return {
        ...state,
        updatingDatagrid: false,
        myProductOffers: state.myProductOffers.filter(p => p.id !== action.payload)
      }
    }

    case AT.INVENTORY_REMOVE_ATTACHMENT_REJECTED:
    case AT.INVENTORY_REMOVE_ATTACHMENT_FULFILLED:
    case AT.INVENTORY_DELETE_PRODUCT_OFFER_REJECTED: {
      return {
        ...state,
        updatingDatagrid: false
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
        listDocumentTypes: action.payload.data.map(docType => {
          return {
            key: docType.id,
            text: docType.name,
            value: docType.id
          }
        }),
        documentTypesAll: payload.data,
        documentTypesFederalOwnershipCertifications: payload.data.filter(el => el.group && el.group.id === 6),
        documentTypesManagementCertifications: payload.data.filter(el => el.group && el.group.id === 7)
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
        warehousesList: action.payload.data.map(warehouse => {
          return {
            ...warehouse,
            text: warehouse.deliveryAddress.cfName,
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
          pricingTiers: [
            {
              quantityFrom: 1,
              price: null,
              manuallyModified: 0
            }
          ]
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
      const data = getSafe(() => action.payload.length, null)
        ? action.payload
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
                  casProducts: getSafe(() => el.companyGenericProduct.elements, [])
                }
              }
            })
            .concat(state.autocompleteData)
        : state.autocompleteData
      return {
        ...state,
        autocompleteDataLoading: false,
        autocompleteData: uniqueArrayByKey(data, 'id')
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

    case AT.MODAL_DETAIL_TRIGGER: {
      return {
        ...state,
        editProductOfferInitTrig: !state.editProductOfferInitTrig,
        isModalDetailOpen: true,
        detailValues: payload.row, // null (Add new) or object (Edit)
        modalActiveTab: payload.activeTab
      }
    }

    case AT.INVENTORY_CLOSE_MODAL: {
      return {
        ...state,
        isModalDetailOpen: false,
        detailValues: null,
        editedId: null,
        modalActiveTab: 0
      }
    }

    /* GROUP OFFERS */
    case AT.INVENTORY_GROUP_OFFERS_PENDING: {
      return {
        ...state,
        updatingDatagrid: true
      }
    }

    case AT.INVENTORY_GROUP_OFFERS_FULFILLED: {
      return {
        ...state,
        updatingDatagrid: false,
        productOfferStatuses: payload && payload.productOfferStatuses
      }
    }

    case AT.INVENTORY_GROUP_OFFERS_REJECT: {
      return {
        ...state,
        updatingDatagrid: false
      }
    }

    /* DETACH OFFERS */
    case AT.INVENTORY_DETACH_OFFERS_PENDING: {
      return {
        ...state,
        updatingDatagrid: true
      }
    }

    case AT.INVENTORY_DETACH_OFFERS_FULFILLED: {
      return {
        ...state,
        updatingDatagrid: false,
        productOfferStatuses: payload && payload.productOfferStatuses
      }
    }

    case AT.INVENTORY_DETACH_OFFERS_REJECT: {
      return {
        ...state,
        updatingDatagrid: false
      }
    }
    case AT.INVENTORY_APPLY_FILTER: {
      return {
        ...state,
        datagridFilter: payload.filter,
        datagridFilterReload: payload.reload,
        datagridFilterUpdate: !state.datagridFilterUpdate
      }
    }

    case AT.INVENTORY_SET_PRICING_EDIT_OPEN_ID: {
      return {
        ...state,
        pricingEditOpenId: payload
      }
    }

    case AT.INVENTORY_SET_EXPORT_MODAL_OPEN_STATE: {
      return {
        ...state
        //isExportInventoryOpen: payload
      }
    }

    case AT.INVENTORY_HANDLE_VARIABLE_CHANGE: {
      return {
        ...state,
        [payload.variable]: payload.value
      }
    }

    case AT.TOGGLE_COLUMN_SETTING_MODAL: {
      return {
        ...state,
        isOpenColumnSettingModal: payload
      }
    }
    case AT.HANDLE_PRODUCT_CATALOG_UNMAPPED_VALUE: {
      return {
        ...state,
        myProductsUnmappedValue: action.payload
      }
    }

    case AT.TDS_GET_TEMPLATES_PENDING: {
      return {
        ...state,
        tdsTemplatesLoading: true
      }
    }

    case AT.TDS_GET_TEMPLATES_FULFILLED: {
      return {
        ...state,
        tdsTemplatesLoading: false,
        tdsTemplates: action.payload
      }
    }

    case AT.TDS_DELETE_TEMPLATE_FULFILLED: {
      return {
        ...state,
        tdsTemplates: state.tdsTemplates.reduce((result, template) => {
          if (template.id !== payload) {
            result.push(template)
          }
          return result
        }, [])
      }
    }

    case AT.CHANGE_BROADCAST: {
      return {
        ...state,
        broadcastOption: action.payload
      }
    }

    case AT.SET_ACTIVE_TAB: {
      return {
        ...state,
        activeTab: action.payload
      }
    }

    case AT.TRIGGER_PRICE_BOOK_MODAL: {
      return {
        ...state,
        isOpenPriceBookModal: action?.payload?.isOpen,
        rowPriceBook: action?.payload?.rowPriceBook
      }
    }

    case AT.INVENTORY_GET_SHARED_PRODUCT_OFFER_PENDING:
    case AT.INVENTORY_GET_MARKUP_PENDING:
    case AT.INVENTORY_UPDATE_MARKUP_PENDING: {
      return {
        ...state,
        loadingMarkup: true
      }
    }

    case AT.INVENTORY_GET_SHARED_PRODUCT_OFFER_FULFILLED:
    case AT.INVENTORY_GET_SHARED_PRODUCT_OFFER_REJECTED:
    case AT.INVENTORY_GET_MARKUP_FULFILLED:
    case AT.INVENTORY_GET_MARKUP_REJECTED:
    case AT.INVENTORY_UPDATE_MARKUP_FULFILLED:
    case AT.INVENTORY_UPDATE_MARKUP_REJECTED: {
      return {
        ...state,
        loadingMarkup: false
      }
    }

    default: {
      return state
    }
  }
}
