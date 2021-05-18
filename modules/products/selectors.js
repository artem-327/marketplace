import { createSelector } from 'reselect'
//Services
import { getSafe } from '../../utils/functions'

const getAuth = state => state?.auth
const getIsOpenImportPopup = state => state?.settings?.isOpenImportPopup
const getCurrentEdit2Form = state => state?.productsAdmin?.currentEdit2Form
const getCurrentEditForm = state => state?.productsAdmin?.currentEditForm
const getCurrentAddForm = state => state?.productsAdmin?.currentAddForm
const getTableHandlersFilters = state => state?.productsAdmin?.tableHandlersFilters
const getSearchedCompanies = state => state?.productsAdmin?.searchedCompanies.map(d => ({
    key: d.id,
    value: d.id,
    text: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, '')
  }))
const getSearchedCompaniesByName = state => state?.productsAdmin?.searchedCompanies.map(d => ({
    key: d.id,
    value: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, ''),
    text: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, '')
  }))
const getSearchedCompaniesLoading = state => state?.productsAdmin?.searchedCompaniesLoading
const getCompanyProductUnmappedOnly = state => state?.productsAdmin?.companyProductUnmappedOnly
const getFilterValue = state => state?.productsAdmin?.filterValue
const getEditedId = state => state?.productsAdmin?.editedId
const getLoading = state => state?.productsAdmin?.loading
const getRowId = state => getSafe(() => state?.productsAdmin?.popupValues?.id)
const getPopupValues = state => getSafe(() => state?.productsAdmin?.popupValues, '')
const getSearchedTagsLoading = state => state?.productsAdmin?.searchedTagsLoading
const getSearchedTags = state => getSafe(() => state?.productsAdmin?.searchedTags?.length, false)
  ? state?.productsAdmin?.searchedTags.map(d => ({
      key: d.id,
      text: d.name,
      value: d.id
      }))
  : []

export const makeGetAuth = () => {
  return createSelector([getAuth], auth => auth)
}
export const makeGetIsOpenImportPopup = () => {
  return createSelector([getIsOpenImportPopup], isOpenImportPopup => isOpenImportPopup)
}
export const makeGetCurrentEdit2Form = () => {
  return createSelector([getCurrentEdit2Form], currentEdit2Form => currentEdit2Form)
}
export const makeGetCurrentEditForm = () => {
  return createSelector([getCurrentEditForm], currentEditForm => currentEditForm)
}
export const makeGetCurrentAddForm = () => {
  return createSelector([getCurrentAddForm], currentAddForm => currentAddForm)
}
export const makeGetTableHandlersFilters = () => {
  return createSelector([getTableHandlersFilters], tableHandlersFilters => tableHandlersFilters)
}
export const makeGetSearchedCompanies = () => {
  return createSelector([getSearchedCompanies], searchedCompanies => searchedCompanies)
}
export const makeGetSearchedCompaniesByName = () => {
  return createSelector([getSearchedCompaniesByName], searchedCompaniesByName => searchedCompaniesByName)
}
export const makeGetSearchedCompaniesLoading = () => {
  return createSelector([getSearchedCompaniesLoading], searchedCompaniesLoading => searchedCompaniesLoading)
}
export const makeGetCompanyProductUnmappedOnly = () => {
  return createSelector([getCompanyProductUnmappedOnly], companyProductUnmappedOnly => companyProductUnmappedOnly)
}
export const makeGetFilterValue = () => {
  return createSelector([getFilterValue], filterValue => filterValue)
}
export const makeGetEditedId = () => {
  return createSelector([getEditedId], editedId => editedId)
}
export const makeGetLoading = () => {
  return createSelector([getLoading], loading => loading)
}
export const makeGetRowId = () => {
  return createSelector([getRowId], rowId => rowId)
}
export const makeGetPopupValues = () => {
  return createSelector([getPopupValues], popupValues => popupValues)
}
export const makeGetSearchedTagsLoading = () => {
  return createSelector([getSearchedTagsLoading], searchedTagsLoading => searchedTagsLoading)
}
export const makeGetSearchedTags = () => {
  return createSelector([getSearchedTags], searchedTags => searchedTags)
}
