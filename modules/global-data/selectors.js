import { createSelector } from 'reselect'

// Services
const getCountries = state => state.globalData.countries
const getCountriesDropdown = state => state.globalData.countriesDropdown
const getCountriesLoading = state => state.globalData.countriesLoading

const getProductConditions = state => state.globalData.productConditions
const getProductConditionsDropdown = state => state.globalData.productConditionsDropdown
const getProductConditionsLoading = state => state.globalData.productConditionsLoading

const getProductForms = state => state.globalData.productForms
const getProductFormsDropdown = state => state.globalData.productFormsDropdown
const getProductFormsLoading = state => state.globalData.productFormsLoading

const getProductGrades = state => state.globalData.productGrades
const getProductGradesDropdown = state => state.globalData.productGradesDropdown
const getProductGradesLoading = state => state.globalData.productGradesLoading

const getPackagingTypes = state => state.globalData.packagingTypes
const getPackagingTypesDropdown = state => state.globalData.packagingTypesDropdown
const getPackagingTypesUnique = state => state.globalData.packagingTypesUnique
const getPackagingTypesUniqueDropdown = state => state.globalData.packagingTypesUniqueDropdown
const getPackagingTypesLoading = state => state.globalData.packagingTypesLoading

const getDocumentTypes = state => state.globalData.documentTypes
const getDocumentTypesDropdown = state => state.globalData.documentTypesDropdown
const getDocumentTypesFederalOwnershipCertifications = state => state.globalData.documentTypesFederalOwnershipCertifications
const getDocumentTypesManagementCertifications = state => state.globalData.documentTypesManagementCertifications
const getDocumentTypesLoading = state => state.globalData.documentTypesLoading

const getCompanyUserRoles = state => state.globalData.companyUserRoles
const getCompanyUserRolesLoading = state => state.globalData.companyUserRolesLoading

const getUserRoles = state => state.globalData.companyUserRoles
const getUserRolesLoading = state => state.globalData.userRolesLoading

const getAdminRoles = state => state.globalData.adminRoles.map(d => d.id)
const getAdminRolesLoading = state => state.globalData.adminRolesLoading

const getHazardClasses = state => state.globalData.hazardClasses
const getHazardClassesDropdown = state => state.globalData.hazardClassesDropdown
const getHazardClassesLoading = state => state.globalData.hazardClassesLoading

const getPackagingGroups = state => state.globalData.packagingGroups
const getPackagingGroupsDropdown = state => state.globalData.packagingGroupsDropdown
const getPackagingGroupsLoading = state => state.globalData.packagingGroupsLoading

const getUnits = state => state.globalData.units
const getUnitsDropdown = state => state.globalData.unitsDropdown
const getUnitsLoading = state => state.globalData.unitsLoading
const getWeightUnits = state => state.globalData.weightUnits
const getUnitsFiltered = state => state.globalData.unitsFiltered
const getUnitsFilteredDropdown = state => state.globalData.unitsFilteredDropdown

const getMeasureTypes = state => state.globalData.measureTypes
const getMeasureTypesDropdown = state => state.globalData.measureTypesDropdown
const getMeasureTypesLoading = state => state.globalData.measureTypesLoading

const getLanguages = state => state.globalData.languages
const getLanguagesDropdown = state => state.globalData.languagesDropdown
const getLanguagesLoading = state => state.globalData.languagesLoading

const getFreightClassesDropdown = state => state.globalData.freightClassesDropdown

export const makeGetCountries = () => createSelector([getCountries], data => data)
export const makeGetCountriesDropdown = () => createSelector([getCountriesDropdown], data => data)
export const makeGetCountriesLoading = () => createSelector([getCountriesLoading], data => data)

export const makeGetProductConditions = () => createSelector([getProductConditions], data => data)
export const makeGetProductConditionsDropdown = () => createSelector([getProductConditionsDropdown], data => data)
export const makeGetProductConditionsLoading = () => createSelector([getProductConditionsLoading], data => data)

