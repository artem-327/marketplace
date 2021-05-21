import { useEffect, useState } from 'react'
import { number, array, bool } from 'prop-types'
import { injectIntl } from 'react-intl'
import { Menu, Grid, Popup, Input, Button, Image } from 'semantic-ui-react'
import { Package, DollarSign, User, Layers, Coffee, Activity, BarChart2 } from 'react-feather'
//components
import PieGraph from './PieGraph'
import LineGraph from './LineGraph'
import BarGraph from './BarGraph'
import SummaryRectangle from './SummaryRectangle'
import PartnersIcon from '../../../assets/images/dashboard/partners.svg'
import UsersIcon from '../../../assets/images/dashboard/users.svg'
import ProductOrdersIcon from '../../../assets/images/dashboard/product_orders.svg'
import InventoryIcon from '../../../assets/images/dashboard/inventory.svg'
import SalesIcon from '../../../assets/images/dashboard/sales.svg'
import ProductsIcon from '../../../assets/images/dashboard/products.svg'
//styles
import moment from 'moment'
import 'react-calendar/dist/Calendar.css'
import { currency } from '../../../constants'
import Tutorial from '../../tutorial/Tutorial'
import {
  CustomGrid,
  UpperCaseText,
  DivContainerGraph,
  TabPane,
  Select,
  DateGrid,
  QuickFilter,
  StyledCalendar,
  StatsTypeSelect,
  StyledTab,
  RightChartControl,
  GraphTypeSwitch
} from '../styles'


