import { createSelector } from 'reselect'
//Services
import { getSafe } from '../../utils/functions'
import { getCompaniesDropdown } from './listings/components/Listings.services'

const getSearchedCompaniesDropdown = store => store?.marketplace?.searchedCompanies
const getSelectedSellerOption = store => store?.marketplace?.selectedSellerOption
const getPopupValues = store => store?.marketplace?.popupValues
const getUpdating = store => getSafe(() => store.marketplace.updating, false)
const getProductName = store => getSafe(() => store.marketplace.popupValues.companyProduct.intProductName, '')
const getListFobPriceUnit = store => getSafe(() => store.marketplace.popupValues.companyProduct.packagingUnit.nameAbbreviation, '')
const getPackagingType = store => getSafe(() => store.marketplace.popupValues.companyProduct.packagingType.name, '')
const getPackagingUnit = store => getSafe(() => store.marketplace.popupValues.companyProduct.packagingUnit.nameAbbreviation, '')
const getPackagingSize = store => getSafe(() => store.marketplace.popupValues.companyProduct.packagingSize, 1)
const getIsAdmin = store => getSafe(() => store.auth.identity.isAdmin, false)
const getIsProductOfferManager = store => getSafe(() => store.auth.identity.isProductOfferManager, false)
const getIsSending = store => getSafe(() => store.marketplace.isSending, false)
const getLoading = store => getSafe(() => store.marketplace.loading, false)
const getCurrentUserId = store => getSafe(() => store.auth.identity.id, '')
const getTypeHolds = store => getSafe(() => store.marketplace.typeHolds, 'my')

export const makeGetSearchedCompaniesDropdown = () => {
  return createSelector([getSearchedCompaniesDropdown], searchedCompanies => getCompaniesDropdown(searchedCompanies))
}
export const makeGetSelectedSellerOption = () => {
  return createSelector([getSelectedSellerOption], selectedSellerOption => selectedSellerOption)
}
export const makeGetPopupValues = () => {
  return createSelector([getPopupValues], popupValues => popupValues)
}
export const makeGetUpdating = () => {
  return createSelector([getUpdating], updating => updating)
}
export const makeGetProductName = () => {
  return createSelector([getProductName], productName => productName)
}
export const makeGetListFobPriceUnit = () => {
  return createSelector([getListFobPriceUnit], priceUnit => priceUnit ? `/ ${priceUnit}` : '')
}
export const makeGetPackagingType = () => {
  return createSelector([getPackagingType], packagingType => packagingType)
}
export const makeGetPackagingUnit = () => {
  return createSelector([getPackagingUnit], packagingUnit => packagingUnit)
}
export const makeGetPackagingSize = () => {
  return createSelector([getPackagingSize], packagingSize => packagingSize)
}
export const makeGetIsAdmin = () => {
  return createSelector([getIsAdmin], isAdmin => isAdmin)
}
export const makeGetIsProductOfferManager = () => {
  return createSelector([getIsProductOfferManager], isProductOfferManager => isProductOfferManager)
}
export const makeGetIsSending = () => {
  return createSelector([getIsSending], isSending => isSending)
}
export const makeGetLoading = () => {
  return createSelector([getLoading], loading => loading)
}
export const makeGetCurrentUserId = () => {
  return createSelector([getCurrentUserId], currentUserId => currentUserId)
}
export const makeGetTypeHolds = () => {
  return createSelector([getTypeHolds], typeHolds => typeHolds)
}