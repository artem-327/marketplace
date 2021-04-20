import { createSelector } from 'reselect'

const getAppliedFilter = state => state?.filter?.marketplace?.appliedFilter

export const makeGetAppliedFilter = () => {
  return createSelector([getAppliedFilter], appliedFilter => appliedFilter)
}
