import typeToReducer from 'type-to-reducer'
import { defaultTabs } from './constants'
import { uniqueArrayByKey } from '../../utils/functions'
import {
  openPopup,
  closeAddPopup,
  closePopup,
  openEditAltNamesCasPopup,
  closeConfirmPopup,
  getHazardClassesDataRequest,
  getPackagingGroupsDataRequest,
  deleteCasProduct,
  postNewCasProductRequest,
  updateCasProductRequest,
  closeEditPopup,
  getAlternativeProductNames,
  postNewProductName,
  updateProductName,
  deleteProductName,
  openEditEchoProduct,
  editEchoProductChangeTab,
  openEditEchoAltNamesPopup,
  deleteCompanyGenericProduct,
  searchCasProduct,
  putCompanyGenericProducts,
  postCompanyGenericProducts,
  searchManufacturers,
  loadFile,
  addAttachment,
  linkAttachment,
  removeAttachmentLink,
  removeAttachment,
  getCompanyGenericProduct,
  loadEditEchoProduct,
  getUnNumbersByString,
  searchTags,
  getDocumentTypes,
  searchMarketSegments,
  getAlternativeCompanyGenericProductsNames,
  postNewCompanyGenericProductsAltName,
  updateCompanyGenericProductsAltName,
  deleteCompanyGenericProductsAltName,
  postProductGroups,
  putProductGroups,
  deleteProductGroups,
  searchProductGroups,
  searchCompany,
  handleVariableSave
} from './actions'

export const initialState = {
  editTrig: false,
  popupValues: null,
  tabsNames: defaultTabs,
  loading: false,
  updating: false,
  searchedCompanies: [],
  searchedCompaniesLoading: false,
  companyProductUnmappedOnly: false,
  ordersStatusFilter: 'All',
  documentTypesFetching: false,
  listDocumentTypes: [],
  orderProcessing: false,
  orderAccountingDocuments: [],
  orderAccountingDocumentsLoading: false,
  currentEditForm: null,
  currentEdit2Form: null,
  currentAddForm: null,
  editPopupBoolean: false,
  deleteRowById: null,
  confirmMessage: null,
  hazardClasses: [],
  packagingGroups: [],
  casProductsRows: [],
  altCasNamesRows: [],
  editEchoProductEditTab: 0,
  editEchoProductInitTrig: false,
  searchedCasProducts: [],
  searchedManufacturersLoading: false,
  searchedManufacturers: [],
  unNumbersFetching: false,
  unNumbersFiltered: [],
  searchedTags: [],
  searchedTagsLoading: false,
  documentTypes: [],
  searchedMarketSegments: [],
  searchedMarketSegmentsLoading: false,
  altEchoNamesRows: [],
  searchedProductGroups: [],
  searchedProductGroupsLoading: false,
  tableHandlersFilters: null
}

