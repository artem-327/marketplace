import { useEffect, useState } from 'react'
import { number, array, bool } from 'prop-types'
import { injectIntl } from 'react-intl'
import { Grid, Popup, Input, Image } from 'semantic-ui-react'
import { Package, DollarSign, User, Layers, Coffee } from 'react-feather'
import moment from 'moment'
// Components
import PieGraph from './PieGraph'
import SummaryRectangle from './SummaryRectangle'
import Tutorial from '../../tutorial/Tutorial'
import PartnersIcon from '../../../assets/images/dashboard/partners.svg'
import UsersIcon from '../../../assets/images/dashboard/users.svg'
import ProductOrdersIcon from '../../../assets/images/dashboard/product_orders.svg'
import InventoryIcon from '../../../assets/images/dashboard/inventory.svg'
import SalesIcon from '../../../assets/images/dashboard/sales.svg'
import ProductsIcon from '../../../assets/images/dashboard/products.svg'
// Styles
import 'react-calendar/dist/Calendar.css'
import {
  CustomGrid,
  DivContainerGraph,
  Select,
  DateGrid,
  QuickFilter,
  StyledCalendar,
  StyledTab
} from '../styles'
// Constants
import { currency } from '../../../constants'
// Services
import {
  setDateRange,
  filterDates,
  filterQuickDate,
  statsTabs,
  adminMenuTabs,
  companySalesPurchasesTabs,
  quickFilters
} from './Dashboard.services'



/**
 * @category Dashboard - Dashboard
 * @component
 */
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
    setDateRange(0, props, state, setState)
  }, [])

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

  let stats = []
  if (dailyStats && dailyStats.length) {
    stats = dailyStats.map(day => {
      let dayStats = {}
      Object.entries(statsTabs(formatMessage)).forEach(statsTab => {
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

  const panes = isAdmin && !takeover ? adminMenuTabs(props, state, setState, formatMessage, stats) : companySalesPurchasesTabs(props, state, setState, formatMessage)

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
                  {activeQuick > 0 ? quickFilters(formatMessage)[activeQuick - 1] : selectedDate ? selectedDate : 'Select'}
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
                                    filterDates(0, [newDate, dateTo], props, state, setState)
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
                                    filterDates(0, [dateFrom, newDate], props, state, setState)
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
                        onChange={dates => filterDates(0, dates, props, state, setState)}
                        formatShortWeekday={(locale, date) => moment(date).format('dd')}
                        showDoubleView={true}
                        selectRange={true}
                      />
                    </Grid.Column>
                    <Grid.Column width={4}>
                      {quickFilters(formatMessage).map((item, index) => (
                        <QuickFilter
                          key={index}
                          className={activeQuick === index + 1 ? 'active' : null}
                          onClick={() => filterQuickDate(++index, props, state, setState)}>
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
