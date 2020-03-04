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
import { MyRequestedItems } from '~/modules/wanted-board/my-requested-items'
import { MyOffers } from '~/modules/wanted-board/my-offers'
import confirm from '~/src/components/Confirmable/confirm'
import DetailSidebar from './DetailSidebar'

import { PlusCircle } from 'react-feather'

import { number } from 'prop-types'
import Link from 'next/link'

import {
  UpperCaseText,
  ControlPanel,

} from '../../constants/layout'

const MenuLink = withRouter(({ router: { pathname }, to, children }) => (
  <Link prefetch href={to}>
    <Menu.Item as='a' active={pathname === to}>
      {children}
    </Menu.Item>
  </Link>
))


class WantedBoard extends Component {
  state = {
    columns: [
      {
        name: 'product',
        title: (
          <FormattedMessage id='wantedBoard.product' defaultMessage='Product'>
            {text => text}
          </FormattedMessage>
        ),
        width: 290,
        //align: 'right',
        //sortPath: 'ProductOffer.pkgAvailable'
      },
      {
        name: 'assayMin',
        title: (
          <FormattedMessage id='wantedBoard.assayMin' defaultMessage='Assay Min'>
            {text => text}
          </FormattedMessage>
        ),
        width: 130,
      },
      {
        name: 'assayMax',
        title: (
          <FormattedMessage id='wantedBoard.assayMax' defaultMessage='Assay Max'>
            {text => text}
          </FormattedMessage>
        ),
        width: 130,
      },
      {
        name: 'packaging',
        title: (
          <FormattedMessage id='wantedBoard.packaging' defaultMessage='Packaging'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150,
      },
      {
        name: 'manufacturer',
        title: (
          <FormattedMessage id='wantedBoard.manufacturer' defaultMessage='Manufacturer'>
            {text => text}
          </FormattedMessage>
        ),
        width: 420,
      },
      {
        name: 'form',
        title: (
          <FormattedMessage id='wantedBoard.form' defaultMessage='Form'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120,
      },
      {
        name: 'fobPrice',
        title: (
          <FormattedMessage id='wantedBoard.fobPrice' defaultMessage='FOB Price'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150,
      },
      {
        name: 'quantity',
        title: (
          <FormattedMessage id='wantedBoard.quantity' defaultMessage='Quantity'>
            {text => text}
          </FormattedMessage>
        ),
        width: 180,
      },
      {
        name: 'neededBy',
        title: (
          <FormattedMessage id='wantedBoard.neededBy' defaultMessage='Needed By'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120,
      }
    ],
    selectedRows: [],
    pageNumber: 0,
    open: false,
    filterValue: ''
  }


  componentDidMount() {
    //this.handleFilterClear()
    //this.initData()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //const { datagridFilterUpdate, datagridFilter, datagrid } = this.props
    //if (prevProps.datagridFilterUpdate !== datagridFilterUpdate) {
    //  datagrid.setFilter(datagridFilter)
    //}
  }

  handleFilterChange = (e, { value }) => {
    this.setState({ filterValue: value })
    //this.handleFiltersValue(value)
  }

  renderContent = () => {
    const { datagrid, intl, rows, editedId, sidebarDetailTrigger } = this.props
    const { columns, selectedRows, filterValue } = this.state
    let { formatMessage } = intl

    return (
      <>
        <ControlPanel>
          <Grid>
            <Grid.Row>
              <GridColumn floated='left' width={5}>
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
              <GridColumn floated='right' width={2}>
                <Button
                  fluid
                  primary
                  onClick={() => sidebarDetailTrigger(null, 'wanted-board')}
                  data-test='wanted_board_open_popup_btn'>
                  <FormattedMessage id='wantedBoard.addNewItem' defaultMessage='Add New Item'>
                    {text => text}
                  </FormattedMessage>
                </Button>
              </GridColumn>
            </Grid.Row>
          </Grid>
        </ControlPanel>
        <div className='flex stretched' style={{padding: '10px 0'}}>
          <ProdexGrid
            tableName='wanted_board_grid'
            {...datagrid.tableProps}
            rows={rows}
            columns={columns}
            rowSelection
            showSelectionColumn
            rowActions={[
              {
                text: formatMessage({
                  id: 'global.edit',
                  defaultMessage: 'Edit'
                }),
                callback: row => sidebarDetailTrigger(row, 'wanted-board')
              },
              {
                text: formatMessage({
                  id: 'global.delete',
                  defaultMessage: 'Delete'
                }),
                disabled: row => editedId === row.id,
                callback: row => {
                  confirm(
                    formatMessage({
                      id: 'confirm.deleteOfferHeader',
                      defaultMessage: 'Delete Product Offer'
                    }),
                    formatMessage(
                      {
                        id: 'confirm.deleteItem',
                        defaultMessage: `Do you really want to remove ${row.chemicalName}?`
                      },
                      { item: row.chemicalName }
                    )
                  ).then(() => {
                    try {
                      this.props.deleteWantedBoardItem(row.id)
                      datagrid.removeRow(row.id)
                    } catch (e) {console.log('DELETE ERROR')}
                  })
                }
              },
              {
                text: formatMessage({
                  id: 'wantedBoard.submitOffer',
                  defaultMessage: 'Submit Offer'
                }),
                callback: row => this.props.SubmitOfferWantedBoard(row)
              },
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
      editWindowOpen,
    } = this.props

    const panes = [
      {
        menuItem: (
          <MenuLink to='/wanted-board/wanted-board' data-test='wanted_board_submenu_tab_wanted_board'>
            <UpperCaseText>
              {formatMessage({ id: 'title.wantedBoard', defaultMessage: 'Wanted Board' })}
            </UpperCaseText>
          </MenuLink>
        ),
        render: () => <>{this.renderContent()}</>
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
            <UpperCaseText>
              {formatMessage({ id: 'title.myOffers', defaultMessage: 'My Offers' })}
            </UpperCaseText>
          </MenuLink>
        ),
        render: () => <>{<MyOffers />}</>
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
        {editWindowOpen === 'wanted-board' && <DetailSidebar />}
      </>
    )
  }
}

WantedBoard.propTypes = {
  activeIndex: number
}

WantedBoard.defaultProps = {
  activeIndex: 0
}

export default injectIntl(WantedBoard)