const Dashboard = props => {
  const [state, setState] = useState({
    activeTab: 0,
    activeQuick: 0,
    dateFrom: null,
    dateFromEdited: null,
    dateTo: null,
    dateToEdited: null,
    selectedDate: null,
    statsType: null,
    dateRangeSelected: 0,
    graphType: 0
  })

  useEffect(() => {
    setDateRange(0)
  }, [])

  const filterQuickDate = type => {
    let dateFrom,
      dateTo = null

    switch (type) {
      case 1:
        dateFrom = moment().startOf('day').subtract(1, 'day')
        dateTo = moment().endOf('day').subtract(1, 'day')
        break
      case 2:
        dateFrom = moment().startOf('week')
        dateTo = moment().endOf('week')
        break
      case 3:
        dateFrom = moment().startOf('week').subtract(1, 'weeks')
        dateTo = moment().endOf('week').subtract(1, 'weeks')
        break
      case 4:
        dateFrom = moment().startOf('month')
        dateTo = moment().endOf('month')
        break
      case 5:
        dateFrom = moment().startOf('month').subtract(1, 'months')
        dateTo = moment().endOf('month').subtract(1, 'months')
        break
      case 6:
        dateFrom = moment().startOf('year')
        dateTo = moment().endOf('year')
        break
      case 7:
        dateFrom = moment().startOf('year').subtract(1, 'years')
        dateTo = moment().endOf('year').subtract(1, 'years')
        break
      case 8:
      default:
        dateFrom = moment('01/01/2020', 'DD/MM/YYYY')
        dateTo = moment()
        break
    }

    filterDates(type, [dateFrom, dateTo])
  }

  const filterDates = (type, dates) => {
    const { isAdmin, takeover } = props
    // get daily stats data
    props.getDashboardData(moment(dates[0]).format('YYYY-MM-DD') + 'T00%3A00%3A00Z')
    setState({
      ...state,
      activeTab: isAdmin && !takeover ? 1 : 2,
      activeQuick: type,
      dateFrom: dates[0],
      dateFromEdited: null,
      dateTo: dates[1],
      dateToEdited: null,
      selectedDate: moment(dates[0]).format('D MMM YYYY') + ' - ' + moment(dates[1]).format('D MMM YYYY')
    })
  }

  const setDateRange = value => {
    const { isAdmin, takeover, getDashboardData, getDailyStatistics } = props
    let dateFrom,
      dateTo = null

    switch (value) {
      case 0: // Max
        dateFrom = moment('01/01/2020', 'DD/MM/YYYY')
        dateTo = moment()
        break

      case 1: // 1 year
        dateFrom = moment().subtract(1, 'years')
        dateTo = moment()
        break

      case 2: // YTD
        dateFrom = moment().startOf('year')
        dateTo = moment()
        break

      case 3: // 6 months
        dateFrom = moment().subtract(6, 'months')
        dateTo = moment()
        break

      case 4: // 3 months
        dateFrom = moment().subtract(3, 'months')
        dateTo = moment()
        break

      case 5: // 1 month
      default:
        dateFrom = moment().subtract(1, 'months')
        dateTo = moment()
        break
    }

    try {
      getDashboardData(moment(dateFrom).format('YYYY-MM-DD') + 'T00%3A00%3A00Z')
    } catch (error) {
      console.error(error)
    }

    if (isAdmin && !takeover) {
      try {
        getDailyStatistics(
          moment(dateFrom).format('YYYY-MM-DD') + 'T00:00:00Z',
          moment(dateTo).add(1, 'days').format('YYYY-MM-DD') + 'T00:00:00Z'
        )
      } catch (error) {
        console.error(error)
      }
    }
    setState({ ...state, dateRangeSelected: value })
  }

  const graphTypeSwitch = () => {
    const { graphType } = state
    return (
      <GraphTypeSwitch className={graphType ? 'bar-graph' : 'line-graph'}>
        <Button
          attached='left'
          onClick={() => setState({ ...state, graphType: 0 })}
          data-test='dashboard_stats_line_graph_type_btn'>
          <Activity size={20} />
        </Button>
        <Button
          attached='right'
          onClick={() => setState({ ...state, graphType: 1 })}
          data-test='dashboard_stats_bar_graph_type_btn'>
          <BarChart2 size={20} />
        </Button>
      </GraphTypeSwitch>
    )
  }

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
    productOffers,
    companySumOfPurchasesMonthly,
    companySumOfSalesMonthly,
    top10Buyers,
    isAdmin,
    takeover,
    dailyStats,
    totalCompanyPartners,
    intl: { formatMessage }
  } = props

  const statsTabs = {
    companyGenericProductsCount: [
      formatMessage({ id: 'dashboard.companyGenericProductsCount', defaultMessage: '# of Company Generic Products' }),
      false
    ],
    companiesCount: [formatMessage({ id: 'dashboard.companiesCount', defaultMessage: '# of Companies' }), false],
    //productOfferCount: [formatMessage({id: 'dashboard.productOffersCount', defaultMessage: '# of Product Offers'}), false],
    usersCount: [formatMessage({ id: 'dashboard.usersCount', defaultMessage: '# of Users' }), false],
    sales: [formatMessage({ id: 'dashboard.sales', defaultMessage: 'Sales' }), false],
    totalProductOfferValue: [
      formatMessage({ id: 'dashboard.totalPOValue', defaultMessage: 'Total Product Offer Value' }),
      true
    ],
    totalValueOfBroadcastedProductOffers: [
      formatMessage({
        id: 'dashboard.totalValueBroadcastedPO',
        defaultMessage: 'Total Value of Broadcasted Product Offers'
      }),
      true
    ]
  }

  const dateRangeOptions = [
    {
      value: 0,
      text: formatMessage({ id: 'dashboard.dateFilter.max', defaultMessage: 'Max' })
    },
    {
      value: 1,
      text: formatMessage({ id: 'dashboard.dateFilter.1year', defaultMessage: '1 year' })
    },
    {
      value: 2,
      text: formatMessage({ id: 'dashboard.dateFilter.ytd', defaultMessage: 'YTD' })
    },
    {
      value: 3,
      text: formatMessage({ id: 'dashboard.dateFilter.6months', defaultMessage: '6 months' })
    },
    {
      value: 4,
      text: formatMessage({ id: 'dashboard.dateFilter.3months', defaultMessage: '3 months' })
    },
    {
      value: 5,
      text: formatMessage({ id: 'dashboard.dateFilter.1month', defaultMessage: '1 month' })
    }
  ]

  let stats = []
  if (dailyStats && dailyStats.length) {
    stats = dailyStats.map(day => {
      let dayStats = {}
      Object.entries(statsTabs).forEach(statsTab => {
        dayStats[statsTab[1][0]] = statsTab[1][1] ? day[statsTab[0]] / 1000 : day[statsTab[0]]
      })

      return {
        name: moment(day.createdAt).format('D MMM'),
        ...dayStats
      }
    })
  }

  const {
    activeTab,
    activeQuick,
    dateFrom,
    dateFromEdited,
    dateTo,
    dateToEdited,
    selectedDate,
    statsType,
    dateRangeSelected,
    graphType
  } = state

  const adminMenuTabs = [
    {
      menuItem: (
        <Menu.Item key='sales' onClick={() => setState({ ...state, activeTab: 0 })}>
          <UpperCaseText>{formatMessage({ id: 'dasboard.sales', defaultMessage: 'SALES' })}</UpperCaseText>
        </Menu.Item>
      ),
      render: () => (
        <TabPane key='sales' attached={false}>
          {graphType === 0 ? (
            <LineGraph
              data={totalSumOfSalesMonthly}
              title='Total Sum Of Sales Monthly'
              titleId='dasboard.sales.graph.title'
              subTitle='in thousand dollars'
              subTitleId='dasboard.sales.graph.subtitle'
            />
          ) : (
            <BarGraph
              data={totalSumOfSalesMonthly}
              title='Total Sum Of Sales Monthly'
              titleId='dasboard.sales.graph.title'
              subTitle='in thousand dollars'
              subTitleId='dasboard.sales.graph.subtitle'
            />
          )}
        </TabPane>
      )
    },
    {
      menuItem: (
        <Menu.Item key='stats' onClick={() => setState({ ...state, activeTab: 1 })}>
          <UpperCaseText>
            {formatMessage({ id: 'dashboard.dailyStats', defaultMessage: 'DAILY STATS' })}
          </UpperCaseText>
        </Menu.Item>
      ),
      render: () => (
        <TabPane key='stats' attached={false}>
          {graphType === 0 ? (
            <LineGraph
              data={stats}
              dataKey={statsType ? statsTabs[statsType][0] : Object.entries(statsTabs)[0][1][0]}
              isCurrency={statsType ? statsTabs[statsType][1] : false}
              unitsCurrency={1}
              title='Daily Statistics'
              titleId='dashboard.daily.stats.title'
              subTitle=''
              subTitleId=''
            />
          ) : (
            <BarGraph
              data={stats}
              dataKey={statsType ? statsTabs[statsType][0] : Object.entries(statsTabs)[0][1][0]}
              isCurrency={statsType ? statsTabs[statsType][1] : false}
              unitsCurrency={1}
              title='Total Sum Of Sales Monthly'
              titleId='dasboard.sales.graph.title'
              subTitle='in thousand dollars'
              subTitleId='dasboard.sales.graph.subtitle'
            />
          )}
        </TabPane>
      )
    },
    {
      menuItem: (
        <RightChartControl>
          {activeTab === 1 ? (
            <>
              <StatsTypeSelect
                key='statsType'
                style={{ marginRight: '10px' }}
                selection
                options={Object.entries(statsTabs).map(stType => {
                  return { text: stType[1][0], value: stType[0] }
                })}
                onChange={(e, { value }) => setState({ ...state, statsType: value })}
                value={!statsType ? Object.entries(statsTabs)[0][0] : statsType}
                data-test='dashboard_stats_drpdn'
              />
              <StatsTypeSelect
                key='dateRangeSelect'
                style={{ minWidth: '150px' }}
                selection
                options={dateRangeOptions}
                onChange={(e, { value }) => setDateRange(value)}
                value={dateRangeSelected}
                data-test='dashboard_date_range_select_drpdn'
              />
            </>
          ) : null}
          {graphTypeSwitch()}
        </RightChartControl>
      )
    }
  ]

  const companySalesPurchasesTabs = [
    {
      menuItem: (
        <Menu.Item key='company-sales' onClick={() => setState({ ...state, activeTab: 0 })}>
          <UpperCaseText>
            {formatMessage({ id: 'dasboard.companySales', defaultMessage: 'COMPANY SALES' })}
          </UpperCaseText>
        </Menu.Item>
      ),
      render: () => (
        <TabPane key='company-sales' attached={false}>
          {graphType === 0 ? (
            <LineGraph
              data={companySumOfSalesMonthly}
              title='Company Sum Of Sales Monthly'
              titleId='dasboard.companySales.graph.title'
              subTitle='in thousand dollars'
              subTitleId='dasboard.sales.graph.subtitle'
            />
          ) : (
            <BarGraph
              data={companySumOfSalesMonthly}
              title='Company Sum Of Sales Monthly'
              titleId='dasboard.companySales.graph.title'
              subTitle='in thousand dollars'
              subTitleId='dasboard.sales.graph.subtitle'
            />
          )}
        </TabPane>
      )
    },
    {
      menuItem: (
        <Menu.Item key='company-purchases' onClick={() => setState({ ...state, activeTab: 1 })}>
          <UpperCaseText>
            {formatMessage({ id: 'dasboard.companyPurchase', defaultMessage: 'COMPANY PURCHASES' })}
          </UpperCaseText>
        </Menu.Item>
      ),
      render: () => (
        <TabPane key='company-purchases' attached={false}>
          {graphType === 0 ? (
            <LineGraph
              data={companySumOfPurchasesMonthly}
              title='Company Sum Of Sales Monthly'
              titleId='dasboard.companySales.graph.title'
              subTitle='in thousand dollars'
              subTitleId='dasboard.sales.graph.subtitle'
            />
          ) : (
            <BarGraph
              data={companySumOfPurchasesMonthly}
              title='Company Sum Of Sales Monthly'
              titleId='dasboard.companySales.graph.title'
              subTitle='in thousand dollars'
              subTitleId='dasboard.sales.graph.subtitle'
            />
          )}
        </TabPane>
      )
    },
    {
      menuItem: (
        <RightChartControl>
          {activeTab === 2 ? (
            <StatsTypeSelect
              key='statsType'
              style={{ marginRight: '10px' }}
              selection
              pointing='top right'
              options={Object.entries(statsTabs).map(stType => {
                return { text: stType[1][0], value: stType[0] }
              })}
              onChange={(e, { value }) => setState({ ...state, statsType: value })}
              value={!statsType ? Object.entries(statsTabs)[0][0] : statsType}
              data-test='dashboard_stats_drpdn'
            />
          ) : null}
          <StatsTypeSelect
            key='dateRangeSelect'
            style={{ minWidth: '150px' }}
            selection
            options={dateRangeOptions}
            onChange={(e, { value }) => setDateRange(value)}
            value={dateRangeSelected}
            data-test='dashboard_date_range_select_drpdn'
          />
          {graphTypeSwitch()}
        </RightChartControl>
      )
    }
  ]

  const companyPurchasesTab = [
    {
      menuItem: (
        <Menu.Item key='company-purchases' onClick={() => setState({ ...state, activeTab: 1 })}>
          <UpperCaseText>
            {formatMessage({ id: 'dasboard.companyPurchase', defaultMessage: 'COMPANY PURCHASES' })}
          </UpperCaseText>
        </Menu.Item>
      ),
      render: () => (
        <TabPane key='company-purchases' attached={false}>
          {graphType === 0 ? (
            <LineGraph
              data={companySumOfPurchasesMonthly}
              title='Company Sum Of Sales Monthly'
              titleId='dasboard.companySales.graph.title'
              subTitle='in thousand dollars'
              subTitleId='dasboard.sales.graph.subtitle'
            />
          ) : (
            <BarGraph
              data={companySumOfPurchasesMonthly}
              title='Company Sum Of Sales Monthly'
              titleId='dasboard.companySales.graph.title'
              subTitle='in thousand dollars'
              subTitleId='dasboard.sales.graph.subtitle'
            />
          )}
        </TabPane>
      )
    },
    {
      menuItem: (
        <RightChartControl>
          {activeTab === 2 ? (
            <StatsTypeSelect
              key='statsType'
              style={{ marginRight: '10px' }}
              selection
              pointing='top right'
              options={Object.entries(statsTabs).map(stType => {
                return { text: stType[1][0], value: stType[0] }
              })}
              onChange={(e, { value }) => setState({ ...state, statsType: value })}
              value={!statsType ? Object.entries(statsTabs)[0][0] : statsType}
              data-test='dashboard_stats_drpdn'
            />
          ) : null}
          <StatsTypeSelect
            key='dateRangeSelect'
            style={{ minWidth: '150px' }}
            selection
            options={dateRangeOptions}
            onChange={(e, { value }) => setDateRange(value)}
            value={dateRangeSelected}
            data-test='dashboard_date_range_select_drpdn'
          />
          {graphTypeSwitch()}
        </RightChartControl>
      )
    }
  ]

  const panes = isAdmin && !takeover ? adminMenuTabs : companySalesPurchasesTabs

  const quickFilters = [
    formatMessage({ id: 'dashboard.dateFilter.lastDay', defaultMessage: 'Last day' }),
    formatMessage({ id: 'dashboard.dateFilter.thisWeek', defaultMessage: 'This week' }),
    formatMessage({ id: 'dashboard.dateFilter.lastWeek', defaultMessage: 'Last week' }),
    formatMessage({ id: 'dashboard.dateFilter.thisMonth', defaultMessage: 'This month' }),
    formatMessage({ id: 'dashboard.dateFilter.lastMonth', defaultMessage: 'Last month' }),
    formatMessage({ id: 'dashboard.dateFilter.thisYear', defaultMessage: 'This year' }),
    formatMessage({ id: 'dashboard.dateFilter.lastYear', defaultMessage: 'Last year' }),
    formatMessage({ id: 'dashboard.dateFilter.allTime', defaultMessage: 'All the time' })
  ]

  return (
    <CustomGrid secondary='true' verticalAlign='middle' className='page-part'>
      <Grid.Row>
        <Grid.Column width={15}>
          <Tutorial marginDashboard isTutorial={false} isBusinessVerification={true} />
        </Grid.Column>
      </Grid.Row>

      {false && isAdmin && !takeover && (
        /* #35120 - currently not used */
        <Grid.Row>
          <Grid.Column width={16}>
            <Popup
              on='click'
              trigger={
                <Select>
                  {activeQuick > 0 ? quickFilters[activeQuick - 1] : selectedDate ? selectedDate : 'Select'}
                </Select>
              }
              position='bottom left'
              flowing
              pinned
              style={{ zIndex: 999 /* less than timeout modal */ }}
              content={
                <DateGrid>
                  <Grid.Row>
                    <Grid.Column width={12}>
                      <Grid>
                        <Grid.Row>
                          <Grid.Column width={8}>
                            <Input
                              placeholder={formatMessage({ id: 'global.dateFrom', defaultMessage: 'Date From' })}
                              inputProps={{ 'data-test': 'dashboard_date_from_input' }}
                              onChange={(e, { value }) => {
                                if (value.length === 10 && moment(value, 'DD/MM/YYYY', true).isValid()) {
                                  const newDate = moment(value, 'DD/MM/YYYY')
                                  if (newDate.isAfter(dateTo)) {
                                    setState({ ...state, dateFrom: newDate, dateFromEdited: null })
                                  } else {
                                    setState({ ...state, dateFromEdited: null })
                                    filterDates(0, [newDate, dateTo])
                                  }
                                } else {
                                  setState({ ...state, dateFromEdited: value })
                                }
                              }}
                              error={dateFromEdited ? true : moment(dateFrom).isAfter(dateTo) ? true : false}
                              name={'dateFrom'}
                              value={
                                dateFromEdited
                                  ? dateFromEdited
                                  : dateFrom
                                  ? moment(dateFrom, 'DD/MM/YYYY', true).isValid()
                                    ? moment(dateFrom, 'DD/MM/YYYY').format('DD/MM/YYYY')
                                    : moment(dateFrom).isValid()
                                    ? moment(dateFrom).format('DD/MM/YYYY')
                                    : null
                                  : null
                              }
                              fluid
                            />
                            {dateFromEdited ? (
                              <span className='sui-error-message' style={{ position: 'absolute' }}>
                                {formatMessage({
                                  id: 'dashboard.error.invalidDate',
                                  defaultMessage: 'Invalid Date'
                                })}
                              </span>
                            ) : moment(dateFrom).isAfter(dateTo) ? (
                              <span className='sui-error-message' style={{ position: 'absolute' }}>
                                {formatMessage({
                                  id: 'dashboard.error.invalidDateRange',
                                  defaultMessage: 'Invalid Date Range'
                                })}
                              </span>
                            ) : null}
                          </Grid.Column>
                          <Grid.Column width={8}>
                            <Input
                              placeholder={formatMessage({ id: 'global.dateTo', defaultMessage: 'Date To' })}
                              inputProps={{
                                'data-test': 'dashboard_date_to_input'
                              }}
                              onChange={(e, { value }) => {
                                if (value.length === 10 && moment(value, 'DD/MM/YYYY', true).isValid()) {
                                  const newDate = moment(value, 'DD/MM/YYYY')
                                  if (newDate.isBefore(dateFrom)) {
                                    setState({ ...state, dateTo: newDate, dateToEdited: null })
                                  } else {
                                    setState({ ...state, dateToEdited: null })
                                    filterDates(0, [dateFrom, newDate])
                                  }
                                } else {
                                  setState({ ...state, dateToEdited: value })
                                }
                              }}
                              error={dateToEdited ? true : moment(dateTo).isBefore(dateFrom) ? true : false}
                              name='dateTo'
                              value={
                                dateToEdited
                                  ? dateToEdited
                                  : dateTo
                                  ? moment(dateTo, 'DD/MM/YYYY', true).isValid()
                                    ? moment(dateTo, 'DD/MM/YYYY').format('DD/MM/YYYY')
                                    : moment(dateTo).isValid()
                                    ? moment(dateTo).format('DD/MM/YYYY')
                                    : null
                                  : null
                              }
                              fluid
                            />
                            {dateToEdited ? (
                              <span className='sui-error-message' style={{ position: 'absolute' }}>
                                {formatMessage({
                                  id: 'dashboard.error.invalidDate',
                                  defaultMessage: 'Invalid Date'
                                })}
                              </span>
                            ) : moment(dateTo).isBefore(dateFrom) ? (
                              <span className='sui-error-message' style={{ position: 'absolute' }}>
                                {formatMessage({
                                  id: 'dashboard.error.invalidDateRange',
                                  defaultMessage: 'Invalid Date Range'
                                })}
                              </span>
                            ) : null}
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                      <StyledCalendar
                        value={[dateFrom, dateTo]}
                        calendarType='US'
                        onChange={dates => filterDates(0, dates)}
                        formatShortWeekday={(locale, date) => moment(date).format('dd')}
                        showDoubleView={true}
                        selectRange={true}
                      />
                    </Grid.Column>
                    <Grid.Column width={4}>
                      {quickFilters.map((item, index) => (
                        <QuickFilter
                          key={index}
                          className={activeQuick === index + 1 ? 'active' : null}
                          onClick={() => filterQuickDate(++index)}>
                          {item}
                        </QuickFilter>
                      ))}
                    </Grid.Column>
                  </Grid.Row>
                </DateGrid>
              }
            />
          </Grid.Column>
        </Grid.Row>
      )}

      {isAdmin && !takeover && (
        <>
          <Grid.Row style={{ paddingBottom: '6px' }}>
            <Grid.Column width={5}>
              <SummaryRectangle
                onClickUrl={'/companies/companies'}
                icon={<Coffee />}
                data={companiesCount}
                title={'Companies'}
                titleId={'dashboard.totalCompanies.title'}
                styleCircle={{ backgroundColor: '#2599d5', border: 'solid 5px rgb(211, 235, 247)' }}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <SummaryRectangle
                onClickUrl={isAdmin && !takeover ? '/operations/company-product-catalog' : '/inventory/my-products'}
                icon={<Package />}
                data={companyProductsCount}
                title='Products'
                titleId='dashboard.totalProducts.title'
                styleCircle={{ backgroundColor: '#ffc65d', border: 'solid 5px rgb(255, 244, 222)' }}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <SummaryRectangle
                icon={<Layers />}
                data={productOffersValue && Math.round(productOffersValue)}
                title={'Total Inventory Count'}
                titleId={'dashboard.totalValueWithoutMilion.title'}
                styleCircle={{ backgroundColor: '#96d3b7', border: 'solid 5px rgb(234, 246, 241)' }}
                style='currency'
                currency={currency}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={5}>
              <SummaryRectangle
                onClickUrl={isAdmin && !takeover ? '/companies/users' : '/settings/users'}
                icon={<User />}
                data={usersCount}
                title='Users'
                titleId='dashboard.totalUsersCount.title'
                styleCircle={{ backgroundColor: '#84c225', border: 'solid 5px rgb(230, 243, 211)' }}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <SummaryRectangle
                icon={<DollarSign />}
                data={broadcastedProductOffersValue && Math.round(broadcastedProductOffersValue)}
                title={'Total Broadcasted Value'}
                titleId={'dashboard.totalBroadcastedValueWithoutMilion.title'}
                styleCircle={{ backgroundColor: '#f16844', border: 'solid 5px rgb(252, 225, 218)' }}
                style='currency'
                currency={currency}
              />
            </Grid.Column>
          </Grid.Row>
        </>
      )}

      {!isAdmin && (
        <>
          <Grid.Row style={{ paddingBottom: '6px' }}>
            <Grid.Column width={5}>
              <SummaryRectangle
                onClickUrl={'/my-network'}
                icon={<Image src={PartnersIcon} />}
                data={totalCompanyPartners}
                title={'Partners'}
                titleId={'dashboard.totalPartnersCompanies.title'}
                styleCircle={null}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <SummaryRectangle
                onClickUrl={'/inventory/my-products'}
                icon={<Image src={ProductsIcon} />}
                data={companyProductsCount}
                title='Products'
                titleId='dashboard.totalProducts.title'
                styleCircle={null}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <SummaryRectangle
                onClickUrl={'/inventory/my-listings'}
                icon={<Image src={InventoryIcon} />}
                data={productOffersValue && Math.round(productOffersValue)}
                title={isAdmin && !takeover ? 'Inventory' : 'Inventory'}
                titleId={
                  isAdmin && !takeover
                    ? 'dashboard.totalValueWithoutMilion.title'
                    : 'dashboard.totalInventoryCount.title'
                }
                styleCircle={null}
                style='currency'
                currency={currency}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={5}>
              <SummaryRectangle
                onClickUrl={'/settings/users'}
                icon={<Image src={UsersIcon} />}
                data={usersCount}
                title='Users'
                titleId='dashboard.totalUsersCount.title'
                styleCircle={null}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <SummaryRectangle
                onClickUrl={'/inventory/my-listings'}
                icon={<Image src={ProductOrdersIcon} />}
                data={productOffers}
                title='Product Offers'
                titleId='dashboard.totalProductOffers.title'
                styleCircle={null}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <SummaryRectangle
                onClickUrl={isAdmin && !takeover ? '' : '/marketplace/listings'}
                icon={<Image src={SalesIcon} />}
                data={broadcastedProductOffersValue && Math.round(broadcastedProductOffersValue)}
                title={isAdmin && !takeover ? 'Broadcasted' : 'Sales'}
                titleId={
                  isAdmin && !takeover
                    ? 'dashboard.totalBroadcastedValueWithoutMilion.title'
                    : 'dashboard.totalSales.title'
                }
                styleCircle={null}
                style='currency'
                currency={currency}
              />
            </Grid.Column>
          </Grid.Row>
        </>
      )}

      <Grid.Row>
        <Grid.Column width={15}>
          <DivContainerGraph>
            <StyledTab
              style={{ padding: '0 20px 0 20px' }}
              className='inventory-sidebar tab-menu flex stretched'
              menu={{ secondary: true, pointing: true }}
              activeIndex={state.activeTab}
              panes={panes}
            />
          </DivContainerGraph>
        </Grid.Column>
      </Grid.Row>

      {isAdmin && !takeover ? (
        <Grid.Row>
          <Grid.Column width={5}>
            <PieGraph
              valueLegend='users'
              data={top10CompaniesByUsers}
              title='COMPANIES BY USERS'
              titleId='dasboard.companiesUsers.title'
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <PieGraph
              data={top10CompaniesByCompanyProducts}
              title='COMPANIES BY PRODUCTS'
              titleId='dasboard.companiesProducts.title'
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <PieGraph
              isCurrency={true}
              valueLegend='/year'
              data={top10CompaniesBySalesInLastYear}
              title='COMPANIES BY TRANSACTIONS'
              titleId='dasboard.companiesTransactions.title'
            />
          </Grid.Column>
        </Grid.Row>
      ) : null}

      {false && (!isAdmin || takeover) /* 'false' added in task DT-271 */ ? (
        <Grid.Row>
          {top10CompanyProductsByQuantitySales && top10CompanyProductsByQuantitySales.length ? (
            <Grid.Column width={5}>
              <PieGraph
                data={top10CompanyProductsByQuantitySales}
                title='PRODUCTS BY QUANTITY'
                titleId='dasboard.productsQuantity.title'
              />
            </Grid.Column>
          ) : null}
          {top10CompanyProductsByValueSales && top10CompanyProductsByValueSales.length ? (
            <Grid.Column width={5}>
              <PieGraph
                isCurrency={true}
                data={top10CompanyProductsByValueSales}
                title='PRODUCTS BY VALUE'
                titleId='dasboard.productsValue.title'
              />
            </Grid.Column>
          ) : null}
          {top10Buyers && top10Buyers.length ? (
            <Grid.Column width={5}>
              <PieGraph data={top10Buyers} title='TOP 5 BUYERS' titleId='dasboard.topBuyers.title' />
            </Grid.Column>
          ) : null}
        </Grid.Row>
      ) : null}
      {isAdmin && !takeover ? (
        <Grid.Row>
          <Grid.Column width={5}>
            <PieGraph
              isCurrency={true}
              data={top10ProductGroups}
              title='POPULAR PRODUCTS'
              titleId='dasboard.productsPopular.title'
            />
          </Grid.Column>
        </Grid.Row>
      ) : null}
    </CustomGrid>
  )
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
  isAdmin: bool,
  takeover: bool,
  totalCompanyPartners: number
}

Dashboard.defaultProps = {
  companiesCount: 0,
  broadcastedProductOffersValue: 0,
  companyProductsCount: 0,
  productOffersValue: 0,
  usersCount: 0,
  top10ProductGroups: [],
  top10CompaniesByUsers: [],
  top10CompaniesByCompanyProducts: [],
  top10CompaniesBySalesInLastYear: [],
  top10CompanyProductsByQuantitySales: [],
  top10CompanyProductsByValueSales: [],
  companySumOfPurchasesMonthly: [],
  companySumOfSalesMonthly: [],
  top10Buyers: [],
  totalSumOfSalesMonthly: [],
  isAdmin: false,
  takeover: false,
  totalCompanyPartners: 0
}

export default injectIntl(Dashboard)
