import * as AT from './action-types'
import { config } from './config'

export const initialState = {
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
  documentTypesRows: [],
  measureTypes: [],
  hazardClasses: [],
  packagingGroups: [],
  unNumbersFiltered: [],
  companiesRows: [],
  countries: [],
  countriesDropDown: [],
  singleCompany: [],
  primaryBranchProvinces: [],
  mailingBranchProvinces: [],
  tabsNames: [
    { name: 'CAS Products', id: 7 },
    { name: 'Companies', id: 8 },
    { name: 'Units of Measure', id: 1 },
    { name: 'Units of Packaging', id: 2 },
    { name: 'Manufacturers', id: 3 },
    { name: 'Grades', id: 4 },
    { name: 'Forms', id: 5 },
    { name: 'Conditions', id: 6 },
    { name: 'Document Types', id: 9 },
  ],

  currentTab: 'Companies',
  casListDataRequest: { pageSize: 50, pageNumber: 0, sortDirection: "ASC", sortPath: "CasProduct.chemicalName" },
  companyListDataRequest: { pageSize: 50, pageNumber: 0, sortDirection: "ASC", sortPath: "Company.name" },
  currentEditForm: null,
  currentEdit2Form: null,
  currentAddForm: null,
  currentAddDwolla: null,
  
  confirmMessage: null,
  deleteRowById: null,
  filterValue: '',
  filterCasIds: [],
  loading: false,
  config: config,
}

