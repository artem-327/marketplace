import { createSelector } from 'reselect'
//Services
import { getSafe } from '../../utils/functions'

const getAuth = state => getSafe(() => state.auth, null)
const getIsOpenPopup = state => getSafe(() => state.operations.isOpenPopup, false)
const getIsOpenGenBOLPopup = state => getSafe(() => state.operations.isOpenGenBOLPopup, false)
const getRowBOL = state => getSafe(() => state.operations.rowBOL, null)
const getTimezone = state => getSafe(() => state.auth?.identity?.settings?.find(item => item.key === 'USER_TIME_ZONE'), null)
const getOrderDetailData = state => getSafe(() => state.operations.orderDetailData, null)
const getCompanyProductUnmappedOnly = state => getSafe(() => state.operations.companyProductUnmappedOnly, 'ALL')
const getTableHandlersFilters = state => getSafe(() => state.operations.tableHandlersFilters, null)
const getSearchedCompanies = state => state?.operations?.searchedCompanies?.map(d => ({
    key: d.id,
    value: JSON.stringify(d),
    text: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, '')
}))
const getSearchedCompaniesLoading = state => getSafe(() => state.operations.searchedCompaniesLoading, false)
const getFilterValue = state => getSafe(() => state.operations.filterValue, '')
const getLoading = state => getSafe(() => state.operations.loading, false)
const getOrderByIdLoading = state => getSafe(() => state.operations.orderByIdLoading, false)
const getEchoSupportPhone = state => getSafe(() => state.auth.identity.settings.find(el => el.key === 'APP_SUPPORT_PHONE_NUMBER').value, 'N/A')
const getIsPaymentCancellable = state => getSafe(() => state.operations.orderDetailData.isPaymentCancellable, false)
const getDatagridFilterUpdate = state => getSafe(() => state.orders.datagridFilterUpdate, false)
const getOrderAccountingDocuments = state => getSafe(() => state.operations.orderAccountingDocuments, [])
const getOrderAccountingDocumentsLoading = state => getSafe(() => state.operations.orderAccountingDocumentsLoading, false)
const getIsFetching = state => getSafe(() => state.orders.isFetching, false)
const getOrderProcessing = state => getSafe(() => state.operations.orderProcessing, false)
const getSearchedManQuotRequests = state => getSafe(() => state.operations.searchedManQuotRequests, [])
const getSearchedManQuotRequestsLoading = state => getSafe(() => state.operations.searchedManQuotRequestsLoading, false)
const getPopupValues = state => state?.operations?.popupValues ? {
    options: {
        id: getSafe(() => state.operations.popupValues.info.shippingQuoteRequestId, ''),
        requestingCompany: {
            name: getSafe(() => state.operations.popupValues.info.buyerCompanyName, 'N/A'),
        },
        requestingUser: {
            name: getSafe(() => state.operations.popupValues.requestingUser.name, ''), // TODO to be adjusted
        }
    }
} : null
const getPopupValuesId = state => getSafe(() => state.operations.popupValues.id, null)
const getPopupValuesName = state => state?.operations?.popupValues? { name: state.operations.popupValues.name } : null
const getRows = datagrid => datagrid?.rows

export const makeGetAuth = () => {
    return createSelector([getAuth], auth => auth)
}
export const makeGetIsOpenPopup = () => {
    return createSelector([getIsOpenPopup], isOpenPopup => isOpenPopup)
}
export const makeGetIsOpenGenBOLPopup = () => {
    return createSelector([getIsOpenGenBOLPopup], isOpenGenBOLPopup => isOpenGenBOLPopup)
}
export const makeGetRowBOL = () => {
    return createSelector([getRowBOL], rowBOL => rowBOL)
}
export const makeGetTimezone = () => {
    return createSelector([getTimezone], data => data)
}
export const makeGetOrderDetailData = () => {
    return createSelector([getOrderDetailData], orderDetailData => orderDetailData)
}
export const makeGetCompanyProductUnmappedOnly = () => {
    return createSelector([getCompanyProductUnmappedOnly], companyProductUnmappedOnly => companyProductUnmappedOnly)
}
export const makeGetTableHandlersFilters = () => {
    return createSelector([getTableHandlersFilters], tableHandlersFilters => tableHandlersFilters)
}
export const makeGetSearchedCompanies = () => {
    return createSelector([getSearchedCompanies], searchedCompanies => searchedCompanies)
}
export const makeGetSearchedCompaniesLoading = () => {
    return createSelector([getSearchedCompaniesLoading], searchedCompaniesLoading => searchedCompaniesLoading)
}
export const makeGetFilterValue = () => {
    return createSelector([getFilterValue], filterValue => filterValue)
}
export const makeGetLoading = () => {
    return createSelector([getLoading], loading => loading)
}
export const makeGetOrderByIdLoading = () => {
    return createSelector([getOrderByIdLoading], loading => loading)
}
export const makeGetEchoSupportPhone = () => {
    return createSelector([getEchoSupportPhone], echoSupportPhone => echoSupportPhone)
}
export const makeGetIsPaymentCancellable = () => {
    return createSelector([getIsPaymentCancellable], isPaymentCancellable => isPaymentCancellable)
}
export const makeGetDatagridFilterUpdate = () => {
    return createSelector([getDatagridFilterUpdate], datagridFilterUpdate => datagridFilterUpdate)
}
export const makeGetOrderAccountingDocuments = () => {
    return createSelector([getOrderAccountingDocuments], orderAccountingDocuments => orderAccountingDocuments)
}
export const makeGetOrderAccountingDocumentsLoading = () => {
    return createSelector([getOrderAccountingDocumentsLoading], orderAccountingDocumentsLoading => orderAccountingDocumentsLoading)
}
export const makeGetIsFetching = () => {
    return createSelector([getIsFetching], isFetching => isFetching)
}
export const makeGetOrderProcessing = () => {
    return createSelector([getOrderProcessing], orderProcessing => orderProcessing)
}
export const makeGetSearchedManQuotRequests = () => {
    return createSelector([getSearchedManQuotRequests], searchedManQuotRequests => searchedManQuotRequests)
}
export const makeGetSearchedManQuotRequestsLoading = () => {
    return createSelector([getSearchedManQuotRequestsLoading], searchedManQuotRequestsLoading => searchedManQuotRequestsLoading)
}
export const makeGetPopupValues = () => {
    return createSelector([getPopupValues], popupValues => popupValues)
}
export const makeGetPopupValuesId = () => {
    return createSelector([getPopupValuesId], rowId => rowId)
}
export const makeGetPopupValuesName = () => {
    return createSelector([getPopupValuesName], popupValuesName => popupValuesName)
}
export const makeGetRows = () => {
    return createSelector([getRows], rows => rows)
}
