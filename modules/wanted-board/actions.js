import * as AT from './action-types'
import { CART_FETCH_FULFILLED } from './../purchase-order/action-types'
import * as api from './api'
import { Datagrid } from '~/modules/datagrid'

export const closeDetailSidebar = id => {
  return {
    type: AT.WB_CLOSE_DETAIL_SIDEBAR,
    payload: null
  }
}

export const sidebarDetailTrigger = (row = null, activeTab = '') => {
  return {
    type: AT.WB_SIDEBAR_DETAIL_TRIGGER,
    async payload() {
      let response
      if (row) {
        response = await api.getPurchaseRequest(row.id)
      }

      return {
        row: activeTab === 'bids-received' && row ? { ...response, rawData: response } : row,
        activeTab
      }
    }
  }
}

export const myOffersSidebarTrigger = (row = null, activeTab = '') => {
  return {
    type: AT.WB_SIDEBAR_MO_DETAIL_TRIGGER,
    payload: { row, activeTab }
  }
}

export const deletePurchaseRequestItem = id => {
  return {
    type: AT.WB_DELETE_PURCHASE_REQUEST_ITEM,
    payload: api.deletePurchaseRequestItem(id)
  }
}

export const deleteMyOfferItem = id => {
  return {
    type: AT.WB_DELETE_MY_OFFER_ITEM,
    payload: api.deleteMyOfferItem(id)
  }
}

export const openSubmitOffer = (row, isSecondPage = false) => {
  return {
    type: AT.WB_OPEN_SUBMIT_OFFER,
    payload: { row, isSecondPage }
  }
}
export const closePopup = () => {
  return {
    type: AT.WB_CLOSE_POPUP
  }
}

export const submitOffer = myOffer => {
  return {
    type: AT.WB_SUBMIT_OFFER,
    payload: api.submitOffer(myOffer)
  }
}

export function purchaseRequestedItem(id) {
  return async dispatch => {
    await dispatch({
      type: AT.WB_PURCHASE_REQUESTED_ITEM,
      async payload() {
        const data = await api.purchaseRequestedItem(id)
        dispatch({
          // To display in CART
          type: CART_FETCH_FULFILLED,
          payload: data
        })
        return data
      }
    })
  }
}

export const rejectRequestedItem = id => ({
  type: AT.WB_REJECT_REQUESTED_ITEM,
  async payload() {
    const { data } = await api.rejectRequestedItem(id)
    return data
  }
})

export const getAutocompleteData = ({ searchUrl }) => ({
  type: AT.WB_GET_AUTOCOMPLETE_DATA,
  payload: api.getAutocompleteData(searchUrl)
})

export const getPackagingTypes = () => ({
  type: AT.WB_GET_PACKAGING_TYPES,
  payload: api.getPackagingTypes()
})

export const getProductConditions = () => ({
  type: AT.WB_GET_CONDITIONS,
  payload: api.getProductConditions()
})

export const getProductForms = () => ({
  type: AT.WB_GET_FORMS,
  payload: api.getProductForms()
})

export const getProductGrades = () => ({
  type: AT.WB_GET_GRADES,
  payload: api.getProductGrades()
})

export const getUnits = () => ({
  type: AT.WB_GET_UNITS,
  payload: api.getUnits()
})

export const getWarehouses = () => ({
  type: AT.WB_GET_WAREHOUSES,
  payload: api.getWarehouses()
})

export const searchManufacturers = (text, limit = 10) => ({
  type: AT.WB_SEARCH_MANUFACTURERS,
  payload: api.searchManufacturers(text, limit)
})

export const searchCasNumber = (text, limit = 10) => ({
  type: AT.WB_SEARCH_CAS_NUMBER,
  payload: api.searchCasNumber(text, limit)
})

export const componentSearchProduct = (text) => ({
  type: AT.WB_COMPONENT_SEARCH_PRODUCT,
  payload: api.getAutocompleteData(`/prodex/api/product-groups/search?pattern=${encodeURIComponent(text)}`)
})

export const componentSearchCas = (text, limit = 5) => ({
  type: AT.WB_COMPONENT_SEARCH_CAS,
  payload: api.searchCasNumber(text, limit)
})

export const getProvinces = id => ({
  type: AT.WB_GET_PROVINCES,
  payload: api.getProvinces(id)
})

export const addPurchaseRequest = body => ({
  type: AT.WB_ADD_PURCHASE_REQUEST,
  payload: api.addPurchaseRequest(body)
})

export const editPurchaseRequest = (id, body) => ({
  type: AT.WB_EDIT_PURCHASE_REQUEST,
  payload: api.editPurchaseRequest(id, body)
})

export function handleFiltersValue(value) {
  return async dispatch => {
    dispatch({
      type: AT.WB_HANDLE_FILTERS_VALUE,
      payload: value
    })
  }
}

export const editMyPurchaseOffer = (id, body) => ({
  type: AT.WB_EDIT_MY_PURCHASE_OFFER,
  payload: api.editMyPurchaseOffer(id, body)
})

export const updateEditedId = id => ({
  type: AT.WB_UPDATE_EDITED_ID,
  payload: id
})

export function handleVariableSave(variable, value) {
  return {
    type: AT.WB_HANDLE_VARIABLE_CHANGE,
    payload: { variable, value }
  }
}

export const acceptRequestedItem = id => ({
  type: AT.WB_ACCEPT_REQUESTED_ITEM,
  payload: api.acceptRequestedItem(id)
})

export const counterRequestedItem = (id, body) => ({
  type: AT.WB_COUNTER_REQUESTED_ITEM,
  payload: api.counterRequestedItem(id, body)
})

export const falseIsSecondPage = () => ({
  type: AT.WB_FALSE_SECOND_PAGE
})

export const matchingProductOfferInfo = (id, productOfferId) => ({
  type: AT.WB_MATCHING_PRODUCT_OFFER_INFO,
  payload: api.matchingProductOfferInfo(id, productOfferId)
})

export function applyDatagridFilter(filter, reload = true) {
  return {
    type: AT.WB_APPLY_DATAGRID_FILTER,
    payload: { filter, reload }
  }
}
