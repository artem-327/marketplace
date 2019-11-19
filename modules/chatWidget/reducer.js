import * as AT from './action-types'
import { chatWidget_hide, chatWidget_show, chatWidget_isConnected } from './components/chatWidgetFunctions'

export const initialState = {
  supportChatEnabled: false
}

export default function reducer(state = initialState, action) {
  const { payload } = action

  switch (action.type) {
    case AT.SUPPORT_CHAT_TOGGLE: {
      if (chatWidget_isConnected && !state.supportChatEnabled) {
        chatWidget_show()
        return {
          ...state,
          supportChatEnabled: true
        }
      } else {
        chatWidget_hide()
        return {
          ...state,
          supportChatEnabled: false
        }
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
        supportChatEnabled: false
      }
    }

    case AT.SUPPORT_CHAT_CREATE: {
      return {
        ...state,
        supportChatEnabled: false
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
