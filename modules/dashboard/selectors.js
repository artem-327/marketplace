import { createSelector } from 'reselect'
//Services
import { getSafe } from '../../utils/functions'

const getIsReady = state => (getSafe(() => state.auth.identity, null) !== null) && (getSafe(() => state.auth.identity.isAdmin, null) !== null)
const getIsAdmin = state => getSafe(() => state.auth.identity.isAdmin, false)
const getTakeover = state => getSafe(() => !!state.auth.identity.company.id, false) && getSafe(() => state.auth.identity.isAdmin, false)
const getCompanySumOfPurchasesMonthly = state => getSafe(() => state.dashboard.data.companySumOfPurchasesMonthly, '')
    ? Object.entries(state.dashboard.data.companySumOfPurchasesMonthly)
        .map(([name, value]) => ({
        name,
        Transactions: Math.round(value)
        }))
        .reverse()
    : []
const getCompanySumOfSalesMonthly = state => getSafe(() => state.dashboard.data.companySumOfSalesMonthly, '')
    ? Object.entries(state.dashboard.data.companySumOfSalesMonthly)
        .map(([name, value]) => ({
        name,
        Transactions: Math.round(value)
        }))
        .reverse()
    : []
const getTop10Buyers = state => getSafe(() => state.dashboard.data.top10Buyers, '')
    ? Object.entries(state.dashboard.data.top10Buyers).map(([name, value]) => ({
        name,
        value
    }))
    : []
const getTop10CompaniesByCompanyProducts = state => getSafe(() => state.dashboard.data.top10CompaniesByCompanyProducts, '')
    ? Object.entries(state.dashboard.data.top10CompaniesByCompanyProducts).map(([name, value]) => ({
        name,
        value
    }))
    : []
const getTop10CompaniesBySalesInLastYear = state => getSafe(() => state.dashboard.data.top10CompaniesBySalesInLastYear, '')
    ? Object.entries(state.dashboard.data.top10CompaniesBySalesInLastYear).map(([name, value]) => ({
        name,
        value: Math.round(value)
    }))
    : []
const getTop10CompaniesByUsers = state => getSafe(() => state.dashboard.data.top10CompaniesByUsers, '')
    ? Object.entries(state.dashboard.data.top10CompaniesByUsers).map(([name, value]) => ({
        name,
        value
    }))
    : []
const getTop10CompanyProductsByQuantitySales = state => getSafe(() => state.dashboard.data.top10CompanyProductsByQuantitySales, '')
    ? Object.entries(state.dashboard.data.top10CompanyProductsByQuantitySales).map(([name, value]) => ({
        name,
        value
    }))
    : []
const getTop10CompanyProductsByValueSales = state => getSafe(() => state.dashboard.data.top10CompanyProductsByValueSales, '')
    ? Object.entries(state.dashboard.data.top10CompanyProductsByValueSales).map(([name, value]) => ({
        name,
        value
    }))
    : []
const getBroadcastedProductOffersValue = state => getIsAdmin(state) && !getTakeover(state)
    ? getSafe(() => state.dashboard.data.totalBroadcastedProductOffersValue, 0)
    : getSafe(() => state.dashboard.data.companyTotalSales, 0)
const getTotalCompanyPartners = state => state?.dashboard?.data?.totalCompanyPartners ?? 0 //CHECK if BE sends this atribute already
const getCompanyProductsCount = state => getIsAdmin(state) && !getTakeover(state)
    ? getSafe(() => state.dashboard.data.totalCompanyProductsCount, 0)
    : getSafe(() => state.dashboard.data.companyCompanyProductsCount, 0)
const getProductOffersValue = state => getIsAdmin(state) && !getTakeover(state)
    ? getSafe(() => state.dashboard.data.totalProductOffersValue, 0)
    : getSafe(() => state.dashboard.data.companyProductOffersValue, 0)
const getUsersCount = state => getIsAdmin(state) && !getTakeover(state) 
    ? getSafe(() => state.dashboard.data.totalUsersCount, 0) 
    : getSafe(() => state.dashboard.data.companyUsersCount, 0)
const getCompaniesCount = state => getIsAdmin(state) && !getTakeover(state) 
    ? getSafe(() => state.dashboard.data.totalCompaniesCount, 0) 
    : 0
