import { createSelector } from 'reselect'
import { getSafe } from '../../utils/functions'
import { config } from './constants'

const getUnits = state => state.globalData.units
const getCurrentEditForm = state => getSafe(() => state.admin.currentEditForm, null)
const getCurrentAddForm = state => getSafe(() => state.admin.currentAddForm, null)
const getCurrentAddDwolla = state => getSafe(() => state.admin.currentAddDwolla, null)
const getAuth = state => getSafe(() => state.auth, null)
const getTableHandlersFilters = state => getSafe(() => state.admin.tableHandlersFilters, null)
const getCasListDataRequest = state => getSafe(() => state.admin.casListDataRequest, { pageSize: 50, pageNumber: 0, sortDirection: 'asc', sortPath: 'CasProduct.chemicalName' })
const getPopupValues = state => getSafe(() => state.admin.popupValues, null)
const getUpdating = state => getSafe(() => state.admin.updating, false)
const getEditId = state => getSafe(() => state.admin.popupValues.id, null)
const getFilterValue = state => getSafe(() => state.admin.filterValue, '')
const getLoading = state => getSafe(() => state.admin.loading, false)
const getConfig = state => getSafe(() => state.admin.config, config)
const getConfirmMessage = state => getSafe(() => state.admin.confirmMessage, null)
const getDeleteRowById = state => getSafe(() => state.admin.deleteRowById, null)
const getlogisticsProvidersFetching = state => getSafe(() => state.admin.logisticsProvidersFetching, false)
const getLogisticsProviders = state => getSafe(() => state.admin.logisticsProviders, [])

export const makeGetDimensionUnits = () => createSelector([getUnits], units => units?.filter(d=>{return d.measureType.name === "length"}).map(d => {
    return {
      key: d.id,
      text: d.name,
      value: d.id
    }
  })
)
export const makeGetWeightUnits = () => createSelector([getUnits], units => units?.filter(d=>{return d.measureType.name === "weight"}).map(d => {
    return {
      key: d.id,
      text: d.name,
      value: d.id
    }
  })
)
export const makeGetCurrentEditForm = () => createSelector([getCurrentEditForm], currentEditForm => currentEditForm)
export const makeGetCurrentAddForm = () => createSelector([getCurrentAddForm], currentAddForm => currentAddForm)
export const makeGetCurrentAddDwolla = () => createSelector([getCurrentAddDwolla], currentAddDwolla => currentAddDwolla)
export const makeGetAuth = () => createSelector([getAuth], auth => auth)
export const makeGetTableHandlersFilters = () => createSelector([getTableHandlersFilters], tableHandlersFilters => tableHandlersFilters)
export const makeGetCasListDataRequest = () => createSelector([getCasListDataRequest], casListDataRequest => casListDataRequest)
export const makeGetPopupValues = () => createSelector([getPopupValues], popupValues => popupValues)
export const makeGetUpdating = () => createSelector([getUpdating], updating => updating)
export const makeGetEditId = () => createSelector([getEditId], editId => editId)
export const makeGetFilterValue = () => createSelector([getFilterValue], filterValue => filterValue)
export const makeGetLoading = () => createSelector([getLoading], loading => loading)
export const makeGetConfig = () => createSelector([getConfig], config => config)
export const makeGetConfirmMessage = () => createSelector([getConfirmMessage], confirmMessage => confirmMessage)
export const makeGetDeleteRowById = () => createSelector([getDeleteRowById], deleteRowById => deleteRowById)
export const makeGetlogisticsProvidersFetching = () => createSelector([getlogisticsProvidersFetching], logisticsProvidersFetching => logisticsProvidersFetching)
export const makeGetLogisticsProviders = () => createSelector([getLogisticsProviders], logisticsProviders => logisticsProviders)