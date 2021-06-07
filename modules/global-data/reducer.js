import typeToReducer from 'type-to-reducer'

import {
  getCountries
} from './actions'

export const initialState = {
  countries: [],
  countriesLoading: false
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
      countriesLoading: false
    }),


  },
  initialState
)