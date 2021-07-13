import typeToReducer from 'type-to-reducer'
import * as AT from './action-types'
// Services
import { uniqueArrayByKey, getSafe } from '../../utils/functions'
// Constants
import { GLOBAL_RULES } from './my-listings/components/ModalDetail/ModalDetail.constants'
// Actions
import {
  initProductOfferEdit,
  addAttachment,
  updateAttachment,
  addProductOffer,
  downloadAttachment,
  downloadAttachmentPdf,
  findProducts,
  getProductOffer,
  getSharedProductOffer,
  deleteProductOffer,
  getWarehouses,
  loadFile,
  patchBroadcast,
  removeAttachmentLink,
  removeAttachment,
  searchManufacturers,
  searchOrigins,
  getAutocompleteData,
  groupOffers,
  removeAttachmentLinkProductOffer,
  saveTdsAsTemplate,
  getTdsTemplates,
  deleteTdsTemplate,
  getMarkUp,
  updateMarkUp,
  modalDetailTrigger,
  closeModalDetail,
  applyDatagridFilter,
  setPricingEditOpenId,
  closePricingEditPopup,
  handleVariableSave,
  toggleColumnSettingModal,
  handleProductCatalogUnmappedValue,
  openPopup,
  closePopup,
  resetForm,
  changeBroadcast,
  setActiveTab,
  triggerPriceBookModal
} from './actions'

