import { createAction, createAsyncAction } from 'redux-promise-middleware-actions'
import api from './api'

export const getCountries = createAsyncAction('GLOBAL_GET_COUNTRIES', () => api.getCountries())
export const getProductConditions = createAsyncAction('GLOBAL_GET_PRODUCT_CONDITIONS', () => api.getProductConditions())
export const getProductForms = createAsyncAction('GLOBAL_GET_PRODUCT_FORMS', () => api.getProductForms())
export const getProductGrades = createAsyncAction('GLOBAL_GET_PRODUCT_GRADES', () => api.getProductGrades())
export const getPackagingTypes = createAsyncAction('GLOBAL_GET_PACKAGING_TYPES', () => api.getPackagingTypes())
export const getDocumentTypes = createAsyncAction('GLOBAL_GET_DOCUMENT_TYPES', () => api.getDocumentTypes())