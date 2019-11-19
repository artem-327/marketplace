import * as AT from './action-types'
import { getSafe } from '~/utils/functions'
import {
  ChatWidget_create,
  chatWidget_hide,
  chatWidget_show,
  chatWidget_EndSession,
  chatWidget_isChatting,
  chatWidget_isConnected
} from './components/chatWidgetFunctions'
import { generateToastMarkup } from '~/utils/functions'
import { FormattedMessage } from 'react-intl'
import React from 'react'

export function chatWidgetCreate(identity, props) {
  ChatWidget_create(identity, props)
  return {
    type: AT.SUPPORT_CHAT_CREATE,
    payload: null
  }
}

export function chatWidgetTerminate() {
  chatWidget_EndSession()
  chatWidget_hide()
  return {
    type: AT.SUPPORT_CHAT_TERMINATE,
    payload: null
  }
}

export function chatWidgetToggle(props) {
  if (!chatWidget_isConnected()) {
    // Try to connect again
    return async dispatch => {
      dispatch(
        await chatWidgetCreate(
          {
            name: getSafe(() => props.auth.identity.name, ''),
            email: getSafe(() => props.auth.identity.email, ''),
            lang: getSafe(() => props.auth.identity.preferredLanguage.languageAbbreviation, 'us')
          },
          props
        )
      )
      if (!chatWidget_isConnected()) {
        props.toastManager.add(
          generateToastMarkup(
            <FormattedMessage id='notifications.supportChatError.header' defaultMessage='Support chat error' />,
            <FormattedMessage
              id='notifications.supportChatError.content'
              defaultMessage='Support chat is not available'
            />
          ),
          { appearance: 'error' }
        )
      }
    }
  }
  return {
    type: AT.SUPPORT_CHAT_TOGGLE,
    payload: null
  }
}

export function chatWidgetShow() {
  chatWidget_show()
  return {
    type: AT.SUPPORT_CHAT_SHOW,
    payload: null
  }
}

export function chatWidgetHide() {
  chatWidget_hide()
  return {
    type: AT.SUPPORT_CHAT_HIDE,
    payload: null
  }
}

export function chatUnreadMessages(cnt) {
  return async dispatch => {
    dispatch({
      type: AT.SUPPORT_CHAT_UNREAD_MESSAGES,
      payload: 0 // cnt
    })
    dispatch(chatWidgetShow())
  }
}
