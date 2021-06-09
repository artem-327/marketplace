import typeToReducer from 'type-to-reducer'
import { uniqueArrayByKey } from '../../utils/functions'

import {
  getCountries,
  getProductConditions,
  getProductForms,
  getProductGrades,
  getPackagingTypes
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
  },
  initialState
)