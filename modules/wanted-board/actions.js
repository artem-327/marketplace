import * as AT from './action-types'
import api from './api'

export const openSubmitOffer = (row, isSecondPage = false) => {
  return {
    type: AT.WB_OPEN_SUBMIT_OFFER,
    payload: { row, isSecondPage }
  }
}

export const openInfoModal = (row, isSecondPage = false) => {
  return {
    type: AT.WB_OPEN_INFO_MODAL,
    payload: { row, isSecondPage }
  }
}

export const closeInfoModal = (row, isSecondPage = false) => {
  return {
    type: AT.WB_CLOSE_INFO_MODAL,
  }
}

export const openRespondModal = (row, isSecondPage = false) => {
  return {
    type: AT.WB_OPEN_RESPOND_MODAL,
    payload: { row, isSecondPage }
  }
}

export const closeRespondModal = (row, isSecondPage = false) => {
  return {
    type: AT.WB_CLOSE_RESPOND_MODAL
  }
}

export const openAddEditModal = (row, isSecondPage = false) => {
  return {
    type: AT.WB_ADD_EDIT_MODAL,
    payload: { row }
  }
}

export const closeAddEditPopup = () => {
  return {
    type: AT.WB_CLOSE_ADD_EDIT_MODAL,
  }
}

export const openDeleteModal = (row, isSecondPage = false) => {
  return {
    type: AT.WB_DELETE_MODAL,
    payload: { row }
  }
}

export const closeDeleteModal = () => {
  return {
    type: AT.WB_CLOSE_DELETE_MODAL,
  }
}

export const openSeeListingModal = (row, isSecondPage = false) => {
  return {
    type: AT.WB_SEE_LISTING_MODAL,
    payload: { row }
  }
}

export const closeSeeListingModal = () => {
  return {
    type: AT.WB_CLOSE_SEE_LISTING_MODAL,
  }
}

export const postNewWantedBoard = (values) => {
  return {
    type: AT.WB_POST_NEW,
    payload: api.postNewWantedBoardApi(values)
  }
}

export const updateWantedBoard = (id, values) => {
  return {
    type: AT.WB_UPDATE,
    payload: api.updateWantedBoardApi(id, values)
  }
}

export const deleteWantedBoard = (id) => {
  return {
    type: AT.WB_DELETE,
    payload: api.deleteWantedBoardApi(id)
  }
}

export const handleVariableSave = (variable, value) => {
  return {
    type: AT.WB_HANDLE_VARIABLE_CHANGE,
    payload: { variable, value }
  }
}

export const postNewWantedBoardBids = (values) => {
  return {
    type: AT.WB_POST_NEW,
    payload: api.postNewWantedBoardBidsApi(values)
  }
}

export const deleteWantedBoardBids = (id) => {
  return {
    type: AT.WB_DELETE,
    payload: api.deleteWantedBoardBidsApi(id)
  }
}