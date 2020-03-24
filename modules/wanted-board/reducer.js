import * as AT from './action-types'
import { uniqueArrayByKey, getSafe } from '~/utils/functions'
import { Header } from 'semantic-ui-react'
import React from "react"

export const initialState = {
  editedId: null,
  editWindowOpen: null,
  sidebarValues: null,
  editInitTrig: false,
  loading: false,
  purchaseRequestPending: false,
  autocompleteData: [],
  autocompleteDataLoading: false,
  listPackagingTypes: [],
  listPackagingTypesLoading: false,
  listConditions: [],
  listConditionsLoading: false,
  listForms: [],
  listFormsLoading: false,
  listGrades: [],
  listGradesLoading: false,
  listWarehouses: [],
  listWarehousesLoading: false,
  listCountries: [],
  countries: [],
  listCountriesLoading: false,
  listProvinces: [],
  listProvincesLoading: false,
  listUnits: [],
  listUnitsLoading: false,
  searchedManufacturers: [],
  searchedManufacturersLoading: false,
  searchedCasNumbers: [],
  searchedCasNumbersLoading: false,
  openedSubmitOfferPopup: false,
  popupValues: null,
  wantedBoardType: 'product',
  myRequestedItemsType: 'product',

  //datagridFilter: { filters: [] },
  //datagridFilterUpdate: false
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {

    case AT.WB_OPEN_SUBMIT_OFFER: {
      return {
        ...state,
        openedSubmitOfferPopup: true,
        popupValues: payload
      }
    }

    case AT.WB_CLOSE_POPUP: {
      return {
        ...state,
        openedSubmitOfferPopup: false,
      }
    }

    case AT.WB_UPDATE_EDITED_ID: {
      return {
        ...state,
        editedId: payload,
      }
    }

    case AT.WB_CLOSE_DETAIL_SIDEBAR: {
      return {
        ...state,
        editWindowOpen: null,
        editedId: null
      }
    }

    case AT.WB_SET_WANTED_BOARD_TYPE: {
      return {
        ...state,
        wantedBoardType: payload,
      }
    }
    case AT.WB_SET_MY_REQUESTED_ITEM_TYPE: {
      return {
        ...state,
        myRequestedItemsType: payload,
      }
    }

    case AT.WB_HANDLE_FILTERS_VALUE: {
      return {
        ...state,
        filterValue: action.payload
      }
    }

    case AT.WB_SUBMIT_OFFER_PENDING: {
      return {
        ...state,
        purchaseRequestPending: true
      }
    }

    case AT.WB_SUBMIT_OFFER_REJECTED:
    case AT.WB_SUBMIT_OFFER_FULFILLED: {
      return {
        ...state,
        purchaseRequestPending: false
      }
    }

    case AT.WB_SIDEBAR_DETAIL_TRIGGER: {
      const row = payload.row ? payload.row.rawData : null
      return {
        ...state,
        editInitTrig: !state.editInitTrig,
        editWindowOpen: payload.activeTab,
        sidebarValues: payload.row,
        ...(row && {
          searchedManufacturers: uniqueArrayByKey(row.manufacturers.map(data => {
            return {
              key: data.id,
              value: data.id,
              text: data.name
            }
          }).concat(state.searchedManufacturers), 'key'),
          autocompleteData: (row.element.echoProduct
            ? uniqueArrayByKey([{
              key: row.element.echoProduct.id,
              text: `${row.element.echoProduct.name} ${row.element.echoProduct.code}`,
              value: row.element.echoProduct.id,
            }].concat(state.autocompleteData), 'key')
            : state.autocompleteData),
          searchedCasNumbers: (row.element.casProduct
            ? uniqueArrayByKey([{
              key: row.element.casProduct.id,
              text: row.element.casProduct.casNumber,
              value: row.element.casProduct.id,
              content: (
                <Header
                  content={row.element.casProduct.casNumber}
                  subheader={row.element.casProduct.casIndexName}
                  style={{ fontSize: '1em' }}
                />
              )
            }].concat(state.searchedCasNumbers), 'key')
            : state.searchedCasNumbers),
        })
      }
    }

    case AT.WB_SIDEBAR_MO_DETAIL_TRIGGER: {
      const row = payload ? payload.rawData : null
      const manufacturer = getSafe(() => row.productOffer.companyProduct.echoProduct.manufacturer, null)
      const product = getSafe(() => row.productOffer.companyProduct.echoProduct, null)
      return {
        ...state,
        editInitTrig: !state.editInitTrig,
        editWindowOpen: 'my-offers',
        sidebarValues: row,
        ...(row && {
          searchedManufacturers: (manufacturer
            ? uniqueArrayByKey([{
                key: manufacturer.id,
                value: manufacturer.id,
                text: manufacturer.name
              }].concat(state.searchedManufacturers), 'key')
            : state.searchedManufacturers),
          autocompleteData: (product
            ? uniqueArrayByKey([{
              key: product.id,
              text: `${product.name} ${product.code}`,
              value: product.id,
            }].concat(state.autocompleteData), 'key')
            : state.autocompleteData),
        })
      }
    }

    case AT.WB_GET_AUTOCOMPLETE_DATA_PENDING: { return { ...state, autocompleteDataLoading: true } }
    case AT.WB_GET_AUTOCOMPLETE_DATA_REJECTED: { return { ...state, autocompleteDataLoading: false } }
    case AT.WB_GET_AUTOCOMPLETE_DATA_FULFILLED: {
      return {
        ...state,
        autocompleteDataLoading: false,
        autocompleteData: uniqueArrayByKey(action.payload.map(el => {
            const productCode = getSafe(() => el.code, '')
            const productName = getSafe(() => el.name, '')
            return {
              key: el.id,
              text: `${productName} ${productCode}`,
              value: el.id,
            }
          })
          .concat(state.autocompleteData), 'key')
      }
    }

    case AT.WB_GET_PACKAGING_TYPES_PENDING: { return { ...state, listPackagingTypesLoading: true } }
    case AT.WB_GET_PACKAGING_TYPES_REJECTED: { return { ...state, listPackagingTypesLoading: false } }
    case AT.WB_GET_PACKAGING_TYPES_FULFILLED: {
      return {
        ...state,
        listPackagingTypesLoading: false,
        listPackagingTypes: payload.map(data => {
          return {
            key: data.id,
            value: data.id,
            text: data.name
          }
        })
      }
    }

    case AT.WB_GET_CONDITIONS_PENDING: { return { ...state, listConditionsLoading: true } }
    case AT.WB_GET_CONDITIONS_REJECTED: { return { ...state, listConditionsLoading: false } }
    case AT.WB_GET_CONDITIONS_FULFILLED: {
      return {
        ...state,
        listConditionsLoading: false,
        listConditions: payload.map(data => {
          return {
            key: data.id,
            value: data.id,
            text: data.name
          }
        })
      }
    }

    case AT.WB_GET_FORMS_PENDING: { return { ...state, listFormsLoading: true } }
    case AT.WB_GET_FORMS_REJECTED: { return { ...state, listFormsLoading: false } }
    case AT.WB_GET_FORMS_FULFILLED: {
      return {
        ...state,
        listFormsLoading: false,
        listForms: payload.map(data => {
          return {
            key: data.id,
            value: data.id,
            text: data.name
          }
        })
      }
    }

    case AT.WB_GET_GRADES_PENDING: { return { ...state, listGradesLoading: true } }
    case AT.WB_GET_GRADES_REJECTED: { return { ...state, listGradesLoading: false } }
    case AT.WB_GET_GRADES_FULFILLED: {
      return {
        ...state,
        listGradesLoading: false,
        listGrades: payload.map(data => {
          return {
            key: data.id,
            value: data.id,
            text: data.name
          }
        })
      }
    }

    case AT.WB_GET_UNITS_PENDING: { return { ...state, listUnitsLoading: true } }
    case AT.WB_GET_UNITS_REJECTED: { return { ...state, listUnitsLoading: false } }
    case AT.WB_GET_UNITS_FULFILLED: {
      return {
        ...state,
        listUnitsLoading: false,
        listUnits: payload.map(data => {
          return {
            key: data.id,
            value: data.id,
            text: data.nameAbbreviation
          }
        })
      }
    }

    case AT.WB_GET_WAREHOUSES_PENDING: { return { ...state, listWarehousesLoading: true } }
    case AT.WB_GET_WAREHOUSES_REJECTED: { return { ...state, listWarehousesLoading: false } }
    case AT.WB_GET_WAREHOUSES_FULFILLED: {
      return {
        ...state,
        listWarehousesLoading: false,
        listWarehouses: payload
      }
    }

    case AT.WB_GET_COUNTRIES_PENDING: { return { ...state, listCountriesLoading: true } }
    case AT.WB_GET_COUNTRIES_REJECTED: { return { ...state, listCountriesLoading: false } }
    case AT.WB_GET_COUNTRIES_FULFILLED: {
      return {
        ...state,
        listCountriesLoading: false,
        countries: payload,
        listCountries: payload.map(data => {
          return {
            key: data.id,
            value: data.id,
            text: data.name
          }
        })
      }
    }

    case AT.WB_GET_PROVINCES_PENDING: { return { ...state, listProvincesLoading: true } }
    case AT.WB_GET_PROVINCES_REJECTED: { return { ...state, listProvincesLoading: false } }
    case AT.WB_GET_PROVINCES_FULFILLED: {
      return {
        ...state,
        listProvincesLoading: false,
        listProvinces: payload.map(data => {
          return {
            key: data.id,
            value: data.id,
            text: data.name
          }
        })
      }
    }

    case AT.WB_SEARCH_MANUFACTURERS_PENDING: { return { ...state, searchedManufacturersLoading: true } }
    case AT.WB_SEARCH_MANUFACTURERS_REJECTED: { return { ...state, searchedManufacturersLoading: false } }
    case AT.WB_SEARCH_MANUFACTURERS_FULFILLED: {
      return {
        ...state,
        searchedManufacturersLoading: false,
        searchedManufacturers: uniqueArrayByKey(action.payload.map(data => {
          return {
            key: data.id,
            value: data.id,
            text: data.name
          }
        })
          .concat(state.searchedManufacturers), 'key')
      }
    }

    case AT.WB_SEARCH_CAS_NUMBER_PENDING: { return { ...state, searchedCasNumbersLoading: true } }
    case AT.WB_SEARCH_CAS_NUMBER_REJECTED: { return { ...state, searchedCasNumbersLoading: false } }
    case AT.WB_SEARCH_CAS_NUMBER_FULFILLED: {
      return {
        ...state,
        searchedCasNumbersLoading: false,
        searchedCasNumbers: uniqueArrayByKey(action.payload.map(data => {
          return {
            key: data.id,
            value: data.id,
            text: data.casNumber,
            content: (
              <Header
                content={data.casNumber}
                subheader={data.casIndexName}
                style={{ fontSize: '1em' }}
              />
            )
          }
        }).concat(state.searchedCasNumbers), 'key')
      }
    }

    case AT.WB_DELETE_PURCHASE_REQUEST_ITEM_PENDING:
    case AT.WB_PURCHASE_REQUESTED_ITEM_PENDING:
    case AT.WB_REJECT_REQUESTED_ITEM_PENDING:
    case AT.WB_EDIT_PURCHASE_REQUEST_PENDING:
    case AT.WB_ADD_PURCHASE_REQUEST_PENDING:
    case AT.WB_EDIT_MY_PURCHASE_OFFER_PENDING: {
      return { ...state, loading: true }
    }

    case AT.WB_DELETE_PURCHASE_REQUEST_ITEM_REJECTED:
    case AT.WB_PURCHASE_REQUESTED_ITEM_REJECTED:
    case AT.WB_REJECT_REQUESTED_ITEM_REJECTED:
    case AT.WB_EDIT_PURCHASE_REQUEST_REJECTED:
    case AT.WB_ADD_PURCHASE_REQUEST_REJECTED:
    case AT.WB_EDIT_MY_PURCHASE_OFFER_REJECTED: {
      return { ...state, loading: false }
    }

    case AT.WB_DELETE_PURCHASE_REQUEST_ITEM_FULFILLED:
    case AT.WB_PURCHASE_REQUESTED_ITEM_FULFILLED:
    case AT.WB_REJECT_REQUESTED_ITEM_FULFILLED:
    case AT.WB_EDIT_PURCHASE_REQUEST_FULFILLED:
    case AT.WB_ADD_PURCHASE_REQUEST_FULFILLED:
    case AT.WB_EDIT_MY_PURCHASE_OFFER_FULFILLED: {
      return { ...state, loading: false }
    }


    default: {
      return state
    }
  }
}
