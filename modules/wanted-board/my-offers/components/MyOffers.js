import React, { Component } from 'react'
import { Container, Grid, GridColumn, Input, Menu, Header, Button, Popup, List, Icon, Tab } from 'semantic-ui-react'
import { AlertTriangle } from 'react-feather'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { withRouter } from 'next/router'
import { ShippingQuotes } from '~/modules/shipping'
import ProdexGrid from '~/components/table'
import AddCart from '~/src/pages/cart/components/AddCart'
import FilterTags from '~/modules/filter/components/FitlerTags'
import { filterTypes } from '~/modules/filter/constants/filter'
import { groupActionsMarketplace } from '~/modules/company-product-info/constants'
import { WantedBoard } from '~/modules/wanted-board/wanted-board'
import { MyRequestedItems } from '~/modules/wanted-board/my-requested-items'
import confirm from '~/src/components/Confirmable/confirm'
import DetailSidebar from './DetailSidebar'
import { Datagrid } from '~/modules/datagrid'

import { number } from 'prop-types'
import Link from 'next/link'
import Tutorial from '~/modules/tutorial/Tutorial'

import { UpperCaseText, ControlPanel } from '../../constants/layout'

const MenuLink = withRouter(({ router: { pathname }, to, children }) => (
  <Link prefetch href={to}>
    <Menu.Item as='a' active={pathname === to}>
      {children}
    </Menu.Item>
  </Link>
))

class MyOffers extends Component {
  state = {
    columns: [
      {
        name: 'product',
        title: (
          <FormattedMessage id='wantedBoard.product' defaultMessage='Product'>
            {text => text}
          </FormattedMessage>
        ),
        width: 375
        //align: 'right',
        //sortPath: 'ProductOffer.pkgAvailable'
      },
      {
        name: 'fobPrice',
        title: (
          <FormattedMessage id='wantedBoard.fobPrice' defaultMessage='FOB Price'>
            {text => text}
          </FormattedMessage>
        ),
        align: 'right',
        width: 125
      },
      {
        name: 'manufacturer',
        title: (
          <FormattedMessage id='wantedBoard.manufacturer' defaultMessage='Manufacturer'>
            {text => text}
          </FormattedMessage>
        ),
        width: 310
      },
      {
        name: 'condition',
        title: (
          <FormattedMessage id='wantedBoard.condition' defaultMessage='Condition'>
            {text => text}
          </FormattedMessage>
        ),
        width: 145
      },
      {
        name: 'status',
        title: (
          <FormattedMessage id='wantedBoard.status' defaultMessage='Status'>
            {text => text}
          </FormattedMessage>
        ),
        width: 135
      }
    ],
    selectedRows: [],
    pageNumber: 0,
    open: false,
    filterValue: ''
  }

  componentDidMount() {
    this.setState({ filterValue: '' })
    this.props.handleFiltersValue('')
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleFiltersValue = value => {
    const { handleFiltersValue } = this.props
    if (Datagrid.isReady()) Datagrid.setSearch(value)
    else handleFiltersValue(value)
  }

  handleFilterChange = (e, { value }) => {
    this.setState({ filterValue: value })
    this.handleFiltersValue(value)
  }

  renderContent = () => {
    const { datagrid, intl, rows, editedId, myOffersSidebarTrigger, tutorialCompleted } = this.props
    const { columns, selectedRows, filterValue } = this.state
    let { formatMessage } = intl

    return (
      <>
        {!tutorialCompleted && <Tutorial marginWantedBoard />}
        <ControlPanel>
          <Grid>
            <Grid.Row>
              <GridColumn floated='left' width={5} data-test='my_offer_search_inp'>
                <Input
                  fluid
                  icon='search'
                  value={filterValue}
                  placeholder={formatMessage({
                    id: 'wantedBoard.searchByProductName',
                    defaultMessage: 'Search by product name...'
                  })}
                  onChange={this.handleFilterChange}
                />
              </GridColumn>
            </Grid.Row>
          </Grid>
        </ControlPanel>
        <div className='flex stretched' style={{ padding: '10px 0' }}>
          <ProdexGrid
            tableName='my_offers_grid'
            {...datagrid.tableProps}
            rows={rows}
            columns={columns}
            rowSelection={false}
            showSelectionColumn={false}
            rowActions={[
              {
                text: formatMessage({
                  id: 'global.edit',
                  defaultMessage: 'Edit'
                }),
                hidden: row => row.hiddenActions,
                callback: row => myOffersSidebarTrigger(row)
              },
              {
                text: formatMessage({
                  id: 'global.delete',
                  defaultMessage: 'Delete'
                }),
                hidden: row => row.hiddenActions,
                disabled: row => editedId === row.id,
                callback: row => {
                  confirm(
                    formatMessage({
                      id: 'confirm.deleteItemOffer.Header',
                      defaultMessage: 'Delete My Item Offer'
                    }),
                    formatMessage(
                      {
                        id: 'confirm.deleteItemOffer.Content',
                        defaultMessage: 'Do you really want to remove item offer?'
                      },
                      { item: row.chemicalName }
                    )
                  ).then(async () => {
                    try {
                      await this.props.deleteMyOfferItem(row.id)
                      datagrid.removeRow(row.id)
                    } catch (e) {
                      console.log('DELETE ERROR')
                    }
                  })
                }
              }
            ]}
          />
        </div>
      </>
    )
  }

  render() {
    const {
      activeIndex,
      intl: { formatMessage },
      editWindowOpen
    } = this.props

    const panes = [
      {
        menuItem: (
          <MenuLink to='/wanted-board/wanted-board' data-test='wanted_board_submenu_tab_wanted_board'>
            <UpperCaseText>{formatMessage({ id: 'title.wantedBoard', defaultMessage: 'Wanted Board' })}</UpperCaseText>
          </MenuLink>
        ),
        render: () => <>{<WantedBoard />}</>
      },
      {
        menuItem: (
          <MenuLink to='/wanted-board/my-requested-items' data-test='wanted_board_submenu_tab_my_requested_items'>
            <UpperCaseText>
              {formatMessage({ id: 'title.myRequestedItems', defaultMessage: 'My Requested Itemsd' })}
            </UpperCaseText>
          </MenuLink>
        ),
        render: () => <>{<MyRequestedItems />}</>
      },
      {
        menuItem: (
          <MenuLink to='/wanted-board/my-offers' data-test='wanted_board_submenu_tab_my_offers'>
            <UpperCaseText>{formatMessage({ id: 'title.myOffers', defaultMessage: 'My Offers' })}</UpperCaseText>
          </MenuLink>
        ),
        render: () => <>{this.renderContent()}</>
      }
    ]

    return (
      <>
        <Container fluid style={{ padding: '0 32px' }} className='flex stretched'>
          <Tab
            activeIndex={activeIndex}
            className='marketplace-container'
            menu={{ secondary: true, pointing: true }}
            panes={panes}
          />
        </Container>
        {editWindowOpen === 'my-offers' && <DetailSidebar />}
      </>
    )
  }
}

MyOffers.propTypes = {
  activeIndex: number
}

MyOffers.defaultProps = {
  activeIndex: 0
}

export default injectIntl(MyOffers)
