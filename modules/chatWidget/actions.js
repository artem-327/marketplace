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

export function chatWidgetToggle() {
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
      payload: cnt
    })
    dispatch(chatWidgetShow())
  }
}


