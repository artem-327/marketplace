import React, { Component } from 'react'
import { number, array, bool } from 'prop-types'
import { injectIntl } from 'react-intl'
import { Menu, Grid, Tab, Popup, Input, Dropdown, Button } from 'semantic-ui-react'
import { Package, DollarSign, User, Layers, Coffee, Globe, Activity, BarChart2 } from 'react-feather'
//components
import { getSafe } from '~/utils/functions'
import PieGraph from './PieGraph'
import LineGraph from './LineGraph'
import BarGraph from './BarGraph'
import SummaryRectangle from './SummaryRectangle'
//styled
import styled from 'styled-components'
import moment from 'moment'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { currency } from '~/constants/index'

const CustomGrid = styled(Grid)`
  flex-shrink: 0;
  margin: 15px !important;
`

const UpperCaseText = styled.div`
  text-transform: uppercase;
`

const DivContainerGraph = styled.div`
  //width: 100%;
  height: 580px;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;

  [class*='LineGraph'] {
    min-height: 479px;

    [class*='LineGraph'] {
      min-height: 0;
    }
  }
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

const Select = styled.div`
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  width: auto;
  height: 40px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 0 37px 0 14px;
  background: #ffffff;
  font-size: 14px;
  color: #848893;
  line-height: 38px;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    top: 12px;
    right: 14px;
    transform: rotate(-45deg);
    display: block;
    width: 10px;
    height: 10px;
    border-width: 0 0 2px 2px;
    border-style: solid;
    border-color: #dee2e6;
  }

  &:hover:after {
    border-color: #2599d5;
  }
`

const DateGrid = styled(Grid)`
  box-sizing: border-box;
  min-width: 710px;
  max-width: 710px;
  padding: 20px;
`

const QuickFilter = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  margin-bottom: 2px;
  border-radius: 4px;
  padding: 0 20px;
  background: #eff1f5;
  font-size: 13px;
  color: #222222;
  line-height: 40px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover,
  &.active {
    background: #2599d5;
    color: #ffffff;
  }
`

const StyledCalendar = styled(Calendar)`
  /* Calendar.css */
  &.react-calendar {
    width: 350px;
    max-width: 100%;
    background: white;
    border: 1px solid #a0a096;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }
  &.react-calendar--doubleView {
    width: 700px;
  }
  &.react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  &.react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }
  &.react-calendar,
  &.react-calendar *,
  &.react-calendar *:before,
  &.react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  &.react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  &.react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    height: 44px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
  .react-calendar__month-view__weekNumbers {
    font-weight: bold;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
  }
  .react-calendar__month-view__days__day--weekend {
    color: #d10000;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    text-align: center;
    padding: 0.75em 0.5em;
    background: none;
  }
  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__tile--now {
    background: #ffff76;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ffffa9;
  }
  .react-calendar__tile--hasActive {
    background: #76baff;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
  }
  .react-calendar__tile--active {
    background: #006edc;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #1087ff;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }
  /* End of Calendar.css */

  &.react-calendar {
    border: 0 none;

    abbr[title] {
      text-transform: capitalize;
      text-decoration: none;
      font-size: 13px;
      font-weight: 700;
    }

    button {
      width: 32px;
      height: 32px;
      padding: 0;
      text-align: center;
      font-size: 13px;
      line-height: 32px;

      &:hover,
      &:focus {
        border-radius: 4px;
        box-shadow: inset 0 0 0 16px #2599d9;
        color: #ffffff;
      }
    }
  }

  .react-calendar__navigation {
    height: 32px;
    margin: 24px 0 0;

    button {
      min-width: 32px;

      &.react-calendar__navigation__prev2-button,
      &.react-calendar__navigation__next2-button {
        display: none !important;
      }

      &.react-calendar__navigation__prev-button,
      &.react-calendar__navigation__next-button {
        position: relative;
        overflow: hidden;
        display: block;
        text-align: left;
        text-indent: -5000px;

        &:after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform-origin: 50% 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          display: block;
          box-sizing: border-box;
          width: 11px;
          height: 11px;
          border-style: solid;
          border-color: #222222;
        }

        &:hover:after {
          border-color: #ffffff;
        }
      }

      &.react-calendar__navigation__prev-button:after {
        margin-left: 2px;
        border-width: 2px 0 0 2px;
      }

      &.react-calendar__navigation__next-button:after {
        margin-left: -2px;
        border-width: 0 2px 2px 0;
      }

      .react-calendar__navigation__label__labelText--from,
      .react-calendar__navigation__label__labelText--to {
        width: 160px;
        height: 32px;
        border-radius: 4px;
        text-align: center;
        font-size: 13px;
        font-weight: 700;
        color: #222222;
        line-height: 32px;
      }

      .react-calendar__navigation__label__labelText--from {
        float: left;
      }

      .react-calendar__navigation__label__labelText--to {
        float: right;
      }

      &.react-calendar__navigation__label {
        &:focus {
          background: transparent;
          box-shadow: 0 0 0 0 transparent;
          color: #222222;

          .react-calendar__navigation__label__labelText--from,
          .react-calendar__navigation__label__labelText--to {
            background-color: transparent;
            color: #222222;
          }
        }

        &:hover {
          background: transparent;
          box-shadow: 0 0 0 0 transparent;
          color: #222222;

          .react-calendar__navigation__label__labelText--from,
          .react-calendar__navigation__label__labelText--to {
            background-color: #2599d9;
            color: #ffffff;
          }
        }
      }
    }
  }

  .react-calendar__month-view {
    width: 224px !important;

    + .react-calendar__month-view {
      margin-left: auto;
    }
  }

  .react-calendar__month-view__weekdays__weekday {
    width: 32px;
    height: 32px;
    padding: 0;
    text-align: center;
    font-size: 13px;
    font-weight: 700;
    color: #222222;
    line-height: 32px;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #222222;
  }

  .react-calendar__tile--now {
    &,
    &.react-calendar__tile--hover {
      background: transparent;
    }
  }

  &.react-calendar--selectRange {
    .react-calendar__tile--now {
      &.react-calendar__tile--hover {
        background: #e6e6e6;
      }
    }
  }

  .react-calendar__tile--range,
  .react-calendar__tile--active {
    background: #eff1f5;
    color: #222222;
  }

  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd {
    border-radius: 4px;
    background-clip: border-box;
    background: #eff1f5;
    box-shadow: inset 0 0 0 16px #2599d9;
    font-weight: 700;
    color: #ffffff;
  }
`

