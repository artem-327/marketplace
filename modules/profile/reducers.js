import * as AT from './action-types'

export const initialState = {
  usersMe: null,
  currency: null,
  loading: false,
  profilePopup: false,
  changePasswordPopup: false
}

export default function reducer(state = initialState, action) {
  const {payload} = action

  switch (action.type) {
    case AT.PROFILE_OPEN_POPUP: {
      return {
        ...state,
        profilePopup: true
      }
    }

    case AT.PROFILE_CLOSE_POPUP: {
      return {
        ...state,
        profilePopup: false
      }
    }

    case AT.PROFILE_CHANGE_PASSWORD_PENDING:
    case AT.PROFILE_GET_CURRENCIES_PENDING:
    case AT.PROFILE_GET_USERS_ME_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.PROFILE_GET_CURRENCIES_REJECTED:
    case AT.PROFILE_GET_USERS_ME_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.PROFILE_OPEN_CHANGE_PASSWORD: {
      return {
        ...state,
        changePasswordPopup: true
      }
    }

    case AT.PROFILE_CHANGE_PASSWORD: // ! ! smazat
    case AT.PROFILE_CHANGE_PASSWORD_FULFILLED:
    case AT.PROFILE_CLOSE_CHANGE_PASSWORD: {
      return {
        ...state,
        changePasswordPopup: false,
        loading: false
      }
    }

    case AT.PROFILE_GET_USERS_ME_FULFILLED: {
      return {
        ...state,
        usersMe: payload,
        loading: false
      }
    }

    case AT.PROFILE_GET_CURRENCIES_FULFILLED: {
      return {
        ...state,
        currency: payload,
        loading: false
      }
    }

    case AT.PROFILE_UPDATE_MY_PROFILE_FULFILLED: {
      return {
        ...state,
        profilePopup: false
      }
    }

    default: {
      return state
    }
  }
}
