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
    companySumOfPurchasesMonthly: getSafe(() => data.companySumOfPurchasesMonthly, ''),
    companySumOfSalesMonthly: getSafe(() => data.companySumOfSalesMonthly, ''),
    top10Buyers: getSafe(() => data.top10Buyers, ''),
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
    top10CompanyProductsByQuantitySales: getSafe(() => data.top10CompanyProductsByQuantitySales, ''),
    top10CompanyProductsByValueSales: getSafe(() => data.top10CompanyProductsByValueSales, ''),
    totalBroadcastedProductOffersValue: getSafe(() => data.totalBroadcastedProductOffersValue, ''),
    totalCompaniesCount: getSafe(() => data.totalCompaniesCount, 0) ? (
      <FormattedNumber minimumFractionDigits={0} value={getSafe(() => data.totalCompaniesCount, 0)} />
    ) : (
      0
    ),
    totalCompanyProductsCount: getSafe(() => data.totalCompanyProductsCount, 0) ? (
      <FormattedNumber minimumFractionDigits={0} value={getSafe(() => data.totalCompanyProductsCount, 0)} />
    ) : (
      0
    ),
    totalProductOffersValue: getSafe(() => data.totalProductOffersValue, false) ? (
      <FormattedNumber minimumFractionDigits={2} value={getSafe(() => data.totalProductOffersValue, 0)} />
    ) : (
      0
    ),
    totalUsersCount: getSafe(() => data.totalUsersCount, ''),
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
