import typeToReducer from 'type-to-reducer'
import { uniqueArrayByKey } from '../../utils/functions'

import {
  getCountries,
  getProductConditions,
  getProductForms,
  getProductGrades,
  getPackagingTypes,
  getDocumentTypes,
  getCompanyUserRoles,
  getUserRoles,
  getAdminRoles,
  getHazardClasses,
  getPackagingGroups,
  getUnits,
  getMeasureTypes,
  getLanguages
} from './actions'

export const initialState = {
  countries: [],
  countriesDropdown: [],
  countriesLoading: false,

  productConditions: [],
  productConditionsDropdown: [],
  productConditionsLoading: false,

  productForms: [],
  productFormsDropdown: [],
  productFormsLoading: false,

  productGrades: [],
  productGradesDropdown: [],
  productGradesLoading: false,

  packagingTypes: [],
  packagingTypesDropdown: [],
  packagingTypesUnique: [],
  packagingTypesUniqueDropdown: [],
  packagingTypesLoading: false,

  documentTypes: [],
  documentTypesDropdown: [],
  documentTypesFederalOwnershipCertifications: [],
  documentTypesManagementCertifications: [],
  documentTypesLoading: false,

  companyUserRoles: [],
  companyUserRolesLoading: false,

  userRoles: [],
  userRolesLoading: false,

  adminRoles: [],
  adminRolesLoading: false,

  hazardClasses: [],
  hazardClassesDropdown: [],
  hazardClassesLoading: false,

  packagingGroups: [],
  packagingGroupsDropdown: [],
  packagingGroupsLoading: false,

  units: [],
  unitsDropdown: [],
  unitsLoading: false,
  weightUnits: [],

  measureTypes: [],
  measureTypesDropdown: [],
  measureTypesLoading: false,

  languages: [],
  languagesDropdown: [],
  languagesLoading: false,

  freightClassesDropdown:
    [50, 55, 60, 65, 70, 77.5, 85, 92.5, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500].map(fClass => {
      return {
        key: fClass,
        text: fClass,
        value: fClass
      }
    })
}