export const initialState = {
  fileIds: [],
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



export default typeToReducer(
  {
    [addProductOffer.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [addProductOffer.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [addProductOffer.fulfilled]: (state, action) => {
      return {
        ...state,
        poCreated: true,
        loading: false
      }
    },
    [getProductOffer.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [getProductOffer.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [getProductOffer.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        detailValues: action.payload.data,
        editedId: action.payload.data.id
      }
    },
    [getSharedProductOffer.pending]: (state, action) => {
      return {
        ...state,
        loadingMarkup: true
      }
    },
    [getSharedProductOffer.rejected]: (state, action) => {
      return {
        ...state,
        loadingMarkup: false
      }
    },
    [getSharedProductOffer.fulfilled]: (state, action) => {
      return {
        ...state,
        loadingMarkup: false
      }
    },
    [deleteProductOffer.pending]: (state, action) => {
      return {
        ...state,
        updatingDatagrid: true
      }
    },
    [deleteProductOffer.rejected]: (state, action) => {
      return {
        ...state,
        updatingDatagrid: false
      }
    },
    [deleteProductOffer.fulfilled]: (state, action) => {
      return {
        ...state,
        updatingDatagrid: false,
        myProductOffers: state.myProductOffers.filter(p => p.id !== action.payload)
      }
    },
    [getWarehouses.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [getWarehouses.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [getWarehouses.fulfilled]: (state, action) => {
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
    },
    [removeAttachmentLink.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [removeAttachmentLink.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [removeAttachmentLink.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [removeAttachment.pending]: (state, action) => {
      return {
        ...state,
        updatingDatagrid: true
      }
    },
    [removeAttachment.rejected]: (state, action) => {
      return {
        ...state,
        updatingDatagrid: false
      }
    },
    [removeAttachment.fulfilled]: (state, action) => {
      return {
        ...state,
        updatingDatagrid: false
      }
    },
    [searchManufacturers.pending]: (state, action) => {
      return {
        ...state,
        searchedManufacturersLoading: true
      }
    },
    [searchManufacturers.rejected]: (state, action) => {
      return {
        ...state,
        searchedManufacturersLoading: false
      }
    },
    [searchManufacturers.fulfilled]: (state, action) => {
      return {
        ...state,
        searchedManufacturers: action.payload.data,
        searchedManufacturersLoading: false
      }
    },
    [searchOrigins.pending]: (state, action) => {
      return {
        ...state,
        searchedOriginsLoading: true
      }
    },
    [searchOrigins.rejected]: (state, action) => {
      return {
        ...state,
        searchedOriginsLoading: false
      }
    },
    [searchOrigins.fulfilled]: (state, action) => {
      return {
        ...state,
        searchedOrigins: action.payload.data,
        searchedOriginsLoading: false
      }
    },
    [getAutocompleteData.pending]: (state, action) => {
      return {
        ...state,
        autocompleteDataLoading: true
      }
    },
    [getAutocompleteData.rejected]: (state, action) => {
      return {
        ...state,
        autocompleteDataLoading: false
      }
    },
    [getAutocompleteData.fulfilled]: (state, action) => {
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
    },
    [groupOffers.pending]: (state, action) => {
      return {
        ...state,
        updatingDatagrid: true
      }
    },
    [groupOffers.rejected]: (state, action) => {
      return {
        ...state,
        updatingDatagrid: false
      }
    },
    [groupOffers.fulfilled]: (state, action) => {
      return {
        ...state,
        updatingDatagrid: false,
        productOfferStatuses: action.payload && action.payload.productOfferStatuses
      }
    },
    [getTdsTemplates.pending]: (state, action) => {
      return {
        ...state,
        tdsTemplatesLoading: true
      }
    },
    [getTdsTemplates.rejected]: (state, action) => {
      return {
        ...state,
        tdsTemplatesLoading: false
      }
    },
    [getTdsTemplates.fulfilled]: (state, action) => {
      return {
        ...state,
        tdsTemplatesLoading: false,
        tdsTemplates: action.payload
      }
    },
    [deleteTdsTemplate.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [deleteTdsTemplate.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [deleteTdsTemplate.fulfilled]: (state, action) => {
      return {
        ...state,
        tdsTemplates: state.tdsTemplates.reduce((result, template) => {
          if (template.id !== action.payload) {
            result.push(template)
          }
          return result
        }, [])
      }
    },
    [getMarkUp.pending]: (state, action) => {
      return {
        ...state,
        loadingMarkup: true
      }
    },
    [getMarkUp.rejected]: (state, action) => {
      return {
        ...state,
        loadingMarkup: false
      }
    },
    [getMarkUp.fulfilled]: (state, action) => {
      return {
        ...state,
        loadingMarkup: false
      }
    },
    [updateMarkUp.pending]: (state, action) => {
      return {
        ...state,
        loadingMarkup: true
      }
    },
    [updateMarkUp.rejected]: (state, action) => {
      return {
        ...state,
        loadingMarkup: false
      }
    },
    [updateMarkUp.fulfilled]: (state, action) => {
      return {
        ...state,
        loadingMarkup: false
      }
    },
    [modalDetailTrigger]: (state, action) => {
      return {
        ...state,
        editProductOfferInitTrig: !state.editProductOfferInitTrig,
        isModalDetailOpen: true,
        detailValues: action.payload.row, // null (Add new) or object (Edit)
        modalActiveTab: action.payload.activeTab
      }
    },
    [closeModalDetail]: (state, action) => {
      return {
        ...state,
        isModalDetailOpen: false,
        detailValues: null,
        editedId: null,
        modalActiveTab: 0
      }
    },
    [applyDatagridFilter]: (state, action) => {
      return {
        ...state,
        datagridFilter: action.payload.filter,
        datagridFilterReload: action.payload.reload,
        datagridFilterUpdate: !state.datagridFilterUpdate
      }
    },
    [setPricingEditOpenId]: (state, action) => {
      return {
        ...state,
        pricingEditOpenId: action.payload
      }
    },
    [closePricingEditPopup]: (state, action) => {
      return {
        ...state,
        pricingEditOpenId: null
      }
    },
    [handleVariableSave]: (state, action) => {
      return {
        ...state,
        [action.payload.variable]: action.payload.value
      }
    },
    [toggleColumnSettingModal]: (state, action) => {
      return {
        ...state,
        isOpenColumnSettingModal: action.payload
      }
    },
    [handleProductCatalogUnmappedValue]: (state, action) => {
      return {
        ...state,
        myProductsUnmappedValue: action.payload
      }
    },
    [openPopup]: (state, action) => {
      return {
        ...state,
        isOpenPopup: true,
        editTrig: !state.editTrig,
        popupValues: action.payload,
        editedId: action.payload ? action.payload.id : null
      }
    },
    [closePopup]: (state, action) => {
      return {
        ...state,
        isOpenPopup: false,
        popupValues: null,
        editedId: null
      }
    },
    [resetForm]: (state, action) => {
      return {
        ...initialState,
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
    },
    [changeBroadcast]: (state, action) => {
      return {
        ...state,
        broadcastOption: action.payload
      }
    },
    [setActiveTab]: (state, action) => {
      return {
        ...state,
        activeTab: action.payload
      }
    },
    [triggerPriceBookModal]: (state, action) => {
      return {
        ...state,
        isOpenPriceBookModal: action?.payload?.isOpen,
        rowPriceBook: action?.payload?.rowPriceBook
      }
    },
  },
  initialState
)
