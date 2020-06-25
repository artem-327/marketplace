import React, { Component } from 'react'
import { number, array } from 'prop-types'
import { DatesRangeInput } from 'semantic-ui-calendar-react'
import { FormattedMessage, injectIntl, FormattedNumber } from 'react-intl'
import { Menu, Button, Input, Grid, GridRow, GridColumn, Container, Tab } from 'semantic-ui-react'
import { ChevronLeft, ChevronRight, Briefcase, Package, DollarSign, User } from 'react-feather'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer
} from 'recharts'
import AnimatedNumber from 'animated-number-react'
//components
import { getSafe } from '~/utils/functions'
import { currency } from '~/constants/index'
import PieGraph from './PieGraph'
import LineGraph from './LineGraph'
//styled
import styled from 'styled-components'

//FIXME remove
const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 400 },
  { name: 'Group F', value: 300 },
  { name: 'Group G', value: 300 },
  { name: 'Group H', value: 200 }
]

const CustomGrid = styled(Grid)`
  margin: 15px !important;
`

const DivFlex = styled.div`
  display: flex;
`

const ButtonLeftArrows = styled(Button)`
  width: 40px;
  height: 38px;
  border-radius: 3px !important;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06) !important;
  border: solid 1px #dee2e6 !important;
  background-color: #ffffff !important;
  margin-left: 10px !important;
  margin-right: 0 !important;
  padding: 0 !important;
`

const ButtonRightArrows = styled(Button)`
  width: 40px;
  height: 38px;
  border-radius: 3px !important;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06) !important;
  border: solid 1px #dee2e6 !important;
  background-color: #ffffff !important;
  padding: 0 !important;
`

const RectangleSummary = styled.div`
  width: 100%;
  height: 103px;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;
  margin-bottom: 16px;
`

const RectangleLastSummary = styled.div`
  width: 100%;
  height: 103px;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;
`

const RectangleSummaryMoney = styled.div`
  width: 100%;
  height: 103px;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;
  margin-bottom: 28px;
`

const DivNumbersColumn = styled.div`
  width: 100%;
  justify-content: space-between;
`

const RectangleSummaryHeader = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 4px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
`

const DivIcon = styled.div`
  height: 100%;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Circle = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  border: solid 5px #c5ebff;
  background-color: #2599d5;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  /* position: relative;
  text-align: center; */
`

const DivSummary = styled.div`
  width: 200px;
  height: 100px;
  background-color: #ffffff;
`

const DivNumbers = styled.div`
  opacity: 0.89;
  font-size: 32px;
  font-weight: bold;
  line-height: 1.25;
  color: #242424;
  padding-top: 25px;
`

const DivTotalText = styled.div`
  font-size: 14px;
  line-height: 1.43;
  color: #848893;
`

const RectangleSummaryBottom = styled.div`
  width: 100%;
  height: 50px;
  border-top: solid 1px #dee2e6;
  background-color: #f8f9fb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
`

const DivTotalTextBottom = styled.div`
  font-size: 12px;
  line-height: 1.67;
  color: #848893;
`

const ButtonViewAll = styled(Button)`
  width: 80px;
  height: 32px;
  border-radius: 3px !important;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06) !important;
  border: solid 1px #dee2e6 !important;
  background-color: #ffffff !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  line-height: 1.54 !important;
  text-align: center !important;
  color: #848893 !important;
  padding: 0 !important;
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

const DivGraph = styled.div`
  margin: 20px;
`

const GraphTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`
const GraphSubTitle = styled.div`
  font-size: 12px;
  font-style: italic;
  text-align: center;
  color: #848893;
  margin-bottom: 10px;
