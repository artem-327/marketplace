import { createAction, createAsyncAction } from 'redux-promise-middleware-actions'
import api from './api'

export const getNextImmediate = createAsyncAction('ALERTS_GET_NEXT_IMMEDIATE', () => api.getNextImmediate())
