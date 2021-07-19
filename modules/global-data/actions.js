import { createAsyncAction } from 'redux-promise-middleware-actions'
import api from './api'

export const getCountries = createAsyncAction('GLOBAL_GET_COUNTRIES', () => api.getCountries())
export const getProductConditions = createAsyncAction('GLOBAL_GET_PRODUCT_CONDITIONS', () => api.getProductConditions())
export const getProductForms = createAsyncAction('GLOBAL_GET_PRODUCT_FORMS', () => api.getProductForms())
export const getProductGrades = createAsyncAction('GLOBAL_GET_PRODUCT_GRADES', () => api.getProductGrades())
export const getPackagingTypes = createAsyncAction('GLOBAL_GET_PACKAGING_TYPES', () => api.getPackagingTypes())
export const getDocumentTypes = createAsyncAction('GLOBAL_GET_DOCUMENT_TYPES', () => api.getDocumentTypes())
export const getCompanyUserRoles = createAsyncAction('GLOBAL_GET_COMPANY_USER_ROLES', () => api.getCompanyUserRoles())
export const getUserRoles = createAsyncAction('GLOBAL_GET_USER_ROLES', () => api.getUserRoles())
export const getAdminRoles = createAsyncAction('GLOBAL_GET_ADMIN_ROLES', () => api.getAdminRoles())
export const getHazardClasses = createAsyncAction('GLOBAL_GET_HAZARD_CLASSES', () => api.getHazardClasses())
export const getPackagingGroups = createAsyncAction('GLOBAL_GET_PACKAGING_GROUPS', () => api.getPackagingGroups())
export const getUnits = createAsyncAction('GLOBAL_GET_UNITS', () => api.getUnits())
export const getMeasureTypes = createAsyncAction('GLOBAL_GET_MEASURE_TYPES', () => api.getMeasureTypes())
export const getLanguages = createAsyncAction('GLOBAL_GET_LANGUAGES', () => api.getLanguages())