const getProductOffers = state => getIsAdmin(state) && !getTakeover(state) 
    ? getSafe(() => state.dashboard.data.companyProductOffersCount, 0)
    : getSafe(() => state.dashboard.data.companyProductOffersCount, 0)
const getLoading = state => getSafe(() => state.dashboard.data.loading, '')
const getTotalSumOfSalesMonthly = state => getSafe(() => state.dashboard.data.totalSumOfSalesMonthly, '')
    ? Object.entries(state.dashboard.data.totalSumOfSalesMonthly)
        .map(([name, value]) => ({
        name,
        Transactions: Math.round(value)
        }))
        .reverse()
    : []
const getTop10ProductGroups = state => getSafe(() => state.dashboard.data.top10ProductGroups, '')
    ? Object.entries(state.dashboard.data.top10ProductGroups).map(([name, value]) => ({
        name,
        value
    }))
    : []
const getDailyStats = state => getSafe(() => state.dashboard.dailyStats, null)

export const makeGetIsReady = () => {
    return createSelector([getIsReady], isReady => isReady)
}
export const makeGetIsAdmin = () => {
    return createSelector([getIsAdmin], isAdmin => isAdmin)
}
export const makeGetTakeover = () => {
    return createSelector([getTakeover], takeover => takeover)
}
export const makeGetCompanySumOfPurchasesMonthly = () => {
    return createSelector([getCompanySumOfPurchasesMonthly], companySumOfPurchasesMonthly => companySumOfPurchasesMonthly)
}
export const makeGetCompanySumOfSalesMonthly = () => {
    return createSelector([getCompanySumOfSalesMonthly], companySumOfSalesMonthly => companySumOfSalesMonthly)
}
export const makeGetTop10Buyers = () => {
    return createSelector([getTop10Buyers], top10Buyers => top10Buyers)
}
export const makeGetTop10CompaniesByCompanyProducts = () => {
    return createSelector([getTop10CompaniesByCompanyProducts], top10CompaniesByCompanyProducts => top10CompaniesByCompanyProducts)
}
export const makeGetTop10CompaniesBySalesInLastYear = () => {
    return createSelector([getTop10CompaniesBySalesInLastYear], top10CompaniesBySalesInLastYear => top10CompaniesBySalesInLastYear)
}
export const makeGetTop10CompaniesByUsers = () => {
    return createSelector([getTop10CompaniesByUsers], top10CompaniesByUsers => top10CompaniesByUsers)
}
export const makeGetTop10CompanyProductsByQuantitySales = () => {
    return createSelector([getTop10CompanyProductsByQuantitySales], top10CompanyProductsByQuantitySales => top10CompanyProductsByQuantitySales)
}
export const makeGetTop10CompanyProductsByValueSales = () => {
    return createSelector([getTop10CompanyProductsByValueSales], top10CompanyProductsByValueSales => top10CompanyProductsByValueSales)
}
export const makeGetBroadcastedProductOffersValue = () => {
    return createSelector([getBroadcastedProductOffersValue], broadcastedProductOffersValue => broadcastedProductOffersValue)
}
export const makeGetTotalCompanyPartners = () => {
    return createSelector([getTotalCompanyPartners], totalCompanyPartners => totalCompanyPartners)
}
export const makeGetCompanyProductsCount = () => {
    return createSelector([getCompanyProductsCount], companyProductsCount => companyProductsCount)
}
export const makeGetProductOffersValue = () => {
    return createSelector([getProductOffersValue], productOffersValue => productOffersValue)
}
export const makeGetUsersCount = () => {
    return createSelector([getUsersCount], usersCount => usersCount)
}
export const makeGetCompaniesCount = () => {
    return createSelector([getCompaniesCount], companiesCount => companiesCount)
}
export const makeGetProductOffers = () => {
    return createSelector([getProductOffers], productOffers => productOffers)
}
export const makeGetLoading = () => {
    return createSelector([getLoading], loading => loading)
}
export const makeGetTotalSumOfSalesMonthly = () => {
    return createSelector([getTotalSumOfSalesMonthly], totalSumOfSalesMonthly => totalSumOfSalesMonthly)
}
export const makeGetTop10ProductGroups = () => {
    return createSelector([getTop10ProductGroups], top10ProductGroups => top10ProductGroups)
}
export const makeGetDailyStats = () => {
    return createSelector([getDailyStats], dailyStats => dailyStats)
}
