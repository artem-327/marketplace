import { Activity, BarChart2 } from 'react-feather'
import moment from 'moment'
import { Menu, Button } from 'semantic-ui-react'
// Components
import LineGraph from './LineGraph'
import BarGraph from './BarGraph'
// Styles
import {
    UpperCaseText,
    TabPane,
    StatsTypeSelect,
    RightChartControl,
    GraphTypeSwitch
} from '../styles'



export const setDateRange = (value, props, state, setState) => {
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

export const filterDates = (type, dates, props, state, setState) => {
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

export const filterQuickDate = (type, props, state, setState) => {
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

    filterDates(type, [dateFrom, dateTo], props, state, setState)
}

const graphTypeSwitch = (state, setState) => {
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

export const statsTabs = formatMessage => ({
    companyGenericProductsCount: [
      formatMessage({ id: 'dashboard.companyGenericProductsCount', defaultMessage: '# of Company Generic Products' }),
      false
    ],
    companiesCount: [formatMessage({ id: 'dashboard.companiesCount', defaultMessage: '# of Companies' }), false],
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
})

const dateRangeOptions = formatMessage => ([
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
])

export const adminMenuTabs = (props, state, setState, formatMessage, stats) => ([
    {
      menuItem: (
        <Menu.Item key='sales' onClick={() => setState({ ...state, activeTab: 0 })}>
          <UpperCaseText>{formatMessage({ id: 'dasboard.sales', defaultMessage: 'SALES' })}</UpperCaseText>
        </Menu.Item>
      ),
      render: () => (
        <TabPane key='sales' attached={false}>
          {state.graphType === 0 ? (
            <LineGraph
              data={props.totalSumOfSalesMonthly}
              title='Total Sum Of Sales Monthly'
              titleId='dasboard.sales.graph.title'
              subTitle='in thousand dollars'
              subTitleId='dasboard.sales.graph.subtitle'
            />
          ) : (
            <BarGraph
              data={props.totalSumOfSalesMonthly}
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
          {state.graphType === 0 ? (
            <LineGraph
              data={stats}
              dataKey={state.statsType ? statsTabs(formatMessage)[state.statsType][0] : Object.entries(statsTabs(formatMessage))[0][1][0]}
              isCurrency={state.statsType ? statsTabs(formatMessage)[state.statsType][1] : false}
              unitsCurrency={1}
              title='Daily Statistics'
              titleId='dashboard.daily.stats.title'
              subTitle=''
              subTitleId=''
            />
          ) : (
            <BarGraph
              data={stats}
              dataKey={state.statsType ? statsTabs(formatMessage)[state.statsType][0] : Object.entries(statsTabs(formatMessage))[0][1][0]}
              isCurrency={state.statsType ? statsTabs(formatMessage)[state.statsType][1] : false}
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
          {state.activeTab === 1 ? (
            <>
              <StatsTypeSelect
                key='statsType'
                style={{ marginRight: '10px' }}
                selection
                options={Object.entries(statsTabs(formatMessage)).map(stType => {
                  return { text: stType[1][0], value: stType[0] }
                })}
                onChange={(e, { value }) => setState({ ...state, statsType: value })}
                value={!state.statsType ? Object.entries(statsTabs(formatMessage))[0][0] : state.statsType}
                data-test='dashboard_stats_drpdn'
              />
              <StatsTypeSelect
                key='dateRangeSelect'
                style={{ minWidth: '150px' }}
                selection
                options={dateRangeOptions(formatMessage)}
                onChange={(e, { value }) => setDateRange(value, props, state, setState)}
                value={state.dateRangeSelected}
                data-test='dashboard_date_range_select_drpdn'
              />
            </>
          ) : null}
          {graphTypeSwitch(state, setState)}
        </RightChartControl>
      )
    }
])

export const companySalesPurchasesTabs = (props, state, setState, formatMessage) => ([
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
          {state.graphType === 0 ? (
            <LineGraph
              data={props.companySumOfSalesMonthly}
              title='Company Sum Of Sales Monthly'
              titleId='dasboard.companySales.graph.title'
              subTitle='in thousand dollars'
              subTitleId='dasboard.sales.graph.subtitle'
            />
          ) : (
            <BarGraph
              data={props.companySumOfSalesMonthly}
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
          {state.graphType === 0 ? (
            <LineGraph
              data={props.companySumOfPurchasesMonthly}
              title='Company Sum Of Sales Monthly'
              titleId='dasboard.companySales.graph.title'
              subTitle='in thousand dollars'
              subTitleId='dasboard.sales.graph.subtitle'
            />
          ) : (
            <BarGraph
              data={props.companySumOfPurchasesMonthly}
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
          {state.activeTab === 2 ? (
            <StatsTypeSelect
              key='statsType'
              style={{ marginRight: '10px' }}
              selection
              pointing='top right'
              options={Object.entries(statsTabs(formatMessage)).map(stType => {
                return { text: stType[1][0], value: stType[0] }
              })}
              onChange={(e, { value }) => setState({ ...state, statsType: value })}
              value={!state.statsType ? Object.entries(statsTabs(formatMessage))[0][0] : state.statsType}
              data-test='dashboard_stats_drpdn'
            />
          ) : null}
          <StatsTypeSelect
            key='dateRangeSelect'
            style={{ minWidth: '150px' }}
            selection
            options={dateRangeOptions(formatMessage)}
            onChange={(e, { value }) => setDateRange(value, props, state, setState)}
            value={state.dateRangeSelected}
            data-test='dashboard_date_range_select_drpdn'
          />
          {graphTypeSwitch(state, setState)}
        </RightChartControl>
      )
    }
])

export const quickFilters = formatMessage => ([
    formatMessage({ id: 'dashboard.dateFilter.lastDay', defaultMessage: 'Last day' }),
    formatMessage({ id: 'dashboard.dateFilter.thisWeek', defaultMessage: 'This week' }),
    formatMessage({ id: 'dashboard.dateFilter.lastWeek', defaultMessage: 'Last week' }),
    formatMessage({ id: 'dashboard.dateFilter.thisMonth', defaultMessage: 'This month' }),
    formatMessage({ id: 'dashboard.dateFilter.lastMonth', defaultMessage: 'Last month' }),
    formatMessage({ id: 'dashboard.dateFilter.thisYear', defaultMessage: 'This year' }),
    formatMessage({ id: 'dashboard.dateFilter.lastYear', defaultMessage: 'Last year' }),
    formatMessage({ id: 'dashboard.dateFilter.allTime', defaultMessage: 'All the time' })
])
