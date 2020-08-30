import React, { Component } from 'react'
import { number, array, bool } from 'prop-types'
import { injectIntl } from 'react-intl'
import {Menu, Grid, Tab, Popup, Input, Dropdown} from 'semantic-ui-react'
import {Briefcase, Package, DollarSign, User} from 'react-feather'
//components
import { getSafe } from '~/utils/functions'
import PieGraph from './PieGraph'
import LineGraph from './LineGraph'
import SummaryRectangle from './SummaryRectangle'
//styled
import styled from 'styled-components'
import moment from 'moment'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const CustomGrid = styled(Grid)`
  flex-shrink: 0;
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
  
  [class*="LineGraph"] {
    min-height: 479px;
    
    [class*="LineGraph"] {
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
    content: "";
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
          content: "";
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
    background: transparent;
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

const StatsTypeSelect = styled(Dropdown.Menu)`
  > .item {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
`

class Dashboard extends Component {
  state = {
    activeTab: 0,
    activeQuick: 0,
    dateFrom: null,
    dateTo: null,
    selectedDate: null,
    statsType: null
  }

  componentDidMount() {
    try {
      this.props.getDashboardData()
    } catch (error) {
      console.error(error)
    }
  }

  filterQuickDate = (type) => {
    let dateFrom, dateTo = null

    switch (type) {
      case 1:
        dateFrom = moment().startOf('day')
        dateTo = moment().endOf('day')
        break;
      case 2:
        dateFrom = moment().startOf('isoWeek')//.add(1, 'days')
        dateTo = moment().endOf('isoWeek')//.add(1, 'days')
        break;
      case 3:
        dateFrom = moment().startOf('isoWeek').subtract(1, 'weeks')
        dateTo = moment().endOf('isoWeek').subtract(1, 'weeks')
        break;
      case 4:
        dateFrom = moment().startOf('month')
        dateTo = moment().endOf('month')
        break;
      case 5:
        dateFrom = moment().startOf('month').subtract(1, 'months')
        dateTo = moment().endOf('month').subtract(1, 'months')
        break;
      case 6:
        dateFrom = moment().startOf('year')
        dateTo = moment().endOf('year')
        break;
      case 7:
        dateFrom = moment().startOf('year').subtract(1, 'years')
        dateTo = moment().endOf('year').subtract(1, 'years')
        break;
      case 8:
      default:
        dateFrom = moment('01/01/2020', 'DD/MM/YYYY')
        dateTo = moment(dateFrom).add(80, 'years').subtract(1, 'days')
        break;
    }

    this.filterDates(type, [dateFrom, dateTo])
  }

  filterDates = (type, dates) => {
    // get daily stats data
    this.props.getDailyStatistics(moment(dates[0]).format('YYYY-MM-DD')+'T00:00:00Z', moment(dates[1]).add(1, 'days').format('YYYY-MM-DD')+'T00:00:00Z')
    this.setState({activeTab: 2, activeQuick: type, dateFrom: dates[0], dateTo: dates[1], selectedDate: moment(dates[0]).format('D MMM YYYY') + ' - ' + moment(dates[1]).format('D MMM YYYY')})
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
      takeover,
      isClientCompanyAdmin,
      dailyStats,
      intl: { formatMessage }
    } = this.props

    const statsTabs = {
      clientCompaniesCount: [formatMessage({id: 'dashboard.clientCompaniesCount', defaultMessage: '# of Client Companies'}), false],
      companiesCount: [formatMessage({id: 'dashboard.companiesCount', defaultMessage: '# of Companies'}), false],
      companyGenericProductsCount: [formatMessage({id: 'dashboard.companyGenericProductsCount', defaultMessage: '# of Company Generic Products'}), false],
      productOfferCount: [formatMessage({id: 'dashboard.productOffersCount', defaultMessage: '# of Product Offers'}), false],
      usersCount: [formatMessage({id: 'dashboard.usersCount', defaultMessage: '# of Users'}), false],
      sales: [formatMessage({ id: 'dashboard.sales', defaultMessage: 'Sales' }), false],
      totalProductOfferValue: [formatMessage({ id: 'dashboard.totalPOValue', defaultMessage: 'Total Product Offer Value' }), true],
      totalValueOfBroadcastedProductOffers: [formatMessage({ id: 'dashboard.totalValueBroadcastedPO', defaultMessage: 'Total Value of Broadcasted Product Offers' }), true]
    }

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

    const { activeTab, activeQuick, dateFrom, dateTo, selectedDate, statsType } = this.state

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
      },
      {
        menuItem: (
          <Menu.Item key='stats' onClick={() => this.setState({ activeTab: 2 })}>
            <UpperCaseText>{formatMessage({ id: 'dasboard.daily', defaultMessage: 'DAILY' })}</UpperCaseText>
          </Menu.Item>
        ),
        render: () => (
          <TabPane key='stats' attached={false}>
            <LineGraph
              data={stats}
              dataKey={statsType ? statsTabs[statsType][0] : 'none'}
              isCurrency={statsType ? statsTabs[statsType][1] : false}
              unitsCurrency={1}
              title='Daily Statistics'
              titleId='dasboard.daily.stats.title'
              subTitle=''
              subTitleId=''
            />
          </TabPane>
        )
      },
      {
        menuItem: (
          <>
            {activeTab === 2 ? (
              <Dropdown
                key='statsType'
                style={{ marginLeft: 'auto' }}
                item
                text={statsType ? statsTabs[statsType][0] : formatMessage({ id: 'dashboard.stats.type', defaultMessage: 'Stats Type' })}
                data-test='dashboard_stats_drpdn'>
                <StatsTypeSelect data-test='dashboard_stats_type_drpdn_menu' direction='left'>
                  {Object.entries(statsTabs).map((stType) => {
                    return (
                      <Dropdown.Item onClick={(e, { value }) => this.setState({ statsType: value })} value={stType[0]} dataTest={`dashboard_stats_type_${stType[0].replace(/([A-Z])/g, "_$1").toLowerCase()}_drpdn`}>
                        {stType[1]}
                      </Dropdown.Item>
                    )
                  })}
                </StatsTypeSelect>
              </Dropdown>
            ) : null}
          </>
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

    const panes =
      isAdmin && !takeover ? saleTab : isClientCompanyAdmin ? companyPurchasesTab : companySalesPurchasesTabs

    const quickFilters = [ 'Today', 'This week', 'Last week', 'This month', 'Last month', 'This year', 'Last year', 'All the time']

    return (
      <CustomGrid secondary='true' verticalAlign='middle' className='page-part'>
        <Grid.Row>
          <Grid.Column width={16}>
            <Popup on='click'
                   trigger={<Select>{activeQuick > 0 ? quickFilters[activeQuick - 1] : (selectedDate ? selectedDate : 'Select')}</Select>}
                   position='bottom left'
                   flowing
                   pinned
                   style={{ zIndex: 999 /* less than timeout modal */ }}
                   content={(
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
                                       this.filterDates(0, [moment(value, 'DD/MM/YYYY'), dateTo])
                                     } else {
                                       this.setState({dateFrom: value})
                                     }
                                   }}
                                   name={'dateFrom'}
                                   value={dateFrom && moment(dateFrom, 'DD/MM/YYYY', true).isValid() ? moment(dateFrom).format('DD/MM/YYYY') : null}
                                   fluid
                                 />
                               </Grid.Column>
                               <Grid.Column width={8}>
                                 <Input
                                   placeholder={formatMessage({ id: 'global.dateTo', defaultMessage: 'Date To'})}
                                   inputProps={{
                                     'data-test': 'dashboard_date_to_input'
                                   }}
                                   onChange={(e, { value }) => {
                                     if (value.length === 10 && moment(value, 'DD/MM/YYYY', true).isValid()) {
                                       this.filterDates(0, [dateFrom, moment(value, 'DD/MM/YYYY')])
                                     } else {
                                       this.setState({dateTo: value})
                                     }
                                   }}
                                   name='dateTo'
                                   value={dateTo ? (moment(dateTo, 'DD/MM/YYYY', true).isValid() ? moment(dateTo, 'DD/MM/YYYY').format('DD/MM/YYYY') : (moment(dateTo).isValid() ? moment(dateTo).format('DD/MM/YYYY') : null)) : null}
                                   fluid
                                 />
                               </Grid.Column>
                             </Grid.Row>
                           </Grid>
                           <StyledCalendar value={[dateFrom, dateTo]}
                                     onChange={dates => this.filterDates(0, dates)}
                                     formatShortWeekday={(locale, date) => moment(date).format('dd')}
                                     showDoubleView={true}
                                     selectRange={true} />
                         </Grid.Column>
                         <Grid.Column width={4}>
                           {quickFilters.map((item, index) => (
                             <QuickFilter className={activeQuick === (index+1) ? 'active' : null} onClick={() => this.filterQuickDate(++index)}>{item}</QuickFilter>
                           ))}
                         </Grid.Column>
                       </Grid.Row>
                     </DateGrid>
                   )}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>
            <DivContainerGraph>
              <Tab
                style={{ padding: '0 20px 0 20px' }}
                className='inventory-sidebar tab-menu flex stretched'
                menu={{ secondary: true, pointing: true }}
                activeIndex={this.state.activeTab}
                panes={panes}
              />
            </DivContainerGraph>
          </Grid.Column>

          <Grid.Column width={5}>
            {!isClientCompanyAdmin && (
              <>
                <SummaryRectangle
                  icon={<Briefcase />}
                  data={companiesCount}
                  title={isAdmin && !takeover ? 'Total Companies' : 'Total Client Companies'}
                  titleId={
                    isAdmin && !takeover ? 'dashboard.totalCompanies.title' : 'dashboard.totalClientCompanies.title'
                  }
                />
                <SummaryRectangle
                  icon={<Package />}
                  data={companyProductsCount}
                  title={isAdmin && !takeover ? 'Total Products' : 'Total Client Products'}
                  titleId={
                    isAdmin && !takeover ? 'dashboard.totalProducts.title' : 'dashboard.totalClientProducts.title'
                  }
                  styleCircle={{ backgroundColor: '#84c225', border: 'solid 5px rgb(232, 255, 197)' }}
                />
              </>
            )}

            <SummaryRectangle
              icon={<User />}
              data={usersCount}
              title='Total Users Count'
              titleId='dashboard.totalUsersCount.title'
              styleCircle={{ backgroundColor: '#f16844', border: 'solid 5px rgb(255, 233, 227)' }}
            />

            {!isClientCompanyAdmin && (
              <>
                <SummaryRectangle
                  icon={<DollarSign />}
                  data={productOffersValue && Math.round(productOffersValue)}
                  title={'Total Products Value $'}
                  titleId={'dashboard.totalValueWithoutMilion.title'}
                  styleCircle={{ backgroundColor: '#ffc65d', border: 'solid 5px rgb(255, 232, 190)' }}
                />
                <SummaryRectangle
                  icon={<DollarSign />}
                  data={broadcastedProductOffersValue && Math.round(broadcastedProductOffersValue)}
                  title={'Total Broadcasted Value $'}
                  titleId={'dashboard.totalBroadcastedValueWithoutMilion.title'}
                  styleCircle={{ backgroundColor: '#4cc3da', border: 'solid 5px rgb(224, 250, 255)' }}
                  isLastSummary
                />
              </>
            )}
          </Grid.Column>
        </Grid.Row>
        {isAdmin && !takeover ? (
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
        {(!isAdmin && !isClientCompanyAdmin) || takeover ? (
          <Grid.Row>
            {top10CompanyProductsByQuantitySales && top10CompanyProductsByQuantitySales.length ? (
              <Grid.Column width={5}>
                <PieGraph
                  innerRadius='30%'
                  data={top10CompanyProductsByQuantitySales}
                  title='PRODUCTS BY QUANTITY'
                  titleId='dasboard.productsQuantity.title'
                />
              </Grid.Column>
            ) : null}
            {top10CompanyProductsByValueSales && top10CompanyProductsByValueSales.length ? (
              <Grid.Column width={5}>
                <PieGraph
                  innerRadius='30%'
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
                  innerRadius='30%'
                  data={top10Buyers}
                  title='TOP 10 BUYERS'
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
                innerRadius='30%'
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
  isClientCompanyAdmin: bool
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
  isClientCompanyAdmin: false
}

export default injectIntl(Dashboard)
