import { createAsyncAction } from 'redux-promise-middleware-actions'
import api from './api'
/**
 * @param {string} eventName
 * @param {object} metadata
 * @param {string} magicToken
 * @apiType POST
 * @apiPath payments/bank-accounts/velloci/add/log/magic-token
 */
export const onEventVelloci = createAsyncAction('ON_EVENT_VELLOCI', (eventName, metadata, magicToken) => api.onEventVelloci(eventName, metadata, magicToken))
/**
 * @param {string} magicToken
 * @apiType GET
 * @apiPath payments/bank-accounts/velloci/add/token/magic-token
 */
export const getVellociToken = createAsyncAction('GET_VELLOCI_TOKEN', magicToken => api.getVellociToken(magicToken))
/**
 * @param {string} magicToken
 * @apiType GET
 * @apiPath /users/me/magic-token
 */
export const getVellociBusinessId = createAsyncAction('GET_VELLOCI_BUSINESS_ID', magicToken => api.getVellociBusinessId(magicToken))
/**
 * @param {string} magicToken
 * @param {object} metadata
 * @apiType POST
 * @apiPath payments/bank-accounts/velloci/add/magic-token
 */
export const addVellociAcount = createAsyncAction('ADD_VELLOCI_ACOUNT', (magicToken, metadata) => api.addVellociAcount(magicToken, metadata))
