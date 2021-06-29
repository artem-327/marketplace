import typeToReducer from 'type-to-reducer'
// Constants
import { config } from './constants'
// Actions
import {
  openEditPopup,
  closeEditPopup,
  openAddPopup,
  closeAddPopup,
  closeConfirmPopup,
  postDwollaAccount,
  getMeasureTypesDataRequest,
  getAllUnitsOfMeasuresDataRequest,
  getAllUnNumbersDataRequest,
  getUnNumbersByString,
  getPrimaryBranchProvinces,
  getMailingBranchProvinces,
  getCompany,
  udpateEnabled,
  searchUnNumber,
  searchManufacturers,
  registerDwollaAccount,
  closeRegisterDwollaAccount,
  openPopup,
  closePopup,
  deleteUnit,
  deleteUnitOfPackaging,
  getAddressSearchPrimaryBranch,
  getAddressSearchMailingBranch,
  reviewRequest,
  addAttachment,
  linkAttachment,
  removeAttachment,
  removeAttachmentLink,
  addUnNumber,
  getCompanyDetails,
  addNmfcNumber,
  editNmfcNumber,
  deleteNmfcNumber,
  getUsersMe,
  getUser,
  userSwitchEnableDisable,
  postNewUserRequest,
  submitUserEdit,
  deleteUser,
  searchCompany,
  initSearchCompany,
  searchTags,
  searchMarketSegments,
  searchSellMarketSegments,
  searchBuyMarketSegments,
  handleVariableSave,
  getLogisticsProviders,
  postNewLogisticsProvider,
  updateLogisticsProvider,
  deleteLogisticsProvider,
  postNewCarrier,
  updateCarrier,
  deleteCarrier,
  handleFiltersValue,
  getDataRequest,
  deleteConfirmation
} from './actions'


export const initialState = {
  editTrig: false,
  editPopupBoolean: false,
  addNewPopup: false,
  popupValues: null,
  unitsOfMeasureRows: [],
  unitsOfPackagingRows: [],
  manufacturersRows: [],
  gradesRows: [],
  formsRows: [],
  conditionsRows: [],
  casProductsRows: [],
  altCasNamesRows: [],
  measureTypes: [],
  unitsOfMeasures: [],
  unNumbersFiltered: [],
  companiesRows: [],
  singleCompany: [],
  primaryBranchProvinces: [],
  mailingBranchProvinces: [],
  casListDataRequest: { pageSize: 50, pageNumber: 0, sortDirection: 'asc', sortPath: 'CasProduct.chemicalName' },
  currentEditForm: null,
  currentEdit2Form: null,
  currentAddForm: null,
  currentAddDwolla: null,
  confirmMessage: null,
  deleteRowById: null,
  filterValue: '',
  filterCasIds: [],
  loading: false,
  unNumbersFetching: false,
  config: config,
  addressSearchPrimaryBranch: [],
  addressSearchMailingBranch: [],
  searchedCasProducts: [],
  searchedUnNumbers: [],
  searchedManufacturers: [],
  searchedManufacturersLoading: false,
  altEchoNamesRows: [],
  editEchoProductEditTab: 0,
  editEchoProductInitTrig: false,
  currentUser: null,
  user: null,
  searchedCompanies: [],
  searchedCompaniesLoading: false,
  updating: false,
  searchedTags: [],
  searchedTagsLoading: false,
  searchedMarketSegments: [],
  searchedMarketSegmentsLoading: false,
  searchedSellMarketSegments: [],
  searchedSellMarketSegmentsLoading: false,
  searchedBuyMarketSegments: [],
  searchedBuyMarketSegmentsLoading: false,
  logisticsProvidersFetching: false,
  logisticsProviders: [],
  tableHandlersFilters: null
}