const StatsTypeSelect = styled(Dropdown)` 
  > .menu {
    > .item {
      border: none !important;
      margin: 0 !important;
    }
  }
`

const StyledTab = styled(Tab)`
  & > .ui.pointing.secondary.menu {
    min-height: 50px !important;
    margin: 0 -20px !important;
    padding: 0 5px 0 20px !important;
  }
`

const RightChartControl = styled.div`
  display: flex;
  margin: auto;
  margin-right: 0;
  height: 40px;
`

const GraphTypeSwitch = styled.div`
  display: inline-block;
  margin: auto 10px;

  .ui.button {
    height: 32px;
    min-width: 32px;
    padding: 6px !important;
    text-align: center;
  }
 
  &.line-graph {
    .ui.left.button {
      background-color: #2599d5;
      border: solid 1px #2599d5;
      > svg {
        color: #ffffff;
      }
    }
    .ui.right.button {
      border: solid 1px #dee2e6;
      background-color: #ffffff;
      > svg {
        color: #20273a;
      }
    }
  }
  &.bar-graph {
    .ui.left.button {
      border: solid 1px #dee2e6;
      background-color: #ffffff;
      > svg {
        color: #20273a;
      }
    }
    .ui.right.button {
      background-color: #2599d5;
      border: solid 1px #2599d5;
      > svg {
        color: #ffffff;
      }
    }
  }
`

class Dashboard extends Component {
  state = {
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
  }

  componentDidMount() {
    this.setDateRange(0)
  }

  filterQuickDate = type => {
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

    this.filterDates(type, [dateFrom, dateTo])
  }

  filterDates = (type, dates) => {
    const { isAdmin, takeover } = this.props
    // get daily stats data
    this.props.getDashboardData(
      moment(dates[0]).format('YYYY-MM-DD') + 'T00%3A00%3A00Z'
    )
    this.setState({
      activeTab: isAdmin && !takeover ? 1 : 2,
      activeQuick: type,
      dateFrom: dates[0],
      dateFromEdited: null,
      dateTo: dates[1],
      dateToEdited: null,
      selectedDate: moment(dates[0]).format('D MMM YYYY') + ' - ' + moment(dates[1]).format('D MMM YYYY')
    })
  }

  setDateRange = value => {
    const { isAdmin, takeover, getDashboardData, getDailyStatistics } = this.props
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
      getDashboardData(
        moment(dateFrom).format('YYYY-MM-DD') + 'T00%3A00%3A00Z'
      )
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
    this.setState({ dateRangeSelected: value })
  }

