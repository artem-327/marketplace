import React from 'react'
import { FormattedNumber } from 'react-intl'
import { connect } from 'react-redux'
import moment from 'moment/moment'

import Dashboard from './Dashboard'
import { FormattedUnit, FormattedAssay } from '~/components/formatted-messages'
import { currency } from '~/constants/index'
import { getSafe } from '~/utils/functions'
import { getLocaleDateFormat } from '~/components/date-format'
import { getDashboardData } from '../actions'

function mapStateToProps(store) {
  const {
    dashboard: { data }
  } = store
  return {
    companySumOfPurchasesMonthly: getSafe(() => data.companySumOfPurchasesMonthly, '')
      ? Object.entries(data.companySumOfPurchasesMonthly).map(([name, value]) => ({
          name,
          Transactions: Math.round(value / 1000)
        }))
      : [],
    companySumOfSalesMonthly: getSafe(() => data.companySumOfSalesMonthly, '')
      ? Object.entries(data.companySumOfSalesMonthly).map(([name, value]) => ({
          name,
          Transactions: Math.round(value / 1000)
        }))
      : [],
    top10Buyers: getSafe(() => data.top10Buyers, '')
      ? Object.entries(data.top10Buyers).map(([name, value]) => ({
          name,
          value
        }))
      : [],
    top10CompaniesByCompanyProducts: getSafe(() => data.top10CompaniesByCompanyProducts, '')
      ? Object.entries(data.top10CompaniesByCompanyProducts).map(([name, value]) => ({
          name,
          value
        }))
      : [],
    top10CompaniesBySalesInLastYear: getSafe(() => data.top10CompaniesBySalesInLastYear, '')
      ? Object.entries(data.top10CompaniesBySalesInLastYear).map(([name, value]) => ({
          name,
          value: Math.round(value / 1000)
        }))
      : [],
    top10CompaniesByUsers: getSafe(() => data.top10CompaniesByUsers, '')
      ? Object.entries(data.top10CompaniesByUsers).map(([name, value]) => ({
          name,
          value
        }))
      : [],
    top10CompanyProductsByQuantitySales: getSafe(() => data.top10CompanyProductsByQuantitySales, '')
      ? Object.entries(data.top10CompanyProductsByQuantitySales).map(([name, value]) => ({
          name,
          value
        }))
      : [],
    top10CompanyProductsByValueSales: getSafe(() => data.top10CompanyProductsByValueSales, '')
      ? Object.entries(data.top10CompanyProductsByValueSales).map(([name, value]) => ({
          name,
          value
        }))
      : [],
    totalBroadcastedProductOffersValue: getSafe(() => data.totalBroadcastedProductOffersValue / 1000000, 0),
    totalCompaniesCount: getSafe(() => data.totalCompaniesCount, 0),
    totalCompanyProductsCount: getSafe(() => data.totalCompanyProductsCount, 0),
    totalProductOffersValue: getSafe(() => data.totalProductOffersValue / 1000000, 0),
    totalUsersCount: getSafe(() => data.totalUsersCount, 0),
    loading: getSafe(() => data.loading, ''),
    graphDataTransactions: getSafe(() => data.totalSumOfSalesMonthly, '')
      ? Object.entries(data.totalSumOfSalesMonthly).map(([name, value]) => ({
          name,
          Transactions: Math.round(value / 1000)
        }))
      : [],
    top10ProductGroups: getSafe(() => data.top10ProductGroups, '')
      ? Object.entries(data.top10ProductGroups).map(([name, value]) => ({
          name,
          value: Math.round(value / 1000)
        }))
      : []
  }
}

export default connect(mapStateToProps, {
  getDashboardData
})(Dashboard)
