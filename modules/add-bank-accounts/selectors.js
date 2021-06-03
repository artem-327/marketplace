import { createSelector } from 'reselect'
import Router from 'next/router'
//Services
import { getSafe } from '../../utils/functions'


const getVellociToken = state => getSafe(() => state.addBankAccounts.vellociToken, '')
const getVellociBusinessId = state => getSafe(() => state.addBankAccounts.vellociBusinessId, '')
const getMagicToken = () => getSafe(() => Router.router.query.token, '')
const getLoading = state => getSafe(() => state.addBankAccounts.loading, '')

export const makeGetVellociToken = () => createSelector([getVellociToken], vellociToken => vellociToken)
export const makeGetVellociBusinessId = () => createSelector([getVellociBusinessId], vellociBusinessId => vellociBusinessId)
export const makeGetMagicToken = () => createSelector([getMagicToken], magicToken => magicToken)
export const makeGetLoading = () => createSelector([getLoading], loading => loading)