  graphTypeSwitch = () => {
    const { graphType } = this.state
    return (
      <GraphTypeSwitch className={graphType ? 'bar-graph' : 'line-graph'}>
        <Button
          attached='left'
          onClick={() => this.setState({ graphType: 0 })}
          data-test='dashboard_stats_line_graph_type_btn'>
            <Activity size={20} />
        </Button>
        <Button
          attached='right'
          onClick={() => this.setState({ graphType: 1 })}
          data-test='dashboard_stats_bar_graph_type_btn'>
            <BarChart2 size={20} />
        </Button>
      </GraphTypeSwitch>
    )
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
      productOffers,
      companySumOfPurchasesMonthly,
      companySumOfSalesMonthly,
      top10Buyers,
      isAdmin,
      takeover,
      isClientCompany,
      dailyStats,
      intl: { formatMessage }
    } = this.props

    const statsTabs = {
      companyGenericProductsCount: [
        formatMessage({ id: 'dashboard.companyGenericProductsCount', defaultMessage: '# of Company Generic Products' }),
        false
      ],
      clientCompaniesCount: [
        formatMessage({ id: 'dashboard.guestCompaniesCount', defaultMessage: '# of Guest Companies' }),
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
      },
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
    } = this.state

    const adminMenuTabs = [
      {
        menuItem: (
          <Menu.Item key='sales' onClick={() => this.setState({ activeTab: 0 })}>
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
          <Menu.Item key='stats' onClick={() => this.setState({ activeTab: 1 })}>
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
                  onChange={(e, { value }) => this.setState({ statsType: value })}
                  value={!statsType ? Object.entries(statsTabs)[0][0] : statsType}
                  data-test='dashboard_stats_drpdn'
                />
                <StatsTypeSelect
                  key='dateRangeSelect'
                  style={{ minWidth: '150px' }}
                  selection
                  options={dateRangeOptions}
                  onChange={(e, { value }) => this.setDateRange(value)}
                  value={dateRangeSelected}
                  data-test='dashboard_date_range_select_drpdn'
                />
              </>
            ) : null}
            {this.graphTypeSwitch()}
          </RightChartControl>
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
          <Menu.Item key='company-purchases' onClick={() => this.setState({ activeTab: 1 })}>
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
                onChange={(e, { value }) => this.setState({ statsType: value })}
                value={!statsType ? Object.entries(statsTabs)[0][0] : statsType}
                data-test='dashboard_stats_drpdn'
              />
            ) : null}
            <StatsTypeSelect
              key='dateRangeSelect'
              style={{ minWidth: '150px' }}
              selection
              options={dateRangeOptions}
              onChange={(e, { value }) => this.setDateRange(value)}
              value={dateRangeSelected}
              data-test='dashboard_date_range_select_drpdn'
            />
            {this.graphTypeSwitch()}
          </RightChartControl>
        )
      }
    ]

    const companyPurchasesTab = [
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
                onChange={(e, { value }) => this.setState({ statsType: value })}
                value={!statsType ? Object.entries(statsTabs)[0][0] : statsType}
                data-test='dashboard_stats_drpdn'
              />
            ) : null}
            <StatsTypeSelect
              key='dateRangeSelect'
              style={{ minWidth: '150px' }}
              selection
              options={dateRangeOptions}
              onChange={(e, { value }) => this.setDateRange(value)}
              value={dateRangeSelected}
              data-test='dashboard_date_range_select_drpdn'
            />
            {this.graphTypeSwitch()}
          </RightChartControl>
        )
      }
    ]

    const panes =
      isAdmin && !takeover ? adminMenuTabs : isClientCompany ? companyPurchasesTab : companySalesPurchasesTabs

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
          <Grid.Column width={16}>
            {false && isAdmin && !takeover && /* #35120 - currently not used */(
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
                                      this.setState({ dateFrom: newDate, dateFromEdited: null })
                                    } else {
                                      this.setState({ dateFromEdited: null })
                                      this.filterDates(0, [newDate, dateTo])
                                    }
                                  } else {
                                    this.setState({ dateFromEdited: value })
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
                                      this.setState({ dateTo: newDate, dateToEdited: null })
                                    } else {
                                      this.setState({ dateToEdited: null })
                                      this.filterDates(0, [dateFrom, newDate])
                                    }
                                  } else {
                                    this.setState({ dateToEdited: value })
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
                          onChange={dates => this.filterDates(0, dates)}
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
                            onClick={() => this.filterQuickDate(++index)}>
                            {item}
                          </QuickFilter>
                        ))}
                      </Grid.Column>
                    </Grid.Row>
                  </DateGrid>
                }
              />
            )}
          </Grid.Column>
        </Grid.Row>

        {isClientCompany && (
          <Grid.Row>
            <Grid.Column width={5}>
              <SummaryRectangle
                onClickUrl={'/settings/users'}
                icon={<User />}
                data={usersCount}
                title='Users'
                titleId='dashboard.totalUsersCount.title'
                styleCircle={{ backgroundColor: '#84c225', border: 'solid 5px rgb(230, 243, 211)' }}
              />
            </Grid.Column>
          </Grid.Row>
        )}

        {isAdmin && !takeover && (
          <>
            <Grid.Row style={{ paddingBottom: '6px' }}>
              <Grid.Column width={5}>
                <SummaryRectangle
                  onClickUrl={isAdmin && !takeover ? '/companies/companies' : '/manage-guests/guests'}
                  icon={<Coffee />}
                  data={companiesCount}
                  title={isAdmin && !takeover ? 'Companies' : 'Guests'}
                  titleId={
                    isAdmin && !takeover ? 'dashboard.totalCompanies.title' : 'dashboard.totalGuestCompanies.title'
                  }
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

        {!isAdmin && !isClientCompany && (
          <>
            <Grid.Row style={{ paddingBottom: '6px' }}>
              <Grid.Column width={5}>
                <SummaryRectangle
                  onClickUrl={'/manage-guests/guests'}
                  icon={<Coffee />}
                  data={companiesCount}
                  title={'Guest'}
                  titleId={'dashboard.totalGuestCompanies.title'}
                  styleCircle={{ backgroundColor: '#2599d5', border: 'solid 5px rgb(211, 235, 247)' }}
                />
              </Grid.Column>
              <Grid.Column width={5}>
                <SummaryRectangle
                  onClickUrl={'/inventory/my-products'}
                  icon={<Package />}
                  data={companyProductsCount}
                  title='Products'
                  titleId='dashboard.totalProducts.title'
                  styleCircle={{ backgroundColor: '#ffc65d', border: 'solid 5px rgb(255, 244, 222)' }}
                />
              </Grid.Column>
              <Grid.Column width={5}>
                <SummaryRectangle
                  onClickUrl={'/inventory/my-listings'}
                  icon={<Layers />}
                  data={productOffersValue && Math.round(productOffersValue)}
                  title={isAdmin && !takeover ? 'Inventory' : 'Inventory'}
                  titleId={
                    isAdmin && !takeover
                      ? 'dashboard.totalValueWithoutMilion.title'
                      : 'dashboard.totalInventoryCount.title'
                  }
                  styleCircle={{ backgroundColor: '#96d3b7', border: 'solid 5px rgb(234, 246, 241)' }}
                  style='currency'
                  currency={currency}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={5}>
                <SummaryRectangle
                  onClickUrl={'/settings/users'}
                  icon={<User />}
                  data={usersCount}
                  title='Users'
                  titleId='dashboard.totalUsersCount.title'
                  styleCircle={{ backgroundColor: '#84c225', border: 'solid 5px rgb(230, 243, 211)' }}
                />
              </Grid.Column>
              <Grid.Column width={5}>
                <SummaryRectangle
                  onClickUrl={'/inventory/my-listings'}
                  icon={<Globe />}
                  data={productOffers}
                  title='Product Offers'
                  titleId='dashboard.totalProductOffers.title'
                  styleCircle={{ backgroundColor: '#4cc3da', border: 'solid 5px rgb(219, 243, 248)' }}
                />
              </Grid.Column>
              <Grid.Column width={5}>
                <SummaryRectangle
                  onClickUrl={isAdmin && !takeover ? '' : '/marketplace/listings'}
                  icon={<DollarSign />}
                  data={broadcastedProductOffersValue && Math.round(broadcastedProductOffersValue)}
                  title={isAdmin && !takeover ? 'Broadcasted' : 'Sales'}
                  titleId={
                    isAdmin && !takeover
                      ? 'dashboard.totalBroadcastedValueWithoutMilion.title'
                      : 'dashboard.totalSales.title'
                  }
                  styleCircle={{ backgroundColor: '#f16844', border: 'solid 5px rgb(252, 225, 218)' }}
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
                activeIndex={this.state.activeTab}
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

        {(!isAdmin && !isClientCompany) || takeover ? (
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
                <PieGraph
                  data={top10Buyers}
                  title='TOP 5 BUYERS'
                  titleId='dasboard.topBuyers.title'
                />
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
  isClientCompany: bool
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
  isClientCompany: false
}

export default injectIntl(Dashboard)
