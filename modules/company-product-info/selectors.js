import { createSelector } from 'reselect'

const getIsOpen = state => state?.companyProductInfo?.isOpen

export const makeGetIsOpen = () => createSelector([getIsOpen], isOpen => isOpen)