`

class Dashboard extends Component {
  state = {
    datesRange: '',
    activeTab: 0
  }

  componentDidMount() {
    try {
      this.props.getDashboardData()
    } catch (error) {
      console.error(error)
    }
  }

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value })
    }
  }

  formatValue = value => value.toFixed(0)

  render() {
    const {
      totalCompaniesCount,
      totalCompanyProductsCount,
      totalProductOffersValue,
      graphDataTransactions,
      top10ProductGroups,
      top10CompaniesByUsers,
      top10CompaniesBySalesInLastYear,
      top10CompaniesByCompanyProducts,
      top10CompanyProductsByQuantitySales,
      top10CompanyProductsByValueSales,
      totalBroadcastedProductOffersValue,
      totalUsersCount,
      companySumOfPurchasesMonthly,
      companySumOfSalesMonthly,
      intl: { formatMessage }
    } = this.props

    const top4ProductGroups =
      top10ProductGroups && top10ProductGroups.length > 4 ? top10ProductGroups.slice(0, 4) : top10ProductGroups
    const top4CompaniesByUsers =
      top10CompaniesByUsers && top10CompaniesByUsers.length > 4
        ? top10CompaniesByUsers.slice(0, 4)
        : top10CompaniesByUsers

    const top4CompaniesBySalesInLastYear =
      top10CompaniesBySalesInLastYear && top10CompaniesBySalesInLastYear.length > 4
        ? top10CompaniesBySalesInLastYear.slice(0, 4)
        : top10CompaniesBySalesInLastYear

    const top4CompaniesByCompanyProducts =
      top10CompaniesByCompanyProducts && top10CompaniesByCompanyProducts.length > 4
        ? top10CompaniesByCompanyProducts.slice(0, 4)
        : top10CompaniesByCompanyProducts

    const top4CompanyProductsByQuantitySales =
      top10CompanyProductsByQuantitySales && top10CompanyProductsByQuantitySales.length > 4
        ? top10CompanyProductsByQuantitySales.slice(0, 4)
        : top10CompanyProductsByQuantitySales

    const top4CompanyProductsByValueSales =
      top10CompanyProductsByValueSales && top10CompanyProductsByValueSales.length > 4
        ? top10CompanyProductsByValueSales.slice(0, 4)
        : top10CompanyProductsByValueSales

    const { activeTab } = this.state
    const panes = [
      {
        menuItem: (
          <Menu.Item key='sales' onClick={() => this.setState({ activeTab: 0 })}>
            <UpperCaseText>{formatMessage({ id: 'dasboard.sales', defaultMessage: 'SALES' })}</UpperCaseText>
          </Menu.Item>
        ),
        render: () => (
          <TabPane key='sales' attached={false}>
            <LineGraph
              data={graphDataTransactions}
              title='Total Sum Of Sales Monthly'
              titleId='dasboard.sales.graph.title'
              subTitle='in thousand dollars'
              subTitleId='dasboard.sales.graph.subtitle'
            />{' '}
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
      },
      {
        menuItem: (
          <Menu.Item key='company-sales' onClick={() => this.setState({ activeTab: 2 })}>
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
      }
    ]

    return (
      <CustomGrid secondary verticalAlign='middle' className='page-part'>
        {/* row for date range graphs and datas*/}
        {false && (
          <Grid.Row>
            <Grid.Column width={8}>
              <DivFlex>
                <DatesRangeInput
                  name='datesRange'
                  placeholder='From - To'
                  value={this.state.datesRange}
                  iconPosition='left'
                  onChange={this.handleChange}
                  popupPosition='bottom left'
                />
                <ButtonLeftArrows type='button'>
                  <ChevronLeft />
                </ButtonLeftArrows>
                <ButtonRightArrows type='button'>
                  <ChevronRight />
                </ButtonRightArrows>
              </DivFlex>
            </Grid.Column>
          </Grid.Row>
        )}

        <Grid.Row>
          <Grid.Column width={10}>
            <DivContainerGraph>
              <Tab
                className='inventory-sidebar tab-menu flex stretched'
                menu={{ secondary: true, pointing: true }}
                activeIndex={this.state.activeTab}
                menu={{ secondary: true, pointing: true }}
                panes={panes}
              />
            </DivContainerGraph>
          </Grid.Column>

          <Grid.Column width={5}>
            <RectangleSummary>
              <RectangleSummaryHeader>
                <DivIcon>
                  <Circle>
                    <Briefcase />
                  </Circle>
                </DivIcon>
                <DivSummary>
                  <DivNumbers>
                    <AnimatedNumber value={totalCompaniesCount} formatValue={this.formatValue} />
                  </DivNumbers>
                  <DivTotalText>
                    <FormattedMessage id='dashboard.totalCompanies.title' defaultMessage='Total Companies' />
                  </DivTotalText>
                </DivSummary>
              </RectangleSummaryHeader>
              {/* div for average data or show detail*/}
              {false && (
                <RectangleSummaryBottom>
                  <DivTotalTextBottom>
                    <b>246</b> avg users per company
                  </DivTotalTextBottom>
                  <ButtonViewAll type='button'>View all</ButtonViewAll>
                </RectangleSummaryBottom>
              )}
              {/* div for average data or show detail*/}
            </RectangleSummary>
            <RectangleSummary>
              <RectangleSummaryHeader>
                <DivIcon>
                  <Circle style={{ backgroundColor: '#84c225', border: 'solid 5px rgb(232, 255, 197)' }}>
                    <Package />
                  </Circle>
                </DivIcon>
                <DivSummary>
                  <DivNumbers>
                    <AnimatedNumber value={totalCompanyProductsCount} formatValue={this.formatValue} />
                  </DivNumbers>
                  <DivTotalText>
                    <FormattedMessage id='dashboard.totalProducts.title' defaultMessage='Total Products' />
                  </DivTotalText>
                </DivSummary>
              </RectangleSummaryHeader>
            </RectangleSummary>
            <RectangleSummary>
              <RectangleSummaryHeader>
                <DivIcon>
                  <Circle style={{ backgroundColor: '#f16844', border: 'solid 5px rgb(255, 233, 227)' }}>
                    <User />
                  </Circle>
                </DivIcon>
                <DivSummary>
                  <DivNumbers>
                    <AnimatedNumber value={totalCompaniesCount} formatValue={this.formatValue} />
                  </DivNumbers>
                  <DivTotalText>
                    <FormattedMessage id='dashboard.totalUsersCount.title' defaultMessage='Total Users Count' />
                  </DivTotalText>
                </DivSummary>
              </RectangleSummaryHeader>
            </RectangleSummary>
            <RectangleSummary>
              <RectangleSummaryHeader>
                <DivIcon>
                  <Circle style={{ backgroundColor: '#ffc65d', border: 'solid 5px rgb(255, 232, 190)' }}>
                    <DollarSign />
                  </Circle>
                </DivIcon>
                <DivSummary>
                  <DivNumbers>
                    <AnimatedNumber value={totalProductOffersValue} formatValue={this.formatValue} />
                  </DivNumbers>
                  <DivTotalText>
                    <FormattedMessage id='dashboard.totalValue.title' defaultMessage='Total Products Value $M' />
                  </DivTotalText>
                </DivSummary>
              </RectangleSummaryHeader>
            </RectangleSummary>
            <RectangleLastSummary>
              <RectangleSummaryHeader>
                <DivIcon>
                  <Circle style={{ backgroundColor: '#4cc3da', border: 'solid 5px rgb(224, 250, 255)' }}>
                    <DollarSign />
                  </Circle>
                </DivIcon>
                <DivSummary>
                  <DivNumbers>
                    <AnimatedNumber value={totalBroadcastedProductOffersValue} formatValue={this.formatValue} />
                  </DivNumbers>
                  <DivTotalText>
                    <FormattedMessage
                      id='dashboard.totalBroadcastedValue.title'
                      defaultMessage='Total Broadcasted Value $M'
                    />
                  </DivTotalText>
                </DivSummary>
              </RectangleSummaryHeader>
            </RectangleLastSummary>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={5}>
            <PieGraph
              innerRadius='30%'
              valueLegend='users'
              data={top4CompaniesByUsers}
              title='COMPANIES BY USERS'
              titleId='dasboard.companiesUsers.title'
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <PieGraph
              innerRadius='30%'
              data={top4CompaniesByCompanyProducts}
              title='COMPANIES BY PRODUCTS'
              titleId='dasboard.companiesProducts.title'
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <PieGraph
              innerRadius='30%'
              isCurrency={true}
              valueLegend='/year'
              data={top4CompaniesBySalesInLastYear}
              title='COMPANIES BY TRANSACTIONS'
              titleId='dasboard.companiesTransactions.title'
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={5}>
            <PieGraph
              innerRadius='30%'
              valueLegend='users'
              data={top4CompanyProductsByQuantitySales}
              title='PRODUCTS BY QUANTITY'
              titleId='dasboard.productsQuantity.title'
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <PieGraph
              innerRadius='30%'
              data={top4CompanyProductsByValueSales}
              title='PRODUCTS BY VALUE'
              titleId='dasboard.productsValue.title'
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <PieGraph
              innerRadius='30%'
              isCurrency={true}
              data={top4ProductGroups}
              title='POPULAR PRODUCTS'
              titleId='dasboard.productsPopular.title'
            />
          </Grid.Column>
        </Grid.Row>
      </CustomGrid>
    )
  }
}

Dashboard.propTypes = {
  totalCompaniesCount: number,
  top10ProductGroups: array,
  top10CompaniesByUsers: array,
  top10CompaniesByCompanyProducts: array,
  top10CompaniesBySalesInLastYear: array,
  top10CompanyProductsByQuantitySales: array,
  top10CompanyProductsByValueSales: array,
  totalUsersCount: array,
  companySumOfPurchasesMonthly: array,
  companySumOfSalesMonthly: array
}

Dashboard.defaultProps = {
  totalCompaniesCount: 0,
  top10ProductGroups: [],
  top10ProductGroups: [],
  top10CompaniesByCompanyProducts: [],
  top10CompaniesBySalesInLastYear: [],
  top10CompanyProductsByQuantitySales: [],
  top10CompanyProductsByValueSales: [],
  companySumOfPurchasesMonthly: [],
  companySumOfSalesMonthly: [],
  totalUsersCount: 0
}

export default injectIntl(Dashboard)
