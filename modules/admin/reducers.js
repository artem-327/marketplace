import * as AT from './action-types'
import { config } from './config'

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
  hazardClasses: [],
  hazardClassesLoading: false,
  packagingGroups: [],
  packagingGroupsLoading: false,
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
  productsHazardClasses: [],
  productsPackagingGroups: [],
  searchedCasProducts: [],
  searchedUnNumbers: [],
  searchedManufacturers: [],
  searchedManufacturersLoading: false,
  altEchoNamesRows: [],
  editEchoProductEditTab: 0,
  editEchoProductInitTrig: false,
  currentUser: null,
  user: null,
  userRoles: [],
  adminRoles: [],
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

export default function reducer(state = initialState, action) {
  const { payload } = action

  switch (action.type) {
    case AT.ADMIN_OPEN_POPUP: {
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
        currentEdit2Form: null,
        currentAddDwolla: null
      }
    }

    case AT.ADMIN_CLOSE_POPUP: {
      return {
        ...state,
        popupValues: null,
        currentAddForm: null,
        currentEditForm: null,
        currentEdit2Form: null,
        currentAddDwolla: null
      }
    }

    case AT.ADMIN_OPEN_REGISTER_DWOLLA_ACCOUNT_POPUP: {
      return {
        ...state,
        popupValues: action.payload,
        currentAddDwolla: true
      }
    }

    case AT.ADMIN_CLOSE_REGISTER_DWOLLA_ACCOUNT_POPUP: {
      return {
        ...state,
        popupValues: null,
        currentAddDwolla: null
      }
    }

    case AT.ADMIN_CREATE_DWOLLA_ACCOUNT_PENDING: {
      return {
        ...state
      }
    }

    case AT.ADMIN_CREATE_DWOLLA_ACCOUNT_FULFILLED: {
      return {
        ...state,
        currentAddDwolla: null,
        popupValues: null
      }
    }

    case AT.ADMIN_CREATE_DWOLLA_ACCOUNT_REJECTED: {
      return {
        ...state,
        popupValues: null,
        currentAddDwolla: null
      }
    }

    case AT.ADMIN_OPEN_ADD_POPUP: {
      return {
        ...state,
        currentAddForm: true,
        currentEditForm: null,
        currentEdit2Form: null,
        currentAddDwolla: null,
        popupValues: action.payload
      }
    }
    case AT.ADMIN_CLOSE_ADD_POPUP: {
      return {
        ...state,
        currentAddForm: null,
        currentEditForm: null,
        currentEdit2Form: null,
        currentAddDwolla: null
      }
    }

    case AT.ADMIN_OPEN_EDIT_POPUP: {
      return {
        ...state,
        currentEditForm: true,
        currentAddForm: null,
        currentEdit2Form: null,
        currentAddDwolla: null,
        editPopupBoolean: state.editPopupBoolean === false ? true : false,
        popupValues: action.payload
      }
    }

    case AT.ADMIN_OPEN_EDIT_2_POPUP: {
      return {
        ...state,
        currentEdit2Form: true,
        currentAddForm: null,
        currentEditForm: null,
        currentAddDwolla: null,
        editPopupBoolean: state.editPopupBoolean === false ? true : false,
        popupValues: action.payload
      }
    }

    case AT.ADMIN_CLOSE_EDIT_POPUP: {
      return {
        ...state,
        currentAddForm: null,
        currentEditForm: null,
        currentEdit2Form: null,
        currentAddDwolla: null
      }
    }

    case AT.ADMIN_OPEN_CONFIRM_POPUP: {
      return {
        ...state,
        confirmMessage: true,
        deleteRowById: action.payload
      }
    }

    case AT.ADMIN_DELETE_DOCUMENT_TYPES_DATA_FULFILLED:
    case AT.ADMIN_DELETE_CAS_PRODUCT_FULFILLED:
    case AT.ADMIN_DELETE_UNITS_OF_MEASURE_DATA_FULFILLED:
    case AT.ADMIN_DELETE_UNITS_OF_PACKAGING_DATA_FULFILLED:
    case AT.ADMIN_DELETE_MANUFACTURERS_DATA_FULFILLED:
    case AT.ADMIN_DELETE_GRADES_DATA_FULFILLED:
    case AT.ADMIN_DELETE_FORMS_DATA_FULFILLED:
    case AT.ADMIN_DELETE_CONDITIONS_DATA_FULFILLED:
    case AT.ADMIN_CLOSE_CONFIRM_POPUP: {
      return {
        ...state,
        loading: false,
        deleteRowById: null,
        confirmMessage: null
      }
    }

    case AT.ADMIN_GET_PRIMARY_BRANCH_PROVINCES_FULFILLED: {
      return {
        ...state,
        primaryBranchProvinces: payload.map(d => ({
          text: d.name,
          //! ! This is not working in Admin/Companies - Add/Edit submit sends wrong data body format in this case
          //! ! ??? value: { id: d.id, name: d.name, abbreviation: d.abbreviation || '' },
          value: d.id,
          key: d.id
        }))
      }
    }

    case AT.ADMIN_GET_MAILING_BRANCH_PROVINCES_FULFILLED: {
      return {
        ...state,
        mailingBranchProvinces: payload.map(d => ({
          text: d.name,
          //! ! This is not working in Admin/Companies - Add/Edit submit sends wrong data body format in this case
          //! ! ??? value: { id: d.id, name: d.name, abbreviation: d.abbreviation || '' },
          value: d.id,
          key: d.id
        }))
      }
    }

    case AT.ADMIN_HANDLE_FILTERS_VALUE: {
      return {
        ...state,
        filterValue: action.payload,
        casProductsRows: [],
        companiesRows: []
      }
    }

    case AT.ADMIN_HANDLE_CAS_FILTER_IDS: {
      return {
        ...state,
        filterCasIds: action.payload.map(casProduct => {
          return casProduct.id
        })
      }
    }

    case AT.ADMIN_DELETE_MANUFACTURERS_DATA_PENDING:
    case AT.ADMIN_DELETE_GRADES_DATA_PENDING:
    case AT.ADMIN_DELETE_FORMS_DATA_PENDING:
    case AT.ADMIN_DELETE_CONDITIONS_DATA_PENDING:
    case AT.DELETE_NMFC_NUMBER_PENDING:
    case AT.DELETE_ASSOCIATION_PENDING:
    case AT.ADMIN_DELETE_CARRIER_PENDING:
    case AT.ADMIN_DELETE_LOGISTICS_PROVIDER_PENDING:
    case AT.ADMIN_DELETE_USER_PENDING:
    case AT.ADMIN_ADD_ATTACHMENT_PENDING:
    case AT.ADMIN_LINK_ATTACHMENT_PENDING:
    case AT.ADMIN_REMOVE_ATTACHMENT_PENDING:
    case AT.ADMIN_REMOVE_ATTACHMENT_LINK_PENDING:
    case AT.ADMIN_GET_MANUFACTURERS_BY_STRING_PENDING:
    case AT.ADMIN_GET_CAS_PRODUCT_BY_STRING_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.ADMIN_GET_CAS_PRODUCT_BY_STRING_FULFILLED: {
      return {
        ...state,
        casProductsRows: [
          // ...state.casProductsRows,
          ...action.payload
        ],
        loading: false
      }
    }

    case AT.ADMIN_GET_MANUFACTURERS_BY_STRING_FULFILLED: {
      return {
        ...state,
        manufacturersRows: action.payload,
        loading: false
      }
    }

    case AT.ADMIN_GET_MEASURE_TYPES_FULFILLED: {
      return {
        ...state,
        measureTypes: action.payload
      }
    }

    case AT.ADMIN_GET_ALL_UNITS_OF_MEASURES_FULFILLED: {
      return {
        ...state,
        loading: false,
        unitsOfMeasures: action.payload
      }
    }
    case AT.ADMIN_GET_ALL_UNITS_OF_MEASURES_PENDING: {
      return {
        ...state,
        loading: true
      }
    }
    case AT.ADMIN_GET_ALL_UNITS_OF_MEASURES_REJECTED: {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }

    case AT.ADMIN_GET_HAZARD_CLASSES_PENDING: {
      return { ...state, hazardClassesLoading: true }
    }

    case AT.ADMIN_GET_HAZARD_CLASSES_REJECTED: {
      return { ...state, hazardClassesLoading: false }
    }

    case AT.ADMIN_GET_HAZARD_CLASSES_FULFILLED: {
      return {
        ...state,
        hazardClasses: action.payload,
        hazardClassesLoading: false
      }
    }

    case AT.ADMIN_GET_PACKAGING_GROUPS_PENDING: {
      return { ...state, packagingGroupsLoading: true }
    }

    case AT.ADMIN_GET_PACKAGING_GROUPS_REJECTED: {
      return { ...state, packagingGroupsLoading: false }
    }

    case AT.ADMIN_GET_PACKAGING_GROUPS_FULFILLED: {
      return {
        ...state,
        packagingGroups: action.payload,
        packagingGroupsLoading: false
      }
    }

    case AT.ADMIN_GET_UN_NUMBERS_PENDING:
    case AT.ADMIN_GET_UN_NUMBERS_BY_STRING_PENDING: {
      return {
        ...state,
        unNumbersFetching: true
      }
    }

    case AT.ADMIN_GET_UN_NUMBERS_BY_STRING_FULFILLED:
    case AT.ADMIN_GET_UN_NUMBERS_FULFILLED: {
      return {
        ...state,
        unNumbersFetching: false,
        unNumbersFiltered: action.payload
      }
    }

    // case AT.ADMIN_GET_COMPANIES_FULFILLED: {
    //   const requiredFields = action.payload.map(row => {
    //     return {
    //       ...row,
    //       //displayName: row.displayName,
    //       //primaryBranchAddress: row.primaryBranchAddress,
    //       //primaryContact: row.primaryContact,
    //       //contactEmail: row.contactEmail,
    //       hasDwollaAccount: row.hasDwollaAccount ? 'Yes' : 'No'
    //     }
    //   })
    //   return {
    //     ...state,
    //     loading: false,
    //     companiesRows: [
    //       // ...state.companiesRows,
    //       ...requiredFields
    //     ]
    //   }
    // }

    case AT.ADMIN_GET_FULL_COMPANY_FULFILLED: {
      return {
        ...state,
        singleCompany: action.payload
      }
    }

    case AT.ADMIN_REVIEW_REQUESTED_REJECTED: {
      return {
        ...state,
        companiesRows: state.companiesRows.map(company => {
          return {
            ...company,
            reviewRequested: !company.reviewRequested
          }
        })
      }
    }

    case AT.DELETE_ASSOCIATION_FULFILLED:
    case AT.DELETE_ASSOCIATION_REJECTED:
    case AT.DELETE_NMFC_NUMBER_REJECTED:
    case AT.DELETE_NMFC_NUMBER_FULFILLED:
    case AT.ADMIN_DELETE_CONDITIONS_DATA_REJECTED:
    case AT.ADMIN_DELETE_FORMS_DATA_REJECTED:
    case AT.ADMIN_DELETE_GRADES_DATA_REJECTED:
    case AT.ADMIN_DELETE_MANUFACTURERS_DATA_REJECTED:
    case AT.ADMIN_DELETE_CARRIER_FULFILLED:
    case AT.ADMIN_DELETE_LOGISTICS_PROVIDER_FULFILLED:
    case AT.ADMIN_DELETE_USER_FULFILLED:
    case AT.ADMIN_ADD_ATTACHMENT_FULFILLED:
    case AT.ADMIN_LINK_ATTACHMENT_FULFILLED:
    case AT.ADMIN_REMOVE_ATTACHMENT_FULFILLED:
    case AT.ADMIN_REMOVE_ATTACHMENT_LINK_FULFILLED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.ADMIN_DELETE_CARRIER_REJECTED:
    case AT.ADMIN_DELETE_LOGISTICS_PROVIDER_REJECTED:
    case AT.ADMIN_DELETE_USER_REJECTED:
    case AT.ADMIN_ADD_ATTACHMENT_REJECTED:
    case AT.ADMIN_LINK_ATTACHMENT_REJECTED:
    case AT.ADMIN_REMOVE_ATTACHMENT_REJECTED:
    case AT.ADMIN_REMOVE_ATTACHMENT_LINK_REJECTED:
    case AT.ADMIN_GET_MANUFACTURERS_BY_STRING_REJECTED:
    case AT.ADMIN_GET_CAS_PRODUCT_BY_STRING_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    /* DELETE UNIT */

    case AT.ADMIN_DELETE_UNIT_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.ADMIN_DELETE_UNIT_FULFILLED: {
      return {
        ...state,
        unitsOfMeasureRows: state.unitsOfMeasureRows.filter(el => el.id !== payload),
        loading: false
      }
    }

    case AT.ADMIN_DELETE_UNIT_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    /* DELETE UNIT OF PACKAGING */

    case AT.ADMIN_DELETE_UNIT_OF_PACKAGING_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.ADMIN_DELETE_UNIT_OF_PACKAGING_FULFILLED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.ADMIN_DELETE_UNIT_OF_PACKAGING_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.ADMIN_GET_ADDRESSES_SEARCH_PRIMARY_BRANCH_FULFILLED: {
      return {
        ...state,
        addressSearchPrimaryBranch: action.payload,
        loading: false
      }
    }

    case AT.ADMIN_GET_ADDRESSES_SEARCH_MAILING_BRANCH_FULFILLED: {
      return {
        ...state,
        addressSearchMailingBranch: action.payload,
        loading: false
      }
    }

    case AT.ADMIN_ADD_UN_NUMBER: {
      let copy = state.unNumbersFiltered.slice()
      if (!(payload instanceof Array)) payload = [payload]

      payload.forEach(element => {
        if (!copy.find(e => e.id === element.id)) copy.push(element)
      })

      return {
        ...state,
        unNumbersFiltered: copy
      }
    }
    case AT.ADMIN_GET_COMPANY_DETAILS_FULFILLED: {
      return {
        ...state,
        company: payload
      }
    }

    case AT.ADMIN_SEARCH_UN_NUMBER_FULFILLED: {
      return {
        ...state,
        searchedUnNumbers: action.payload.data
      }
    }

    // case AT.ADMIN_CREATE_ELEMENTS_INDEX: {
    //   // ADD new array to casProducts
    //   let { searchedCasProducts } = state
    //   searchedCasProducts.push([])

    //   return {
    //     ...state,
    //     searchedCasProducts
    //   }
    // }

    // case AT.ADMIN_REMOVE_ELEMENTS_INDEX: {
    //   // REMOVE array from casProducts
    //   let { searchedCasProducts } = state
    //   searchedCasProducts.splice(action.payload.index, 1)

    //   return {
    //     ...state,
    //     searchedCasProducts
    //   }
    // }

    // case AT.ADMIN_PREPARE_CAS_PRODUCTS: {
    //   return {
    //     ...state,
    //     searchedCasProducts: action.payload.elements.map(element => {
    //       return [element.casProduct]
    //     })
    //   }
    // }

    case AT.ADMIN_GET_PRODUCTS_CATALOG_DATA_FULFILLED: {
      const hazardClasses = action.payload.hazardClasses.map((hClass, id) => {
        return {
          key: id,
          text: hClass.classCode + ': ' + hClass.description,
          value: hClass.id
        }
      })
      const packagingGroups = action.payload.packagingGroups.map((pGroup, id) => {
        return {
          key: id,
          text: pGroup.groupCode + ': ' + pGroup.description,
          value: pGroup.id
        }
      })
      return {
        ...state,
        //loading: false,
        //loaded: true,
        productsHazardClasses: hazardClasses,
        productsPackagingGroups: packagingGroups
      }
    }

    case AT.ADMIN_SEARCH_MANUFACTURERS_PENDING: {
      return {
        ...state,
        searchedManufacturersLoading: true
      }
    }

    case AT.ADMIN_SEARCH_MANUFACTURERS_FULFILLED: {
      return {
        ...state,
        searchedManufacturers: action.payload.data.map(manufacturer => ({
          key: manufacturer.id,
          value: manufacturer.id,
          text: manufacturer.name
        })),
        searchedManufacturersLoading: false
      }
    }

    case AT.ADMIN_GET_USERS_ME_FULFILLED: {
      return {
        ...state,
        currentUser: action.payload
      }
    }

    case AT.ADMIN_GET_ROLES_FULFILLED: {
      return {
        ...state,
        userRoles: action.payload
      }
    }

    case AT.ADMIN_GET_ADMIN_ROLES_FULFILLED: {
      return {
        ...state,
        adminRoles: action.payload
      }
    }

    case AT.ADMIN_SEARCH_COMPANY_PENDING: {
      return { ...state, searchedCompaniesLoading: true }
    }
    case AT.ADMIN_SEARCH_COMPANY_REJECTED: {
      return { ...state, searchedCompaniesLoading: false }
    }
    case AT.ADMIN_SEARCH_COMPANY_FULFILLED: {
      return {
        ...state,
        searchedCompanies: action.payload,
        searchedCompaniesLoading: false
      }
    }

    case AT.ADMIN_INIT_SEARCH_COMPANY_PENDING: {
      return { ...state, searchedCompaniesLoading: true }
    }
    case AT.ADMIN_INIT_SEARCH_COMPANY_REJECTED: {
      return { ...state, searchedCompaniesLoading: false }
    }
    case AT.ADMIN_INIT_SEARCH_COMPANY_FULFILLED: {
      return {
        ...state,
        searchedCompanies: [action.payload],
        searchedCompaniesLoading: false
      }
    }

    case AT.ADMIN_GET_USER_PENDING: {
      return { ...state, updating: true }
    }
    case AT.ADMIN_GET_USER_REJECTED: {
      return { ...state, updating: false }
    }
    case AT.ADMIN_GET_USER_FULFILLED: {
      return {
        ...state,
        updating: false
      }
    }

    case AT.ADMIN_POST_NEW_CARRIER_PENDING:
    case AT.ADMIN_EDIT_CARRIER_PENDING:
    case AT.ADMIN_POST_NEW_LOGISTICS_PROVIDER_PENDING:
    case AT.ADMIN_EDIT_LOGISTICS_PROVIDER_PENDING:
    case AT.ADMIN_EDIT_USER_PENDING:
    case AT.ADMIN_POST_NEW_USER_PENDING: {
      return { ...state, updating: true }
    }

    case AT.ADMIN_POST_NEW_CARRIER_FULFILLED:
    case AT.ADMIN_POST_NEW_CARRIER_REJECTED:
    case AT.ADMIN_EDIT_CARRIER_FULFILLED:
    case AT.ADMIN_EDIT_CARRIER_REJECTED:
    case AT.ADMIN_POST_NEW_LOGISTICS_PROVIDER_FULFILLED:
    case AT.ADMIN_POST_NEW_LOGISTICS_PROVIDER_REJECTED:
    case AT.ADMIN_EDIT_LOGISTICS_PROVIDER_FULFILLED:
    case AT.ADMIN_EDIT_LOGISTICS_PROVIDER_REJECTED:
    case AT.ADMIN_POST_NEW_USER_REJECTED:
    case AT.ADMIN_POST_NEW_USER_FULFILLED:
    case AT.ADMIN_EDIT_USER_REJECTED:
    case AT.ADMIN_EDIT_USER_FULFILLED: {
      return { ...state, updating: false }
    }

    case AT.ADMIN_SEARCH_TAGS_PENDING: {
      return { ...state, searchedTagsLoading: true }
    }
    case AT.ADMIN_SEARCH_TAGS_REJECTED: {
      return { ...state, searchedTagsLoading: false }
    }
    case AT.ADMIN_SEARCH_TAGS_FULFILLED: {
      return {
        ...state,
        searchedTags: action.payload,
        searchedTagsLoading: false
      }
    }

    case AT.ADMIN_SEARCH_MARKET_SEGMENTS_PENDING: {
      return { ...state, searchedMarketSegmentsLoading: true }
    }
    case AT.ADMIN_SEARCH_MARKET_SEGMENTS_REJECTED: {
      return { ...state, searchedMarketSegmentsLoading: false }
    }
    case AT.ADMIN_SEARCH_MARKET_SEGMENTS_FULFILLED: {
      return {
        ...state,
        searchedMarketSegments: action.payload,
        searchedMarketSegmentsLoading: false
      }
    }

    case AT.ADMIN_SEARCH_SELL_MARKET_SEGMENTS_PENDING: {
      return { ...state, searchedSellMarketSegmentsLoading: true }
    }
    case AT.ADMIN_SEARCH_SELL_MARKET_SEGMENTS_REJECTED: {
      return { ...state, searchedSellMarketSegmentsLoading: false }
    }
    case AT.ADMIN_SEARCH_SELL_MARKET_SEGMENTS_FULFILLED: {
      return {
        ...state,
        searchedSellMarketSegments: action.payload,
        searchedSellMarketSegmentsLoading: false
      }
    }

    case AT.ADMIN_SEARCH_BUY_MARKET_SEGMENTS_PENDING: {
      return { ...state, searchedBuyMarketSegmentsLoading: true }
    }
    case AT.ADMIN_SEARCH_BUY_MARKET_SEGMENTS_REJECTED: {
      return { ...state, searchedBuyMarketSegmentsLoading: false }
    }
    case AT.ADMIN_SEARCH_BUY_MARKET_SEGMENTS_FULFILLED: {
      return {
        ...state,
        searchedBuyMarketSegments: action.payload,
        searchedBuyMarketSegmentsLoading: false
      }
    }

    case AT.ADMIN_HANDLE_VARIABLE_CHANGE: {
      return {
        ...state,
        [payload.variable]: payload.value
      }
    }

    case AT.ADMIN_GET_LOGISTICS_PROVIDERS_PENDING: {
      return {
        ...state,
        logisticsProvidersFetching: true
      }
    }

    case AT.ADMIN_GET_LOGISTICS_PROVIDERS_FULFILLED: {
      return {
        ...state,
        logisticsProvidersFetching: false,
        logisticsProviders: payload
      }
    }

    case AT.ADMIN_GET_LOGISTICS_PROVIDERS_REJECTED: {
      return {
        ...state,
        logisticsProvidersFetching: false
      }
    }

    default: {
      for (let groupName in config) {
        if (typeof config[groupName].api !== 'undefined') {
          for (let item in config[groupName].api) {
            switch (item) {
              case 'get':
                if (config[groupName].api.get.typeSuccess === action.type) {
                  if (typeof config[groupName].api.get.retFcnProcess !== 'undefined') {
                    return config[groupName].api.get.retFcnProcess(state, action, config[groupName])
                  } else {
                    const rows = action.payload.map(data => {
                      return data
                    })

                    return {
                      ...state,
                      loading: false,
                      [config[groupName].api.get.dataName]: rows
                    }
                  }
                } else if (config[groupName].api.get.typeRequest + '_PENDING' === action.type) {
                  return {
                    ...state,
                    loading: true
                  }
                }
                break
            }
          }
        }
      }
      return state
    }
  }
}
