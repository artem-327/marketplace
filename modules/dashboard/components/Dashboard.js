import React, { Component } from 'react'
import { number, array, bool } from 'prop-types'
import { injectIntl } from 'react-intl'
import { Menu, Grid, Tab } from 'semantic-ui-react'
import { Briefcase, Package, DollarSign, User } from 'react-feather'
//components
import { getSafe } from '~/utils/functions'
import PieGraph from './PieGraph'
import LineGraph from './LineGraph'
import SummaryRectangle from './SummaryRectangle'
//styled
import styled from 'styled-components'

const CustomGrid = styled(Grid)`
  margin: 15px !important;
`

const UpperCaseText = styled.div`
  text-transform: uppercase;
`

const DivContainerGraph = styled.div`
  width: 100%;
  height: 580px;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;
`

const TabPane = styled(Tab.Pane)`
  display: contents !important;
  width: 100% !important;
  margin: 0 !important;
  border-radius: 0 !important;
  box-shadow: 0 !important;
  border: 0 !important;
  background-color: #ffffff;
`

class Dashboard extends Component {
  state = {
    activeTab: 0
  }

  componentDidMount() {
    try {
      this.props.getDashboardData()
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const {
      companiesCount,
      companyProductsCount,
      productOffersValue,
      totalSumOfSalesMonthly,
      top10ProductGroups,
      top10CompaniesByUsers,
      top10CompaniesBySalesInLastYear,
      top10CompaniesByCompanyProducts,
      top10CompanyProductsByQuantitySales,
      top10CompanyProductsByValueSales,
      broadcastedProductOffersValue,
      usersCount,
      companySumOfPurchasesMonthly,
      companySumOfSalesMonthly,
      top10Buyers,
      isAdmin,
      intl: { formatMessage }
    } = this.props

    const saleTab = [
      {
        menuItem: (
          <Menu.Item key='sales' onClick={() => this.setState({ activeTab: 0 })}>
            <UpperCaseText>{formatMessage({ id: 'dasboard.sales', defaultMessage: 'SALES' })}</UpperCaseText>
          </Menu.Item>
        ),
        render: () => (
          <TabPane key='sales' attached={false}>
            <LineGraph
              data={totalSumOfSalesMonthly}
              title='Total Sum Of Sales Monthly'
              titleId='dasboard.sales.graph.title'
              subTitle='in thousand dollars'
              subTitleId='dasboard.sales.graph.subtitle'
            />{' '}
          </TabPane>
        )
      }
    ]

    const companySalesPurchasesTabs = [
      {
        menuItem: (
          <Menu.Item key='company-sales' onClick={() => this.setState({ activeTab: 0 })}>
            <UpperCaseText>
              {formatMessage({ id: 'dasboard.companySales', defaultMessage: 'COMPANY SALES' })}
            </UpperCaseText>
          </Menu.Item>
        ),
        render: () => (
          <TabPane key='company-sales' attached={false}>
            <LineGraph
              data={companySumOfSalesMonthly}
              title='Company Sum Of Sales Monthly'
              titleId='dasboard.companySales.graph.title'
              subTitle='in thousand dollars'
              subTitleId='dasboard.sales.graph.subtitle'
            />
          </TabPane>
        )
      },
      {
        menuItem: (
          <Menu.Item key='company-purchases' onClick={() => this.setState({ activeTab: 1 })}>
            <UpperCaseText>
              {formatMessage({ id: 'dasboard.companyPurchase', defaultMessage: 'COMPANY PURCHASES' })}
            </UpperCaseText>
          </Menu.Item>
        ),
        render: () => (
          <TabPane key='company-purchases' attached={false}>
            <LineGraph
              data={companySumOfPurchasesMonthly}
              title='Company Sum Of Purchases Monthly'
              titleId='dasboard.companyPurchase.graph.title'
              subTitle='in thousand dollars'
              subTitleId='dasboard.sales.graph.subtitle'
            />
          </TabPane>
        )
      }
    ]

    return (
      <CustomGrid secondary verticalAlign='middle' className='page-part'>
        <Grid.Row>
          <Grid.Column width={10}>
            <DivContainerGraph>
              <Tab
                className='inventory-sidebar tab-menu flex stretched'
                menu={{ secondary: true, pointing: true }}
                activeIndex={this.state.activeTab}
                menu={{ secondary: true, pointing: true }}
                panes={isAdmin ? saleTab : companySalesPurchasesTabs}
              />
            </DivContainerGraph>
          </Grid.Column>

          <Grid.Column width={5}>
            <SummaryRectangle
              icon={<Briefcase />}
              data={companiesCount}
              title='Total Companies'
              titleId='dashboard.totalCompanies.title'
            />
            <SummaryRectangle
              icon={<Package />}
              data={companyProductsCount}
              title='Total Products'
              titleId='dashboard.totalProducts.title'
              styleCircle={{ backgroundColor: '#84c225', border: 'solid 5px rgb(232, 255, 197)' }}
            />
            <SummaryRectangle
              icon={<User />}
              data={usersCount}
              title='Total Users Count'
              titleId='dashboard.totalUsersCount.title'
              styleCircle={{ backgroundColor: '#f16844', border: 'solid 5px rgb(255, 233, 227)' }}
            />
            <SummaryRectangle
              icon={<DollarSign />}
              data={productOffersValue}
              title='Total Products Value $M'
              titleId='dashboard.totalValue.title'
              styleCircle={{ backgroundColor: '#ffc65d', border: 'solid 5px rgb(255, 232, 190)' }}
            />
            <SummaryRectangle
              icon={<DollarSign />}
              data={broadcastedProductOffersValue}
              title='Total Broadcasted Value $M'
              titleId='dashboard.totalBroadcastedValue.title'
              styleCircle={{ backgroundColor: '#4cc3da', border: 'solid 5px rgb(224, 250, 255)' }}
              isLastSummary
            />
          </Grid.Column>
        </Grid.Row>
        {isAdmin ? (
          <Grid.Row>
            <Grid.Column width={5}>
              <PieGraph
                innerRadius='30%'
                valueLegend='users'
                data={top10CompaniesByUsers}
                title='COMPANIES BY USERS'
                titleId='dasboard.companiesUsers.title'
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <PieGraph
                innerRadius='30%'
                data={top10CompaniesByCompanyProducts}
                title='COMPANIES BY PRODUCTS'
                titleId='dasboard.companiesProducts.title'
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <PieGraph
                innerRadius='30%'
                isCurrency={true}
                valueLegend='/year'
                data={top10CompaniesBySalesInLastYear}
                title='COMPANIES BY TRANSACTIONS'
                titleId='dasboard.companiesTransactions.title'
              />
            </Grid.Column>
          </Grid.Row>
        ) : null}
        <Grid.Row>
          <Grid.Column width={5}>
            <PieGraph
              innerRadius='30%'
              data={top10CompanyProductsByQuantitySales}
              title='PRODUCTS BY QUANTITY'
              titleId='dasboard.productsQuantity.title'
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <PieGraph
              innerRadius='30%'
              isCurrency={true}
              data={top10CompanyProductsByValueSales}
              title='PRODUCTS BY VALUE'
              titleId='dasboard.productsValue.title'
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <PieGraph
              innerRadius='30%'
              isCurrency={true}
              data={top10ProductGroups}
              title='POPULAR PRODUCTS'
              titleId='dasboard.productsPopular.title'
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={5}>
            <PieGraph innerRadius='30%' data={top10Buyers} title='TOP 10 BUYERS' titleId='dasboard.topBuyers.title' />
          </Grid.Column>
        </Grid.Row>
      </CustomGrid>
    )
  }
}

Dashboard.propTypes = {
  companiesCount: number,
  broadcastedProductOffersValue: number,
  companyProductsCount: number,
  productOffersValue: number,
  usersCount: number,
  top10ProductGroups: array,
  top10CompaniesByUsers: array,
  top10CompaniesByCompanyProducts: array,
  top10CompaniesBySalesInLastYear: array,
  top10CompanyProductsByQuantitySales: array,
  top10CompanyProductsByValueSales: array,
  companySumOfPurchasesMonthly: array,
  companySumOfSalesMonthly: array,
  top10Buyers: array,
  totalSumOfSalesMonthly: array,
  isAdmin: bool
}

Dashboard.defaultProps = {
  companiesCount: 0,
  broadcastedProductOffersValue: 0,
  companyProductsCount: 0,
  productOffersValue: 0,
  usersCount: 0,
  top10ProductGroups: [],
  top10ProductGroups: [],
  top10CompaniesByCompanyProducts: [],
  top10CompaniesBySalesInLastYear: [],
  top10CompanyProductsByQuantitySales: [],
  top10CompanyProductsByValueSales: [],
  companySumOfPurchasesMonthly: [],
  companySumOfSalesMonthly: [],
  top10Buyers: [],
  totalSumOfSalesMonthly: [],
  isAdmin: false
}

export default injectIntl(Dashboard)
