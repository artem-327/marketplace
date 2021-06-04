import { connect } from 'react-redux'
// Component
import Dashboard from './Dashboard'
// Actions
import { getDashboardData, getDailyStatistics } from '../actions'
// Selectors
import {
  makeGetIsAdmin,
  makeGetTakeover,
  makeGetCompanySumOfPurchasesMonthly,
  makeGetCompanySumOfSalesMonthly,
  makeGetTop10Buyers,
  makeGetTop10CompaniesByCompanyProducts,
  makeGetTop10CompaniesBySalesInLastYear,
  makeGetTop10CompaniesByUsers,
  makeGetTop10CompanyProductsByQuantitySales,
  makeGetTop10CompanyProductsByValueSales,
  makeGetBroadcastedProductOffersValue,
  makeGetTotalCompanyPartners,
  makeGetCompanyProductsCount,
  makeGetProductOffersValue,
  makeGetUsersCount,
  makeGetProductOffers,
  makeGetLoading,
  makeGetTotalSumOfSalesMonthly,
  makeGetTop10ProductGroups,
  makeGetDailyStats
} from '../selectors'

const makeMapStateToProps = () => {
  const getIsAdmin = makeGetIsAdmin()
  const getTakeover = makeGetTakeover()
  const getCompanySumOfPurchasesMonthly = makeGetCompanySumOfPurchasesMonthly()
  const getCompanySumOfSalesMonthly = makeGetCompanySumOfSalesMonthly()
  const getTop10Buyers = makeGetTop10Buyers()
  const getTop10CompaniesByCompanyProducts = makeGetTop10CompaniesByCompanyProducts()
  const getTop10CompaniesBySalesInLastYear = makeGetTop10CompaniesBySalesInLastYear()
  const getTop10CompaniesByUsers = makeGetTop10CompaniesByUsers()
  const getTop10CompanyProductsByQuantitySales = makeGetTop10CompanyProductsByQuantitySales()
  const getTop10CompanyProductsByValueSales = makeGetTop10CompanyProductsByValueSales()
  const getBroadcastedProductOffersValue = makeGetBroadcastedProductOffersValue()
  const getTotalCompanyPartners = makeGetTotalCompanyPartners()
  const getCompanyProductsCount = makeGetCompanyProductsCount()
  const getProductOffersValue = makeGetProductOffersValue()
  const getUsersCount = makeGetUsersCount()
  const getProductOffers = makeGetProductOffers()
  const getLoading = makeGetLoading()
  const getTotalSumOfSalesMonthly = makeGetTotalSumOfSalesMonthly()
  const getTop10ProductGroups = makeGetTop10ProductGroups()
  const getDailyStats = makeGetDailyStats()
  
  const mapStateToProps = (state) => {
    return {
      isAdmin: getIsAdmin(state),
      takeover: getTakeover(state),
      companySumOfPurchasesMonthly: getCompanySumOfPurchasesMonthly(state),
      companySumOfSalesMonthly: getCompanySumOfSalesMonthly(state),
      top10Buyers: getTop10Buyers(state),
      top10CompaniesByCompanyProducts: getTop10CompaniesByCompanyProducts(state),
      top10CompaniesBySalesInLastYear: getTop10CompaniesBySalesInLastYear(state),
      top10CompaniesByUsers: getTop10CompaniesByUsers(state),
      top10CompanyProductsByQuantitySales: getTop10CompanyProductsByQuantitySales(state),
      top10CompanyProductsByValueSales: getTop10CompanyProductsByValueSales(state),
      broadcastedProductOffersValue: getBroadcastedProductOffersValue(state),
      totalCompanyPartners: getTotalCompanyPartners(state),
      companyProductsCount: getCompanyProductsCount(state),
      productOffersValue: getProductOffersValue(state),
      usersCount: getUsersCount(state),
      productOffers: getProductOffers(state),
      loading: getLoading(state),
      totalSumOfSalesMonthly: getTotalSumOfSalesMonthly(state),
      top10ProductGroups: getTop10ProductGroups(state),
      dailyStats: getDailyStats(state)
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps, {
  getDashboardData,
  getDailyStatistics
})(Dashboard)