export default function reducer(state = initialState, action) {
  const { payload } = action

  switch (action.type) {

    case AT.ADMIN_OPEN_POPUP: {
      return {
        ...state,
        [payload.data ? 'currentEditForm' : 'currentAddForm']: state.currentTab,
        popupValues: payload.data
      }
    }

    case AT.ADMIN_CLOSE_POPUP: {
      return {
        ...state,
        currentAddForm: null,
        currentEditForm: null,
        currentEdit2Form: null
      }
    }

    case AT.ADMIN_OPEN_REGISTER_DWOLLA_ACCOUNT_POPUP: {
      return {
        ...state,
        // popupValues: action.payload,
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

    case AT.ADMIN_OPEN_ADD_POPUP: {
      return {
        ...state,
        currentAddForm: state.currentTab,
        popupValues: action.payload
      }
    }
    case AT.ADMIN_CLOSE_ADD_POPUP: {
      return {
        ...state,
        currentAddForm: null,
        currentEditForm: null,
        currentEdit2Form: null
      }
    }

    case AT.ADMIN_OPEN_EDIT_POPUP: {
      return {
        ...state,
        currentEditForm: state.currentTab,
        editPopupBoolean: state.editPopupBoolean === false ? true : false,
        popupValues: action.payload
      }
    }

    case AT.ADMIN_OPEN_EDIT_2_POPUP: {
      return {
        ...state,
        currentEdit2Form: state.currentTab,
        editPopupBoolean: state.editPopupBoolean === false ? true : false,
        popupValues: action.payload
      }
    }

    case AT.ADMIN_CLOSE_EDIT_POPUP: {
      return {
        ...state,
        currentEditForm: null,
        currentEdit2Form: null
      }
    }

    case AT.ADMIN_OPEN_CONFIRM_POPUP: {
      return {
        ...state,
        confirmMessage: true,
        deleteRowById: action.payload,
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
        deleteRowById: null,
        confirmMessage: null
      }
    }

    /* DELETE COMPANY */

    case AT.ADMIN_DELETE_COMPANIES_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.ADMIN_DELETE_COMPANIES_FULFILLED: {
      return {
        ...state,
        loading: false,
        companiesRows: state.companiesRows.filter((company) => company.id !== payload)
      }
    }

    case AT.ADMIN_DELETE_COMPANIES_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.ADMIN_GET_COUNTRIES_FULFILLED: {
      return {
        ...state,
        countries: payload.countries,
        countriesDropDown: payload.countries.map(c => ({
          text: c.name,
          value: c.id,
          key: c.id,
        }))
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




    case AT.ADMIN_HANDLE_ACTIVE_TAB: {
      return {
        ...state,
        currentTab: action.payload.tab,
        currentAddForm: null,
        currentEditForm: null,
        currentEdit2Form: null,
        filterCasIds: [],
        filterValue: ''
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


    case AT.ADMIN_GET_COMPANIES_PENDING:
    case AT.ADMIN_POST_NEW_PRODUCT_NAME_PENDING:
    case AT.ADMIN_UPDATE_PRODUCT_NAME_PENDING:
    case AT.ADMIN_DELETE_PRODUCT_NAME_PENDING:
    case AT.ADMIN_GET_ALTERNATIVE_CAS_PRODUCT_NAMES_PENDING:
    case AT.ADMIN_GET_CAS_PRODUCT_BY_FILTER_PENDING:
    case AT.ADMIN_GET_MANUFACTURERS_BY_STRING_PENDING:
    case AT.ADMIN_GET_CAS_PRODUCT_BY_STRING_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.ADMIN_GET_CAS_PRODUCT_BY_FILTER_FULFILLED:
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

    case AT.ADMIN_GET_ALTERNATIVE_CAS_PRODUCT_NAMES_FULFILLED: {
      return {
        ...state,
        altCasNamesRows: action.payload,
        loading: false
      }
    }

    case AT.ADMIN_GET_MEASURE_TYPES_FULFILLED: {
      return {
        ...state,
        measureTypes: action.payload
      }
    }

    case AT.ADMIN_GET_HAZARD_CLASSES_FULFILLED: {
      return {
        ...state,
        hazardClasses: action.payload
      }
    }

    case AT.ADMIN_GET_PACKAGING_GROUPS_FULFILLED: {
      return {
        ...state,
        packagingGroups: action.payload
      }
    }

    case AT.ADMIN_GET_UN_NUMBERS_BY_STRING_FULFILLED:
    case AT.ADMIN_GET_UN_NUMBERS_FULFILLED: {
      return {
        ...state,
        unNumbersFiltered: action.payload
      }
    }

    case AT.ADMIN_GET_COMPANIES_FULFILLED: {
      const requiredFields = action.payload.map(row => {
        return {
          ...row,
          //displayName: row.displayName,
          //primaryBranchAddress: row.primaryBranchAddress,
          //primaryContact: row.primaryContact,
          //contactEmail: row.contactEmail,
          hasDwollaAccount: row.hasDwollaAccount ? 'Yes' : 'No'
        }
      })
      return {
        ...state,
        loading: false,
        companiesRows: [
          // ...state.companiesRows,
          ...requiredFields
        ]
      }
    }

    case AT.ADMIN_GET_FULL_COMPANY_FULFILLED: {
      return {
        ...state,
        singleCompany: action.payload
      }
    }

    case AT.ADMIN_POST_NEW_PRODUCT_NAME_REJECTED:
    case AT.ADMIN_UPDATE_PRODUCT_NAME_REJECTED:
    case AT.ADMIN_DELETE_PRODUCT_NAME_REJECTED:
    case AT.ADMIN_GET_ALTERNATIVE_CAS_PRODUCT_NAMES_REJECTED:
    case AT.ADMIN_GET_CAS_PRODUCT_BY_FILTER_REJECTED:
    case AT.ADMIN_GET_MANUFACTURERS_BY_STRING_REJECTED:
    case AT.ADMIN_GET_CAS_PRODUCT_BY_STRING_REJECTED:
    case AT.ADMIN_GET_COMPANIES_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    /* CAS DELETE PRODUCT */

    case AT.ADMIN_CAS_DELETE_PRODUCT_PENDING: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.ADMIN_CAS_DELETE_PRODUCT_FULFILLED: {
      return {
        ...state,
        casProductsRows: state.casProductsRows.filter((row) => row.id !== payload),
        loading: false
      }
    }

    case AT.ADMIN_CAS_DELETE_PRODUCT_REJECTED: {
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
        unitsOfMeasureRows: state.unitsOfMeasureRows.filter((el) => el.id !== payload),
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
        unitsOfPackagingRows: state.unitsOfPackagingRows.filter((el) => el.id !== payload),
        loading: false
      }
    }

    case AT.ADMIN_DELETE_UNIT_OF_PACKAGING_REJECTED: {
      return {
        ...state,
        loading: false
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
                  }
                  else {
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