export const makeGetProductForms = () => createSelector([getProductForms], data => data)
export const makeGetProductFormsDropdown = () => createSelector([getProductFormsDropdown], data => data)
export const makeGetProductFormsLoading = () => createSelector([getProductFormsLoading], data => data)

export const makeGetProductGrades = () => createSelector([getProductGrades], data => data)
export const makeGetProductGradesDropdown = () => createSelector([getProductGradesDropdown], data => data)
export const makeGetProductGradesLoading = () => createSelector([getProductGradesLoading], data => data)

export const makeGetPackagingTypes = () => createSelector([getPackagingTypes], data => data)
export const makeGetPackagingTypesDropdown = () => createSelector([getPackagingTypesDropdown], data => data)
export const makeGetPackagingTypesUnique = () => createSelector([getPackagingTypesUnique], data => data)
export const makeGetPackagingTypesUniqueDropdown = () => createSelector([getPackagingTypesUniqueDropdown], data => data)
export const makeGetPackagingTypesLoading = () => createSelector([getPackagingTypesLoading], data => data)

export const makeGetDocumentTypes = () => createSelector([getDocumentTypes], data => data)
export const makeGetDocumentTypesDropdown = () => createSelector([getDocumentTypesDropdown], data => data)
export const makeGetDocumentTypesFederalOwnershipCertifications = () => createSelector([getDocumentTypesFederalOwnershipCertifications], data => data)
export const makeGetDocumentTypesManagementCertifications = () => createSelector([getDocumentTypesManagementCertifications], data => data)
export const makeGetDocumentTypesLoading = () => createSelector([getDocumentTypesLoading], data => data)

export const makeGetCompanyUserRoles = () => createSelector([getCompanyUserRoles], data => data)
export const makeGetCompanyUserRolesLoading = () => createSelector([getCompanyUserRolesLoading], data => data)

export const makeGetUserRoles = () => createSelector([getUserRoles], data => data)
export const makeGetUserRolesLoading = () => createSelector([getUserRolesLoading], data => data)

export const makeGetAdminRoles = () => createSelector([getAdminRoles], data => data)
export const makeGetAdminRolesLoading = () => createSelector([getAdminRolesLoading], data => data)

export const makeGetHazardClasses = () => createSelector([getHazardClasses], data => data)
export const makeGetHazardClassesDropdown = () => createSelector([getHazardClassesDropdown], data => data)
export const makeGetHazardClassesLoading = () => createSelector([getHazardClassesLoading], data => data)

export const makeGetPackagingGroups = () => createSelector([getPackagingGroups], data => data)
export const makeGetPackagingGroupsDropdown = () => createSelector([getPackagingGroupsDropdown], data => data)
export const makeGetPackagingGroupsLoading = () => createSelector([getPackagingGroupsLoading], data => data)

export const makeGetUnits = () => createSelector([getUnits], data => data)
export const makeGetUnitsDropdown = () => createSelector([getUnitsDropdown], data => data)
export const makeGetUnitsLoading = () => createSelector([getUnitsLoading], data => data)
export const makeGetWeightUnits = () => createSelector([getWeightUnits], data => data)
export const makeGetUnitsFiltered = () => createSelector([getUnitsFiltered], data => data)
export const makeGetUnitsFilteredDropdown = () => createSelector([getUnitsFilteredDropdown], data => data)

export const makeGetMeasureTypes = () => createSelector([getMeasureTypes], data => data)
export const makeGetMeasureTypesDropdown = () => createSelector([getMeasureTypesDropdown], data => data)
export const makeGetMeasureTypesLoading = () => createSelector([getMeasureTypesLoading], data => data)

export const makeGetLanguages = () => createSelector([getLanguages], data => data)
export const makeGetLanguagesDropdown = () => createSelector([getLanguagesDropdown], data => data)
export const makeGetLanguagesLoading = () => createSelector([getLanguagesLoading], data => data)

export const makeGetFreightClassesDropdown = () => createSelector([getFreightClassesDropdown], data => data)





