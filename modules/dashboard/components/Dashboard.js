import React, { Component } from 'react'
import { number } from 'prop-types'
import { DatesRangeInput } from 'semantic-ui-calendar-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Menu, Button, Input, Grid, GridRow, GridColumn, Container, Tab } from 'semantic-ui-react'
import { ChevronLeft, ChevronRight, Briefcase, Package, DollarSign } from 'react-feather'
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
  Cell
} from 'recharts'

import { getSafe } from '~/utils/functions'

import styled from 'styled-components'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const RADIAN = Math.PI / 180
//FIXME remove
const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 }
]

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

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
  height: 163px;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;
`

const RectangleSummaryHeader = styled.div`
  width: 100%;
  height: 110px;
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
  height: 110px;
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
  height: 480px;
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

const RectanglePieGraph = styled.div`
  width: 100%;
  height: 480px;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;
`

const DivPieGraphHeader = styled.div`
  width: 100%;
  height: 55px;
  border-bottom: solid 1px #dee2e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
`

const DivPieGraphTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #848893;
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

  render() {
    const {
      totalCompaniesCount,
      totalCompanyProductsCount,
      totalProductOffersValue,
      graphDataTransactions,
      top10ProductGroups,
      intl: { formatMessage }
    } = this.props
    console.log('top10ProductGroups====================================')
    console.log(top10ProductGroups)
    console.log('====================================')

    const { activeTab } = this.state
    const panes = [
      {
        menuItem: (
          <Menu.Item key='users' onClick={() => this.setState({ activeTab: 0 })}>
            <UpperCaseText>{formatMessage({ id: 'dasboard.users', defaultMessage: 'USERS' })}</UpperCaseText>
          </Menu.Item>
        ),
        render: () => (
          <TabPane key='users' attached={false}>
            <UpperCaseText>{formatMessage({ id: 'dasboard.users', defaultMessage: 'USERS' })}</UpperCaseText>
          </TabPane>
        )
      },
      {
        menuItem: (
          <Menu.Item key='products' onClick={() => this.setState({ activeTab: 1 })}>
            <UpperCaseText>{formatMessage({ id: 'dasboard.products', defaultMessage: 'PRODUCTS' })}</UpperCaseText>
          </Menu.Item>
        ),
        render: () => (
          <TabPane key='products' attached={false}>
            <UpperCaseText>{formatMessage({ id: 'dasboard.products', defaultMessage: 'PRODUCTS' })}</UpperCaseText>
          </TabPane>
        )
      },
      {
        menuItem: (
          <Menu.Item key='transactions' onClick={() => this.setState({ activeTab: 2 })}>
            <UpperCaseText>
              {formatMessage({ id: 'dasboard.transactions', defaultMessage: 'TRANSACTIONS' })}
            </UpperCaseText>
          </Menu.Item>
        ),
        render: () => (
          <TabPane key='transactions' attached={false}>
            <DivGraph>
              <GraphTitle>
                <FormattedMessage
                  id='dasboard.transactions.graph.title'
                  defaultMessage={`Total Marketplace Transactions in {year}`}
                  values={{
                    year: 2020 // FIXME
                  }}
                />
              </GraphTitle>
              <GraphSubTitle>
                <FormattedMessage id='dasboard.transactions.graph.subtitle' defaultMessage='in thousand dollars' />
              </GraphSubTitle>
              <LineChart
                width={530}
                height={340}
                data={graphDataTransactions}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <Area legendType='none' />
                <XAxis tickLine={false} dataKey='name' axisLine={false} />
                <YAxis unit='$' tickLine={false} axisLine={false} />
                <CartesianGrid vertical={false} strokeDasharray='2 10' />
                <Tooltip />
                <Legend />
                <Line
                  strokeWidth={2}
                  dot={{ strokeWidth: 2 }}
                  legendType='circle'
                  type='linear'
                  dataKey='Transactions'
                  stroke='#2599d5'
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </DivGraph>
          </TabPane>
        )
      }
    ]
    return (
      <CustomGrid secondary verticalAlign='middle' className='page-part'>
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
        <Grid.Row>
          <Grid.Column width={5}>
            <RectangleSummary>
              <RectangleSummaryHeader>
                <DivIcon>
                  <Circle>
                    <Briefcase />
                  </Circle>
                </DivIcon>
                <DivSummary>
                  <DivNumbers>{totalCompaniesCount}</DivNumbers>
                  <DivTotalText>Total Companies</DivTotalText>
                </DivSummary>
              </RectangleSummaryHeader>
              <RectangleSummaryBottom>
                <DivTotalTextBottom>
                  <b>246</b> avg users per company
                </DivTotalTextBottom>
                <ButtonViewAll type='button'>View all</ButtonViewAll>
              </RectangleSummaryBottom>
            </RectangleSummary>
          </Grid.Column>
          <Grid.Column width={5}>
            <RectangleSummary>
              <RectangleSummaryHeader>
                <DivIcon>
                  <Circle style={{ backgroundColor: '#84c225', border: 'solid 5px rgb(232, 255, 197)' }}>
                    <Package />
                  </Circle>
                </DivIcon>
                <DivSummary>
                  <DivNumbers>{totalCompanyProductsCount}</DivNumbers>
                  <DivTotalText>Total Products</DivTotalText>
                </DivSummary>
              </RectangleSummaryHeader>
              <RectangleSummaryBottom>
                <DivTotalTextBottom>
                  <b>1,256</b> avg products per company
                </DivTotalTextBottom>
                <ButtonViewAll type='button'>View all</ButtonViewAll>
              </RectangleSummaryBottom>
            </RectangleSummary>
          </Grid.Column>
          <Grid.Column width={6}>
            <RectangleSummary>
              <RectangleSummaryHeader>
                <DivIcon>
                  <Circle style={{ backgroundColor: '#ffc65d', border: 'solid 5px rgb(255, 232, 190)' }}>
                    <DollarSign />
                  </Circle>
                </DivIcon>
                <DivSummary>
                  <DivNumbers>{totalProductOffersValue}</DivNumbers>
                  <DivTotalText>Total Transactions</DivTotalText>
                </DivSummary>
              </RectangleSummaryHeader>
              <RectangleSummaryBottom>
                <DivTotalTextBottom>
                  <b>$13,889</b> avg transactions per company
                </DivTotalTextBottom>
                <ButtonViewAll type='button'>View all</ButtonViewAll>
              </RectangleSummaryBottom>
            </RectangleSummary>
          </Grid.Column>
        </Grid.Row>
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

          <Grid.Column width={6}>
            <RectanglePieGraph>
              <DivPieGraphHeader>
                <DivPieGraphTitle>
                  <FormattedMessage id='dasboard.popularProducts.title' defaultMessage='POPULAR PRODUCTS' />
                </DivPieGraphTitle>
                <ButtonViewAll type='button'>View all</ButtonViewAll>
              </DivPieGraphHeader>
              <div>
                <PieChart width={800} height={400}>
                  <Pie
                    legendType='circle'
                    label={renderCustomizedLabel}
                    data={data} // FIXME top10ProductGroups
                    cx={200}
                    cy={200}
                    outerRadius={80}
                    dataKey='value'
                    fill='#8884d8'>
                    {data && // FIXME top10ProductGroups
                      data.length &&
                      data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                </PieChart>
              </div>
            </RectanglePieGraph>
          </Grid.Column>
        </Grid.Row>
      </CustomGrid>
    )
  }
}

Dashboard.propTypes = {
  totalCompaniesCount: number,
  totalCompaniesCount: number
}

Dashboard.defaultProps = {
  totalCompaniesCount: 0,
  totalCompaniesCount: 0
}

export default injectIntl(Dashboard)
