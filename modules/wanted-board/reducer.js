import * as AT from './action-types'

export const initialState = {
  openedSubmitOfferPopup: false,
  openedInfoModal: false,
  openedRespondModal: false,
  openedAddEditModal: false,
  openedDeleteModal: false,
  openedSeeListingModal: false,
  infoModalData: {},
  editID: 2,
  popupValues: null,
  updating: false,
  sending: false
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case AT.WB_OPEN_SUBMIT_OFFER: {
      return {
        ...state,
        openedSubmitOfferPopup: true,
      }
    }

    case AT.WB_OPEN_INFO_MODAL: {
      return {
        ...state,
        openedInfoModal: true,
        infoModalData: payload.row
      }
    }

    case AT.WB_CLOSE_INFO_MODAL: {
      return {
        ...state,
        openedInfoModal: false,
      }
    }

    case AT.WB_OPEN_RESPOND_MODAL: {
      return {
        ...state,
        openedRespondModal: true,
        editID: payload.row.id,
      }
    }

    case AT.WB_CLOSE_RESPOND_MODAL: {
      return {
        ...state,
        openedRespondModal: false,
      }
    }

    case AT.WB_CLOSE_POPUP: {
      return {
        ...state,
        openedSubmitOfferPopup: false,
      }
    }

    case AT.WB_ADD_EDIT_MODAL: {
      return {
        ...state,
        popupValues: payload.row,
        openedAddEditModal: true,
      }
    }

    case AT.WB_CLOSE_ADD_EDIT_MODAL: {
      return {
        ...state,
        popupValues: null,
        openedAddEditModal: false,
      }
    }

    case AT.WB_DELETE_MODAL: {
      return {
        ...state,
        openedDeleteModal: true,
      }
    }

    case AT.WB_CLOSE_DELETE_MODAL: {
      return {
        ...state,
        openedDeleteModal: false,
      }
    }

    case AT.WB_SEE_LISTING_MODAL: {
      return {
        ...state,
        openedSeeListingModal: true,
      }
    }

    case AT.WB_CLOSE_SEE_LISTING_MODAL: {
      return {
        ...state,
        openedSeeListingModal: false,
      }
    }

    case AT.WB_POST_NEW_PENDING: {
      return {
        ...state,
        sending: true,
      }
    }

    case AT.WB_POST_NEW_FULFILLED: {
      return {
        ...state,
        sending: false,
      }
    }

    case AT.WB_POST_NEW_REJECTED: {
      return {
        ...state,
        sending: false,
      }
    }

    case AT.WB_UPDATE_PENDING: {
      return {
        ...state,
        sending: true,
      }
    }

    case AT.WB_UPDATE_FULFILLED: {
      return {
        ...state,
        sending: false,
      }
    }

    case AT.WB_UPDATE_REJECTED: {
      return {
        ...state,
        sending: false,
      }
    }

    case AT.WB_DELETE_PENDING: {
      return {
        ...state,
        sending: true,
      }
    }

    case AT.WB_DELETE_FULFILLED: {
      return {
        ...state,
        sending: false,
      }
    }

    case AT.WB_DELETEE_REJECTED: {
      return {
        ...state,
        sending: false,
      }
    }

    default: {
      return state
    }
  }
}
