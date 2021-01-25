import * as AT from './action-types'
import api from './api'
/**
 * @param {string} eventName
 * @param {object} metadata
 * @apiType POST
 * @apiPath payments/bank-accounts/velloci/add/log/magic-token
 */
export function onEventVelloci(eventName, metadata) {
  return {
    type: AT.ON_EVENT_VELLOCI,
    payload: api.onEventVelloci(eventName, metadata)
  }
}
/**
 * @param {string} magicToken
 * @apiType GET
 * @apiPath payments/bank-accounts/velloci/add/token/magic-token
 */
export function getVellociToken(magicToken) {
  return {
    type: AT.GET_VELLOCI_TOKEN,
    payload: api.getVellociToken(magicToken)
  }
}
/**
 * @param {string} publicToken
 * @param {object} metadata
 * @apiType POST
 * @apiPath payments/bank-accounts/velloci/add/magic-token
 */
export function addVellociAcount(publicToken, metadata) {
  return {
    type: AT.ADD_VELLOCI_ACOUNT,
    payload: api.addVellociAcount(publicToken, metadata)
  }
}