export default typeToReducer(
  {
    [openEditPopup]: (state, action) => {
      return {
        ...state,
        currentEditForm: true,
        currentAddForm: null,
        currentEdit2Form: null,
        currentAddDwolla: null,
        editPopupBoolean: state.editPopupBoolean === false ? true : false,
        popupValues: action.payload
      }
    },
    [closeEditPopup]: (state, action) => {
      return {
        ...state,
        currentAddForm: null,
        currentEditForm: null,
        currentEdit2Form: null,
        currentAddDwolla: null
      }
    },
    [openAddPopup]: (state, action) => {
      return {
        ...state,
        currentAddForm: true,
        currentEditForm: null,
        currentEdit2Form: null,
        currentAddDwolla: null,
        popupValues: action.payload
      }
    },
    [closeAddPopup]: (state, action) => {
      return {
        ...state,
        currentAddForm: null,
        currentEditForm: null,
        currentEdit2Form: null,
        currentAddDwolla: null
      }
    },
    [closeConfirmPopup]: (state, action) => {
      return {
        ...state,
        loading: false,
        deleteRowById: null,
        confirmMessage: null
      }
    },
    [postDwollaAccount.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [postDwollaAccount.rejected]: (state, action) => {
      return {
        ...state,
        popupValues: null,
        currentAddDwolla: null
      }
    },
    [postDwollaAccount.fulfilled]: (state, action) => {
      return {
        ...state,
        popupValues: null,
        currentAddDwolla: null
      }
    },
    [getMeasureTypesDataRequest.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [getMeasureTypesDataRequest.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [getMeasureTypesDataRequest.fulfilled]: (state, action) => {
      return {
        ...state,
        measureTypes: action.payload
      }
    },
    [getAllUnitsOfMeasuresDataRequest.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [getAllUnitsOfMeasuresDataRequest.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    },
    [getAllUnitsOfMeasuresDataRequest.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        unitsOfMeasures: action.payload
      }
    },
    [getAllUnNumbersDataRequest.pending]: (state, action) => {
      return {
        ...state,
        unNumbersFetching: true
      }
    },
    [getAllUnNumbersDataRequest.rejected]: (state, action) => {
      return {
        ...state,
        unNumbersFetching: false
      }
    },
    [getAllUnNumbersDataRequest.fulfilled]: (state, action) => {
      return {
        ...state,
        unNumbersFetching: false,
        unNumbersFiltered: action.payload
      }
    },
    [getUnNumbersByString.pending]: (state, action) => {
      return {
        ...state,
        unNumbersFetching: true
      }
    },
    [getUnNumbersByString.rejected]: (state, action) => {
      return {
        ...state,
        unNumbersFetching: false
      }
    },
    [getUnNumbersByString.fulfilled]: (state, action) => {
      return {
        ...state,
        unNumbersFetching: false,
        unNumbersFiltered: action.payload
      }
    },
    [getPrimaryBranchProvinces.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [getPrimaryBranchProvinces.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [getPrimaryBranchProvinces.fulfilled]: (state, action) => {
      return {
        ...state,
        primaryBranchProvinces: action.payload.map(d => ({
          text: d.name,
          value: d.id,
          key: d.id
        }))
      }
    },
    [getMailingBranchProvinces.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [getMailingBranchProvinces.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [getMailingBranchProvinces.fulfilled]: (state, action) => {
      return {
        ...state,
        mailingBranchProvinces: action.payload.map(d => ({
          text: d.name,
          value: d.id,
          key: d.id
        }))
      }
    },
    [getCompany.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [getCompany.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [getCompany.fulfilled]: (state, action) => {
      return {
        ...state,
        singleCompany: action.payload
      }
    },
    [udpateEnabled.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [udpateEnabled.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [udpateEnabled.fulfilled]: (state, action) => {
      return {
        ...state
      }
    },
    [searchUnNumber.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [searchUnNumber.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [searchUnNumber.fulfilled]: (state, action) => {
      return {
        ...state,
        searchedUnNumbers: action.payload.data
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
        searchedManufacturers: action.payload.data.map(manufacturer => ({
          key: manufacturer.id,
          value: manufacturer.id,
          text: manufacturer.name
        })),
        searchedManufacturersLoading: false
      }
    },
    [registerDwollaAccount]: (state, action) => {
      return {
        ...state,
        popupValues: action.payload,
        currentAddDwolla: true
      }
    },
    [closeRegisterDwollaAccount]: (state, action) => {
      return {
        ...state,
        popupValues: null,
        currentAddDwolla: null
      }
    },
    [openPopup]: (state, action) => {
      return {
        ...state,
        editTrig: !state.editTrig,
        popupValues: action.payload.data,

        ...(action.payload.data
          ? {
              currentAddForm: null,
              currentEditForm: true
            }
          : {
              currentAddForm: true,
              currentEditForm: null
            }),
        currentEdit2Form: null,
        currentAddDwolla: null
      }
    },
    [closePopup]: (state, action) => {
      return {
        ...state,
        popupValues: null,
        currentAddForm: null,
        currentEditForm: null,
        currentEdit2Form: null,
        currentAddDwolla: null
      }
    },
    [deleteUnit.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [deleteUnit.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [deleteUnit.fulfilled]: (state, action) => {
      return {
        ...state,
        unitsOfMeasureRows: state.unitsOfMeasureRows.filter(el => el.id !== action.payload),
        loading: false
      }
    },
    [deleteUnitOfPackaging.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [deleteUnitOfPackaging.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [deleteUnitOfPackaging.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [getAddressSearchPrimaryBranch.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [getAddressSearchPrimaryBranch.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [getAddressSearchPrimaryBranch.fulfilled]: (state, action) => {
      return {
        ...state,
        addressSearchPrimaryBranch: action.payload,
        loading: false
      }
    },
    [getAddressSearchMailingBranch.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [getAddressSearchMailingBranch.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [getAddressSearchMailingBranch.fulfilled]: (state, action) => {
      return {
        ...state,
        addressSearchMailingBranch: action.payload,
        loading: false
      }
    },
    [reviewRequest.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [reviewRequest.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [reviewRequest.fulfilled]: (state, action) => {
      return {
        ...state,
        companiesRows: state.companiesRows.map(company => {
          return {
            ...company,
            reviewRequested: !company.reviewRequested
          }
        })
      }
    },
    [addAttachment.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [addAttachment.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [addAttachment.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [linkAttachment.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [linkAttachment.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [linkAttachment.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [removeAttachment.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [removeAttachment.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [removeAttachment.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false
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
    [addUnNumber]: (state, action) => {
      let copy = state.unNumbersFiltered.slice()
      let newPayload

      if (!(action.payload instanceof Array)) {
        newPayload = [action.payload]
      } else {
        newPayload = action.payload
      }

      newPayload.forEach(element => {
        if (!copy.find(e => e.id === element.id)) copy.push(element)
      })

      return {
        ...state,
        unNumbersFiltered: copy
      }
    },
    [getCompanyDetails.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [getCompanyDetails.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [getCompanyDetails.fulfilled]: (state, action) => {
      return {
        ...state,
        company: action.payload
      }
    },
    [addNmfcNumber.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [addNmfcNumber.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [addNmfcNumber.fulfilled]: (state, action) => {
      return {
        ...state
      }
    },
    [editNmfcNumber.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [editNmfcNumber.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [editNmfcNumber.fulfilled]: (state, action) => {
      return {
        ...state
      }
    },
    [deleteNmfcNumber.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [deleteNmfcNumber.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [deleteNmfcNumber.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [getUsersMe.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [getUsersMe.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [getUsersMe.fulfilled]: (state, action) => {
      return {
        ...state,
        currentUser: action.payload
      }
    },
    [getUser.pending]: (state, action) => {
      return {
        ...state,
        updating: true
      }
    },
    [getUser.rejected]: (state, action) => {
      return {
        ...state,
        updating: false
      }
    },
    [getUser.fulfilled]: (state, action) => {
      return {
        ...state,
        updating: false
      }
    },
    [userSwitchEnableDisable.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [userSwitchEnableDisable.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [userSwitchEnableDisable.fulfilled]: (state, action) => {
      return {
        ...state
      }
    },
    [postNewUserRequest.pending]: (state, action) => {
      return {
        ...state,
        updating: true
      }
    },
    [postNewUserRequest.rejected]: (state, action) => {
      return {
        ...state,
        updating: false
      }
    },
    [postNewUserRequest.fulfilled]: (state, action) => {
      return {
        ...state,
        updating: false
      }
    },
    [submitUserEdit.pending]: (state, action) => {
      return {
        ...state,
        updating: true
      }
    },
    [submitUserEdit.rejected]: (state, action) => {
      return {
        ...state,
        updating: false
      }
    },
    [submitUserEdit.fulfilled]: (state, action) => {
      return {
        ...state,
        updating: false
      }
    },
    [deleteUser.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [deleteUser.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [deleteUser.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [searchCompany.pending]: (state, action) => {
      return {
        ...state,
        searchedCompaniesLoading: true
      }
    },
    [searchCompany.rejected]: (state, action) => {
      return {
        ...state,
        searchedCompaniesLoading: false
      }
    },
    [searchCompany.fulfilled]: (state, action) => {
      return {
        ...state,
        searchedCompanies: action.payload,
        searchedCompaniesLoading: false
      }
    },
    [initSearchCompany.pending]: (state, action) => {
      return {
        ...state,
        searchedCompaniesLoading: true
      }
    },
    [initSearchCompany.rejected]: (state, action) => {
      return {
        ...state,
        searchedCompaniesLoading: false
      }
    },
    [initSearchCompany.fulfilled]: (state, action) => {
      return {
        ...state,
        searchedCompanies: [action.payload],
        searchedCompaniesLoading: false
      }
    },
    [searchTags.pending]: (state, action) => {
      return {
        ...state,
        searchedTagsLoading: true
      }
    },
    [searchTags.rejected]: (state, action) => {
      return {
        ...state,
        searchedTagsLoading: false
      }
    },
    [searchTags.fulfilled]: (state, action) => {
      return {
        ...state,
        searchedTags: action.payload,
        searchedTagsLoading: false
      }
    },
    [searchMarketSegments.pending]: (state, action) => {
      return {
        ...state,
        searchedMarketSegmentsLoading: true
      }
    },
    [searchMarketSegments.rejected]: (state, action) => {
      return {
        ...state,
        searchedMarketSegmentsLoading: false
      }
    },
    [searchMarketSegments.fulfilled]: (state, action) => {
      return {
        ...state,
        searchedMarketSegments: action.payload,
        searchedMarketSegmentsLoading: false
      }
    },
    [searchSellMarketSegments.pending]: (state, action) => {
      return {
        ...state,
        searchedSellMarketSegmentsLoading: true
      }
    },
    [searchSellMarketSegments.rejected]: (state, action) => {
      return {
        ...state,
        searchedSellMarketSegmentsLoading: false
      }
    },
    [searchSellMarketSegments.fulfilled]: (state, action) => {
      return {
        ...state,
        searchedSellMarketSegments: action.payload,
        searchedSellMarketSegmentsLoading: false
      }
    },
    [searchBuyMarketSegments.pending]: (state, action) => {
      return {
        ...state,
        searchedBuyMarketSegmentsLoading: true
      }
    },
    [searchBuyMarketSegments.rejected]: (state, action) => {
      return {
        ...state,
        searchedBuyMarketSegmentsLoading: false
      }
    },
    [searchBuyMarketSegments.fulfilled]: (state, action) => {
      return {
        ...state,
        searchedBuyMarketSegments: action.payload,
        searchedBuyMarketSegmentsLoading: false
      }
    },
    [handleVariableSave]: (state, action) => {
      return {
        ...state,
        [action.payload.variable]: { ...state[action.payload.variable], ...action.payload.value }
      }
    },
    [getLogisticsProviders.pending]: (state, action) => {
      return {
        ...state,
        logisticsProvidersFetching: true
      }
    },
    [getLogisticsProviders.rejected]: (state, action) => {
      return {
        ...state,
        logisticsProvidersFetching: false
      }
    },
    [getLogisticsProviders.fulfilled]: (state, action) => {
      return {
        ...state,
        logisticsProvidersFetching: false,
        logisticsProviders: action.payload
      }
    },
    [postNewLogisticsProvider.pending]: (state, action) => {
      return {
        ...state,
        updating: true
      }
    },
    [postNewLogisticsProvider.rejected]: (state, action) => {
      return {
        ...state,
        updating: false
      }
    },
    [postNewLogisticsProvider.fulfilled]: (state, action) => {
      return {
        ...state,
        updating: false
      }
    },
    [updateLogisticsProvider.pending]: (state, action) => {
      return {
        ...state,
        updating: true
      }
    },
    [updateLogisticsProvider.rejected]: (state, action) => {
      return {
        ...state,
        updating: false
      }
    },
    [updateLogisticsProvider.fulfilled]: (state, action) => {
      return {
        ...state,
        updating: false
      }
    },
    [deleteLogisticsProvider.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [deleteLogisticsProvider.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [deleteLogisticsProvider.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [postNewCarrier.pending]: (state, action) => {
      return {
        ...state,
        updating: true
      }
    },
    [postNewCarrier.rejected]: (state, action) => {
      return {
        ...state,
        updating: false
      }
    },
    [postNewCarrier.fulfilled]: (state, action) => {
      return {
        ...state,
        updating: false
      }
    },
    [updateCarrier.pending]: (state, action) => {
      return {
        ...state,
        updating: true
      }
    },
    [updateCarrier.rejected]: (state, action) => {
      return {
        ...state,
        updating: false
      }
    },
    [updateCarrier.fulfilled]: (state, action) => {
      return {
        ...state,
        updating: false
      }
    },
    [deleteCarrier.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [deleteCarrier.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [deleteCarrier.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [handleFiltersValue.pending]: (state, action) => {
      return {
        ...state,
        filterValue: '',
        casProductsRows: [],
        companiesRows: []
      }
    },
    [handleFiltersValue.rejected]: (state, action) => {
      return {
        ...state,
        filterValue: '',
        casProductsRows: [],
        companiesRows: []
      }
    },
    [handleFiltersValue.fulfilled]: (state, action) => {
      return {
        ...state,
        filterValue: action.payload.filterValue,
        casProductsRows: action.payload.casProductsRows,
        companiesRows: action.payload.companiesRows
      }
    },
    [getDataRequest.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [getDataRequest.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [getDataRequest.fulfilled]: (state, action) => {
      return {
        ...state
      }
    },
    [deleteConfirmation.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [deleteConfirmation.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [deleteConfirmation.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        deleteRowById: null,
        confirmMessage: null
      }
    }
  },
  initialState
)