export default typeToReducer(
  {    
    [openPopup]: (state, { payload }) => {
      return {
        ...state,
        editTrig: !state.editTrig,
        popupValues: payload.data,
    
        ...(payload.data
          ? {
              currentAddForm: null,
              currentEditForm: true
            }
          : {
              currentAddForm: true,
              currentEditForm: null
            }),
        currentEdit2Form: null

      }
    },
    [closeAddPopup]: state => {
      return {
        ...state,
        currentAddForm: null,
        currentEditForm: null,
        currentEdit2Form: null
      }
    },
    [closePopup]: state => {
      return {
        ...state,
        currentAddForm: null,
        currentEditForm: null,
        currentEdit2Form: null
      }
    },
    [openEditAltNamesCasPopup]: (state, { payload }) => {
      return {
        ...state,
        currentEdit2Form: true,
        currentAddForm: null,
        currentEditForm: null,
        editPopupBoolean: state.editPopupBoolean === false ? true : false,
        popupValues: payload
      }
    },
    [closeConfirmPopup]: state => {
      return {
        ...state,
        deleteRowById: null,
        confirmMessage: null
      }
    },
    [getHazardClassesDataRequest.pending]: state => {
      return {
        ...state
      }
    },
    [getHazardClassesDataRequest.rejected]: state => {
      return {
        ...state
      }
    },
    [getHazardClassesDataRequest.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        hazardClasses: payload.data
      }
    },
    [getPackagingGroupsDataRequest.pending]: state => {
      return {
        ...state
      }
    },
    [getPackagingGroupsDataRequest.rejected]: state => {
      return {
        ...state
      }
    },
    [getPackagingGroupsDataRequest.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        packagingGroups: payload.data
      }
    },
    [deleteCasProduct.pending]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [deleteCasProduct.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [deleteCasProduct.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        casProductsRows: state.casProductsRows.filter(row => row.id !== payload),
        loading: false
      }
    },
    [postNewCasProductRequest.pending]: state => {
      return {
        ...state,
        updating: true
      }
    },
    [postNewCasProductRequest.rejected]: state => {
      return {
        ...state,
        updating: false
      }
    },
    [postNewCasProductRequest.fulfilled]: state => {
      return {
        ...state,
        updating: false
      }
    },
    [updateCasProductRequest.pending]: state => {
      return {
        ...state,
        updating: true
      }
    },
    [updateCasProductRequest.rejected]: state => {
      return {
        ...state,
        updating: false
      }
    },
    [updateCasProductRequest.fulfilled]: state => {
      return {
        ...state,
        updating: false
      }
    },
    [closeEditPopup]: state => {
      return {
        ...state,
        currentAddForm: null,
        currentEditForm: null,
        currentEdit2Form: null
      }
    },
    [getAlternativeProductNames.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [getAlternativeProductNames.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [getAlternativeProductNames.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        altCasNamesRows: payload,
        loading: false
      }
    },
    [postNewProductName.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [postNewProductName.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [postNewProductName.fulfilled]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [updateProductName.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [updateProductName.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [updateProductName.fulfilled]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [deleteProductName.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [deleteProductName.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [deleteProductName.fulfilled]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [openEditEchoProduct]: state => {
      return {
        ...state
      }
    },
    [editEchoProductChangeTab]: (state, {payload}) => {
      return {
        ...state,
        editEchoProductEditTab: payload.editTab,
        editEchoProductInitTrig: payload.force ^ state.editEchoProductInitTrig,
        popupValues: payload.data,
        ...(payload.data
          ? {
              currentAddForm: null,
              currentEditForm: true
            }
          : {
              currentAddForm: true,
              currentEditForm: null
            }),
        currentEdit2Form: null
      }
    },
    [openEditEchoAltNamesPopup]: (state, {payload}) => {
      return {
        ...state,
        currentEdit2Form: true,
        currentAddForm: null,
        currentEditForm: null,
        editPopupBoolean: state.editPopupBoolean === false ? true : false,
        popupValues: payload
      }
    },
    [searchCasProduct.pending]: state => {
      return {
        ...state
      }
    },
    [searchCasProduct.rejected]: state => {
      return {
        ...state
      }
    },
    [searchCasProduct.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        searchedCasProducts: uniqueArrayByKey(state.searchedCasProducts.concat(payload), 'id')
      }
    },
    [putCompanyGenericProducts.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [putCompanyGenericProducts.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [putCompanyGenericProducts.fulfilled]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [postCompanyGenericProducts.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [postCompanyGenericProducts.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [postCompanyGenericProducts.fulfilled]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [searchManufacturers.pending]: state => {
      return {
        ...state,
        searchedManufacturersLoading: true
      }
    },
    [searchManufacturers.rejected]: state => {
      return {
        ...state,
        searchedManufacturersLoading: false
      }
    },
    [searchManufacturers.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        searchedManufacturers: payload.data.map(manufacturer => ({
          key: manufacturer.id,
          value: manufacturer.id,
          text: manufacturer.name
        })),
        searchedManufacturersLoading: false
      }
    },
    [addAttachment.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [addAttachment.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [addAttachment.fulfilled]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [linkAttachment.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [linkAttachment.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [linkAttachment.fulfilled]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [removeAttachmentLink.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [removeAttachmentLink.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [removeAttachmentLink.fulfilled]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [removeAttachment.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [removeAttachment.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [removeAttachment.fulfilled]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [getCompanyGenericProduct.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [getCompanyGenericProduct.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [getCompanyGenericProduct.fulfilled]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [getUnNumbersByString.pending]: state => {
      return {
        ...state,
        unNumbersFetching: true
      }
    },
    [getUnNumbersByString.rejected]: state => {
      return {
        ...state,
        unNumbersFetching: false
      }
    },
    [getUnNumbersByString.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        unNumbersFetching: false,
        unNumbersFiltered: payload
      }
    },
    [searchTags.pending]: state => {
      return { 
        ...state, 
        searchedTagsLoading: true 
      }
    },
    [searchTags.rejected]: state => {
      return { 
        ...state, 
        searchedTagsLoading: false 
      }
    },
    [searchTags.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        searchedTags: payload,
        searchedTagsLoading: false
      }
    },
    [getDocumentTypes.pending]: state => {
      return { ...state }
    },
    [getDocumentTypes.rejected]: state => {
      return { ...state }
    },
    [getDocumentTypes.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        documentTypes: payload.data.map(docType => {
          return {
            ...docType,
            value: docType.id,
            text: docType.name
          }
        })
      }
    },
    [getDocumentTypes.pending]: state => {
      return { 
        ...state 
      }
    },
    [getDocumentTypes.rejected]: state => {
      return { 
        ...state 
      }
    },
    [getDocumentTypes.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        documentTypes: payload.data.map(docType => {
          return {
            ...docType,
            value: docType.id,
            text: docType.name
          }
        })
      }
    },
    [searchMarketSegments.pending]: state => {
      return { 
        ...state, 
        searchedMarketSegmentsLoading: true 
      }
    },
    [searchMarketSegments.rejected]: state => {
      return { 
        ...state, 
        searchedMarketSegmentsLoading: false 
      }
    },
    [searchMarketSegments.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        searchedMarketSegments: payload,
        searchedMarketSegmentsLoading: false
      }
    },
    [getAlternativeCompanyGenericProductsNames.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [getAlternativeCompanyGenericProductsNames.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [getAlternativeCompanyGenericProductsNames.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        altEchoNamesRows: payload,
        loading: false
      }
    },
    [postProductGroups.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [postProductGroups.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [postProductGroups.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        productGroup: payload,
        loading: false
      }
    },
    [putProductGroups.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [putProductGroups.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [putProductGroups.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        productGroup: payload,
        loading: false
      }
    },
    [deleteProductGroups.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [deleteProductGroups.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [deleteProductGroups.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        loading: false
      }
    },
    [searchProductGroups.pending]: state => {
      return { 
        ...state, 
        searchedProductGroupsLoading: true 
      }
    },
    [searchProductGroups.rejected]: state => {
      return { 
        ...state, 
        searchedProductGroupsLoading: false 
      }
    },
    [searchProductGroups.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        searchedProductGroups: payload,
        searchedProductGroupsLoading: false
      }
    },
    [searchCompany.pending]: state => {
      return { ...state, 
        searchedCompaniesLoading: true 
      }
    },
    [searchCompany.rejected]: state => {
      return { 
        ...state, 
        searchedCompaniesLoading: false 
      }
    },
    [searchCompany.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        searchedCompanies: payload,
        searchedCompaniesLoading: false
      }
    },
    [handleVariableSave]: (state, {payload}) => {
      return {
        ...state,
        [payload.variable]: payload.value
      }
    }
  },

  initialState
)