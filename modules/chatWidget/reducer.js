import * as AT from './action-types'
import { chatWidget_hide, chatWidget_show } from './components/chatWidgetFunctions'

export const initialState = {
  supportChatEnabled: false,
}


export default function reducer(state = initialState, action) {
  const {payload} = action

  switch (action.type) {

    case AT.SUPPORT_CHAT_TOGGLE: {
      //console.log('!!!!!! chatWidget reducer SUPPORT_CHAT_TOGGLE')
      state.supportChatEnabled ? chatWidget_hide() : chatWidget_show()
      return {
        ...state,
        supportChatEnabled: !state.supportChatEnabled
      }
    }

    case AT.SUPPORT_CHAT_SHOW: {
      //console.log('!!!!!! chatWidget reducer SUPPORT_CHAT_SHOW')
      return {
        ...state,
        supportChatEnabled: true
      }
    }

    case AT.SUPPORT_CHAT_HIDE: {
      //console.log('!!!!!! chatWidget reducer SUPPORT_CHAT_HIDE')
      return {
        ...state,
        supportChatEnabled: false
      }
    }

    case AT.SUPPORT_CHAT_TERMINATE: {
      //console.log('!!!!!! chatWidget reducer SUPPORT_CHAT_TERMINATE')
      return {
        ...state,
        supportChatEnabled: false
      }
    }

    case AT.SUPPORT_CHAT_CREATE: {
      //console.log('!!!!!! chatWidget reducer SUPPORT_CHAT_CREATE')
      return {
        ...state,
        supportChatEnabled: false
      }
    }

    case AT.SUPPORT_CHAT_UNREAD_MESSAGES: {
      //console.log('!!!!!! chatWidget reducer SUPPORT_CHAT_UNREAD_MESSAGES', payload)
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