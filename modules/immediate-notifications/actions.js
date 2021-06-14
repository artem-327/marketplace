import { createAction, createAsyncAction } from 'redux-promise-middleware-actions'
import api from './api'

export const getNextImmediate = createAsyncAction('ALERTS_GET_NEXT_IMMEDIATE', () => api.getNextImmediate())
export const sendMessageToSupport = createAsyncAction('ALERTS_SEND_MESSAGE_TO_SUPPORT', (message, sendAsEmail=true, sendAsNotification=false) => api.sendMessageToSupport(message, sendAsEmail, sendAsNotification))
