import { createSelector } from 'reselect'

const getStateVellociRegister = state => ({ ...state?.vellociRegister })
const getInitialValues = initialValues => ({ ...initialValues })
const getNaicsCodes = state => ({ ...state?.vellociRegister?.naicsCodes })
const getNaicsCodesloading = state => state?.vellociRegister?.naicsCodes?.loading || state?.auth?.loading

export const makeGetStateVellociRegister = () =>
  createSelector([getStateVellociRegister], vellociRegister => vellociRegister)
export const makeGetInitialValues = () => createSelector([getInitialValues], initialValues => initialValues)
export const makeGetNaicsCodes = () => createSelector([getNaicsCodes], naicsCodes => naicsCodes)
export const makeGetNaicsCodesloading = () => createSelector([getNaicsCodesloading], loading => loading)
