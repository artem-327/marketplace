import * as AT from './action-types'

export const initialState = {
  supportChatEnabled: false,
  initialized: false
}

export default function reducer(state = initialState, action) {
  const { payload } = action

  switch (action.type) {
    case AT.SUPPORT_CHAT_TOGGLE: {
      return {
        ...state,
        supportChatEnabled: !state.supportChatEnabled
      }
    }

    case AT.SUPPORT_CHAT_SHOW: {
      return {
        ...state,
        supportChatEnabled: true
      }
    }

    case AT.SUPPORT_CHAT_HIDE: {
      return {
        ...state,
        supportChatEnabled: false
      }
    }

    case AT.SUPPORT_CHAT_TERMINATE: {
      return {
        ...state,
        supportChatEnabled: false,
        initialized: false
      }
    }

    case AT.SUPPORT_CHAT_CREATE: {
      return {
        ...state,
        supportChatEnabled: false,
        initialized: true
      }
    }

    case AT.SUPPORT_CHAT_UNREAD_MESSAGES: {
      return {
        ...state,
        supportChatEnabled: false
      }
    }

    default: {
      return state
    }
  }
}