export default typeToReducer(
  {
    [getCountries.pending]: state => ({
      ...state,
      countriesLoading: true
    }),
    [getCountries.rejected]: state => ({
      ...state,
      countriesLoading: false
    }),
    [getCountries.fulfilled]: (state, { payload }) => ({
      ...state,
      countries: payload,
      countriesDropdown: payload.map(c => ({
        text: c.name,
        value: c.id,
        key: c.id
      })),
      countriesLoading: false
    }),

    [getProductConditions.pending]: state => ({
      ...state,
      productConditionsLoading: true
    }),
    [getProductConditions.rejected]: state => ({
      ...state,
      productConditionsLoading: false
    }),
    [getProductConditions.fulfilled]: (state, { payload }) => ({
      ...state,
      productConditions: payload,
      productConditionsDropdown: payload.map(c => ({
        text: c.name,
        value: c.id,
        key: c.id
      })),
      productConditionsLoading: false
    }),

    [getProductForms.pending]: state => ({
      ...state,
      productFormsLoading: true
    }),
    [getProductForms.rejected]: state => ({
      ...state,
      productFormsLoading: false
    }),
    [getProductForms.fulfilled]: (state, { payload }) => ({
      ...state,
      productForms: payload,
      productFormsDropdown: payload.map(c => ({
        text: c.name,
        value: c.id,
        key: c.id
      })),
      productFormsLoading: false
    }),

    [getProductGrades.pending]: state => ({
      ...state,
      productGradesLoading: true
    }),
    [getProductGrades.rejected]: state => ({
      ...state,
      productGradesLoading: false
    }),
    [getProductGrades.fulfilled]: (state, { payload }) => ({
      ...state,
      productGrades: payload,
      productGradesDropdown: payload.map(c => ({
        text: c.name,
        value: c.id,
        key: c.id
      })),
      productGradesLoading: false
    }),

    [getPackagingTypes.pending]: state => ({
      ...state,
      packagingTypesLoading: true
    }),
    [getPackagingTypes.rejected]: state => ({
      ...state,
      packagingTypesLoading: false
    }),
    [getPackagingTypes.fulfilled]: (state, { payload }) => ({
      ...state,
      packagingTypes: payload,
      packagingTypesUnique: uniqueArrayByKey(payload, 'name'),
      packagingTypesDropdown: payload.map(c => ({
        text: c.name,
        value: c.id,
        key: c.id
      })),
      packagingTypesUniqueDropdown: uniqueArrayByKey(payload, 'name').map(c => ({
        text: c.name,
        value: c.id,
        key: c.id
      })),
      packagingTypesLoading: false
    }),

    [getDocumentTypes.pending]: state => ({
      ...state,
      documentTypesLoading: true
    }),
    [getDocumentTypes.rejected]: state => ({
      ...state,
      documentTypesLoading: false
    }),
    [getDocumentTypes.fulfilled]: (state, { payload }) => ({
      ...state,
      documentTypes: payload,
      documentTypesDropdown: payload.map(c => ({
        text: c.name,
        value: c.id,
        key: c.id
      })),
      documentTypesFederalOwnershipCertifications: payload.filter(el => el.group && el.group.id === 6),
      documentTypesManagementCertifications: payload.filter(el => el.group && el.group.id === 7),
      documentTypesLoading: false
    }),

    [getCompanyUserRoles.pending]: state => ({
      ...state,
      companyUserRolesLoading: true
    }),
    [getCompanyUserRoles.rejected]: state => ({
      ...state,
      companyUserRolesLoading: false
    }),
    [getCompanyUserRoles.fulfilled]: (state, { payload }) => ({
      ...state,
      companyUserRoles: payload,
      companyUserRolesLoading: false
    }),

    [getUserRoles.pending]: state => ({
      ...state,
      userRolesLoading: true
    }),
    [getUserRoles.rejected]: state => ({
      ...state,
      userRolesLoading: false
    }),
    [getUserRoles.fulfilled]: (state, { payload }) => ({
      ...state,
      userRoles: payload,
      userRolesLoading: false
    }),

    [getAdminRoles.pending]: state => ({
      ...state,
      adminRolesLoading: true
    }),
    [getAdminRoles.rejected]: state => ({
      ...state,
      adminRolesLoading: false
    }),
    [getAdminRoles.fulfilled]: (state, { payload }) => ({
      ...state,
      adminRoles: payload,
      adminRolesLoading: false
    }),

    [getHazardClasses.pending]: state => ({
      ...state,
      hazardClassesLoading: true
    }),
    [getHazardClasses.rejected]: state => ({
      ...state,
      hazardClassesLoading: false
    }),
    [getHazardClasses.fulfilled]: (state, { payload }) => ({
      ...state,
      hazardClasses: payload,
      hazardClassesDropdown: payload.map((hClass, id) => {
        return {
          key: id,
          text: hClass.classCode + ': ' + hClass.description,
          value: hClass.id
        }
      }),
      hazardClassesLoading: false
    }),

    [getPackagingGroups.pending]: state => ({
      ...state,
      packagingGroupsLoading: true
    }),
    [getPackagingGroups.rejected]: state => ({
      ...state,
      packagingGroupsLoading: false
    }),
    [getPackagingGroups.fulfilled]: (state, { payload }) => ({
      ...state,
      packagingGroups: payload,
      packagingGroupsDropdown: payload.map((pGroup, id) => {
        return {
          key: id,
          text: pGroup.groupCode + ': ' + pGroup.description,
          value: pGroup.id
        }
      }),
      packagingGroupsLoading: false
    }),

    [getUnits.pending]: state => ({
      ...state,
      unitsLoading: true
    }),
    [getUnits.rejected]: state => ({
      ...state,
      unitsLoading: false
    }),
    [getUnits.fulfilled]: (state, { payload }) => ({
      ...state,
      units: payload,
      unitsDropdown: payload.map((unit, id) => {
        return {
          key: id,
          text: unit.name,  // ! ! or 'nameAbbreviation' ?
          value: unit.id
        }
      }),
      weightUnits: payload
        .filter(unit => unit.measureType.id === 1) // Weight only
        .map((type, id) => {
          return {
            key: id,
            text: type.name,
            value: type.id
          }
        }),
      unitsLoading: false
    }),

    [getMeasureTypes.pending]: state => ({
      ...state,
      measureTypesLoading: true
    }),
    [getMeasureTypes.rejected]: state => ({
      ...state,
      measureTypesLoading: false
    }),
    [getMeasureTypes.fulfilled]: (state, { payload }) => ({
      ...state,
      measureTypes: payload,
      measureTypesDropdown: payload.map((measType, id) => {
        return {
          key: id,
          text: measType.name,
          value: measType.id
        }
      }),
      measureTypesLoading: false
    }),

    [getLanguages.pending]: state => ({
      ...state,
      languagesLoading: true
    }),
    [getLanguages.rejected]: state => ({
      ...state,
      languagesLoading: false
    }),
    [getLanguages.fulfilled]: (state, { payload }) => ({
      ...state,
      languages: payload,
      languagesDropdown: payload.map(lang => {
        return {
          key: lang.languageAbbreviation,
          text: lang.language,
          value: lang.language
        }
      }),
      languagesLoading: false
    }),

  },
  initialState
)