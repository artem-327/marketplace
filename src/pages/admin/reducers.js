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
  measureTypes: [],
  hazardClasses: [],
  packagingGroups: [],
  unNumbers: [],

  companiesRows: [],
  countries: [],
  tabsNames: [
    { name: 'CAS Products', id: 7 },
    { name: 'Companies', id: 8 },
    { name: 'Units of Measure', id: 1 },
    { name: 'Units of Packaging', id: 2 },
    { name: 'Manufacturers', id: 3 },
    { name: 'Grades', id: 4 },
    { name: 'Forms', id: 5 },
    { name: 'Conditions', id: 6 },
  ],

  currentTab: 'Companies',
  casListDataRequest: { pageSize: 50, pageStart: 0 },
  currentEditForm: null,
  currentAddForm: null,
  confirmMessage: null,
  filterValue: '',
  loading: false,
  config: config,
}

export default function reducer(state = initialState, action) {
  const {payload} = action
  
  switch (action.type) {

    case AT.ADMIN_OPEN_POPUP: {
      return { ...state,
        [payload.data ? 'currentEditForm' : 'currentAddForm']: state.currentTab,
        popupValues: payload.data
      }
    }

    case AT.ADMIN_CLOSE_POPUP: {
      return { ...state,
        currentAddForm: null,
        currentEditForm: null
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
        currentEditForm: null
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
    case AT.ADMIN_CLOSE_EDIT_POPUP: {
      return {
        ...state,
        currentEditForm: null
      }
    }

    case AT.ADMIN_GET_COUNTRIES_FULFILLED: {
      return {...state,
        countries: payload.countries.map(c => ({
          text: c.name,
          value: c.id,
          key: c.id
        })),
        zipCodes: payload.zipCodes.map(z => ({
          text: z.zip,
          value: z.zip,
          key: z.id
        }))
      }
    }

    case AT.ADMIN_HANDLE_ACTIVE_TAB: {
      return {
        ...state,
        currentTab: action.payload.tab,
        currentAddForm: null,
        currentEditForm: null
      }
    }

    case AT.ADMIN_HANDLE_FILTERS_VALUE: {
      return {
        ...state,
        filterValue: action.payload
      }
    }

    case AT.ADMIN_GET_CAS_PRODUCT_BY_FILTER_PENDING:
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
        casProductsRows: action.payload,
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
        unNumbers: action.payload
      }
    }

    case AT.ADMIN_GET_COMPANIES_PENDING: {
      return { ...state,
        loading: true
      }
    }

    case AT.ADMIN_GET_COMPANIES_FULFILLED: {
      return { ...state,
        loading: false,
        companiesRows: action.payload
      }
    }

    case AT.ADMIN_GET_COMPANIES_REJECTED: {
      return { ...state,
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
                      [config[groupName].api.get.dataName]: rows
                    }
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