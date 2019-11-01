import * as AT from "./action-types"
import { ChatWidget_create, chatWidget_hide, chatWidget_show, chatWidget_EndSession } from './components/chatWidgetFunctions'

export function chatWidgetCreate(identity) {
  //console.log('!!!!!! chatWidget actions SUPPORT_CHAT_CREATE', identity)
  ChatWidget_create(identity)
  return {
    type: AT.SUPPORT_CHAT_CREATE,
    payload: null
  }
}

export function chatWidgetTerminate() {
  //console.log('!!!!!! chatWidget actions SUPPORT_CHAT_TERMINATE')
  // odhlasit se nebo ne?
  // jak se pak prihlasit??
  //  - ve skutecnosti se neodhlasi -> na strane operatora vypada odhlaseny, ale operator ho muze znovu pripojit a poslat userovi zpravu.

  chatWidget_EndSession()
  chatWidget_hide()
  return {
    type: AT.SUPPORT_CHAT_TERMINATE,
    payload: null
  }
}

export function chatWidgetToggle() {
  //console.log('!!!!!! chatWidget actions SUPPORT_CHAT_TOGGLE')
  return {
    type: AT.SUPPORT_CHAT_TOGGLE,
    payload: null
  }
}

export function chatWidgetShow() {
  //console.log('!!!!!! chatWidget actions SUPPORT_CHAT_SHOW')
  chatWidget_show()
  return {
    type: AT.SUPPORT_CHAT_SHOW,
    payload: null
  }
}

export function chatWidgetHide() {
  //console.log('!!!!!! chatWidget actions SUPPORT_CHAT_HIDE')
  chatWidget_hide()
  return {
    type: AT.SUPPORT_CHAT_HIDE,
    payload: null
  }
}

export function chatUnreadMessages(cnt) {
  //console.log('!!!!!! chatWidget actions ', cnt)
  return {
      type: AT.SUPPORT_CHAT_UNREAD_MESSAGES,
      payload: cnt
  }
}
