import * as AT from './action-types'
import * as api from './api'
import { Datagrid } from '~/modules/datagrid'


export const closeDetailSidebar = (id) => {
  return {
    type: AT.WB_CLOSE_DETAIL_SIDEBAR,
    payload: null
  }
}

export const sidebarDetailTrigger = (row = null, activeTab = '') => {
  console.log('!!!!!!!!!! sidebarDetailTrigger activeTab', activeTab)
  return {
    type: AT.WB_SIDEBAR_DETAIL_TRIGGER,
    payload: { activeTab: activeTab, row: row }
  }
}

export const deleteWantedBoardItem = (id) => {
  console.log('!!!!!!!!!! deleteWantedBoardItem id', id)
  return {
    type: AT.WB_DELETE_WANTED_BOARD_ITEM,
    payload: id
  }
}

export const deleteMyOfferItem = (id) => {
  console.log('!!!!!!!!!! deleteMyOfferItem id', id)
  return {
    type: AT.WB_DELETE_MY_OFFER_ITEM,
    payload: id
  }
}

export const SubmitOfferWantedBoard = (id) => {
  console.log('!!!!!!!!!! SubmitOfferWantedBoard id', id)
  return {
    type: AT.WB_SUBMIT_OFFER_WANTED_BOARD,
    payload: id
  }
}

export const purchaseRequestedItem = (id) => {
  console.log('!!!!!!!!!! purchaseRequestedItem id', id)
  return {
    type: AT.WB_PURCHASE_REQUESTED_ITEM,
    payload: id
  }
}

export const rejectRequestedItem = (id) => {
  console.log('!!!!!!!!!! rejectRequestedItem id', id)
  return {
    type: AT.WB_REJECT_REQUESTED_ITEM,
    payload: id
  }
}

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

export const getWarehouses = () => ({
  type: AT.WB_GET_WAREHOUSES,
  payload: api.getWarehouses()
})

export const searchManufacturers = (text, limit = 10) => ({
  type: AT.WB_SEARCH_MANUFACTURERS,
  payload: api.searchManufacturers(text, limit)
})

export const getCountries = () => ({
  type: AT.WB_GET_COUNTRIES,
  payload: api.getCountries()
})




