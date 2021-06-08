import { createAction, createAsyncAction } from 'redux-promise-middleware-actions'
import api from './api'

export const getCountries = createAsyncAction('GLOBAL_GET_COUNTRIES', () => api.getCountries())