import React, { Component } from 'react'
import {
  Container,
  Grid,
  GridColumn,
  Input,
  Menu,
  Header,
  Button,
  Popup,
  List,
  Icon,
  Tab,
  Label
} from 'semantic-ui-react'
import { AlertTriangle } from 'react-feather'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { withRouter } from 'next/router'
import { debounce } from 'lodash'

import { ShippingQuotes } from '~/modules/shipping'
import ProdexGrid from '~/components/table'
import AddCart from '~/src/pages/cart/components/AddCart'
import FilterTags from '~/modules/filter/components/FitlerTags'
import { filterTypes } from '~/modules/filter/constants/filter'
import { WantedBoard } from '~/modules/wanted-board/wanted-board'
import { MyOffers } from '~/modules/wanted-board/my-offers'
import confirm from '~/src/components/Confirmable/confirm'
import DetailSidebar from './DetailSidebar'
import { Datagrid } from '~/modules/datagrid'
import { getSafe } from '~/utils/functions'
import { number } from 'prop-types'
import Link from 'next/link'
import Tutorial from '~/modules/tutorial/Tutorial'

import { UpperCaseText, ControlPanel, ProductChemicalSwitch, TopButtons } from '../../constants/layout'

const MenuLink = withRouter(({ router: { pathname }, to, children }) => (
  <Link prefetch href={to}>
    <Menu.Item as='a' active={pathname === to}>
      {children}
    </Menu.Item>
  </Link>
))

class MyRequestedItems extends Component {
  state = {
    columnsProduct: [
      //{ name: 'productName', disabled: true },
      //{ name: 'productNumber', disabled: true },
      {
        name: 'casNumber',
        title: (
          <FormattedMessage id='wantedBoard.casNumber' defaultMessage='CAS Number'>
            {text => text}
          </FormattedMessage>
        ),
        width: 225,
        disabled: true
      },
      {
        name: 'assay',
        title: (
          <FormattedMessage id='wantedBoard.assay' defaultMessage='Assay'>
            {text => text}
          </FormattedMessage>
        ),
        width: 80,
        disabled: true
      },
      {
        name: 'product',
        title: (
          <FormattedMessage id='wantedBoard.product' defaultMessage='Product'>
            {text => text}
          </FormattedMessage>
        ),
        width: 304
        //align: 'right',
        //sortPath: 'ProductOffer.pkgAvailable'
      },
      {
        name: 'orderQuantity',
        title: (
          <FormattedMessage id='wantedBoard.orderQuantity' defaultMessage='Order Quantity'>
            {text => text}
          </FormattedMessage>
        ),
        width: 145
      },
      {
        name: 'orderFrequency',
        title: (
          <FormattedMessage id='wantedBoard.orderFrequency' defaultMessage='orderFrequency'>
            {text => text}
          </FormattedMessage>
        ),
        width: 160
      },
      {
        name: 'neededBy',
        title: (
          <FormattedMessage id='wantedBoard.neededBy' defaultMessage='Needed By'>
            {text => text}
          </FormattedMessage>
        ),
        width: 110
      },
      {
        name: 'dealExpired',
        title: (
          <FormattedMessage id='wantedBoard.dealExpired' defaultMessage='Deal Expired'>
            {text => text}
          </FormattedMessage>
        ),
        width: 130
      },
      /*
      {
        name: 'manufacturer',
        title: (
          <FormattedMessage id='wantedBoard.manufacturer' defaultMessage='Manufacturer'>
            {text => text}
          </FormattedMessage>
        ),
        width: 130
      },
      */
      {
        name: 'condition',
        title: (
          <FormattedMessage id='wantedBoard.condition' defaultMessage='Condition'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'deliveryLocation',
        title: (
          <FormattedMessage id='wantedBoard.deliveryLoc' defaultMessage='Delivery Loc'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'packaging',
        title: (
          <FormattedMessage id='wantedBoard.packaging' defaultMessage='Packaging'>
            {text => text}
          </FormattedMessage>
        ),
        width: 110
      },
      {
        name: 'deliveryPriceMax',
        title: (
          <FormattedMessage id='wantedBoard.deliveryPriceMax' defaultMessage='Delivery Price Max'>
            {text => text}
          </FormattedMessage>
        ),
        align: 'right',
        width: 170
      },
      {
        name: 'measurement',
        title: (
          <FormattedMessage id='wantedBoard.measurement' defaultMessage='Measurement'>
            {text => text}
          </FormattedMessage>
        ),
        width: 135
      },
      {
        name: 'fobQuote',
        title: (
          <FormattedMessage id='wantedBoard.fobQuote' defaultMessage='FOB Quote'>
            {text => text}
          </FormattedMessage>
        ),
        align: 'right',
        width: 110
      },
      {
        name: 'deliveredQuote',
        title: (
          <FormattedMessage id='wantedBoard.deliveredQuote' defaultMessage='Delivered Quote'>
            {text => text}
          </FormattedMessage>
        ),
        align: 'right',
        width: 145
      }
    ],
    columnsChemical: [
      //{ name: 'productName', disabled: true },
      //{ name: 'productNumber', disabled: true },
      {
        name: 'product',
        title: (
          <FormattedMessage id='wantedBoard.product' defaultMessage='Product'>
            {text => text}
          </FormattedMessage>
        ),
        width: 304,
        disabled: true
      },
      {
        name: 'casNumber',
        title: (
          <FormattedMessage id='wantedBoard.casNumber' defaultMessage='CAS Number'>
            {text => text}
          </FormattedMessage>
        ),
        width: 225
        //align: 'right',
        //sortPath: 'ProductOffer.pkgAvailable'
      },
      {
        name: 'assay',
        title: (
          <FormattedMessage id='wantedBoard.assay' defaultMessage='Assay'>
            {text => text}
          </FormattedMessage>
        ),
        width: 80
      },
      {
        name: 'orderQuantity',
        title: (
          <FormattedMessage id='wantedBoard.orderQuantity' defaultMessage='Order Quantity'>
            {text => text}
          </FormattedMessage>
        ),
        width: 145
      },
      {
        name: 'orderFrequency',
        title: (
          <FormattedMessage id='wantedBoard.orderFrequency' defaultMessage='orderFrequency'>
            {text => text}
          </FormattedMessage>
        ),
        width: 160
      },
      {
        name: 'neededBy',
        title: (
          <FormattedMessage id='wantedBoard.neededBy' defaultMessage='Needed By'>
            {text => text}
          </FormattedMessage>
        ),
        width: 110
      },
      {
        name: 'dealExpired',
        title: (
          <FormattedMessage id='wantedBoard.dealExpired' defaultMessage='Deal Expired'>
            {text => text}
          </FormattedMessage>
        ),
        width: 130
      },
      /*
      {
        name: 'manufacturer',
        title: (
          <FormattedMessage id='wantedBoard.manufacturer' defaultMessage='Manufacturer'>
            {text => text}
          </FormattedMessage>
        ),
        width: 130
      },
      */
      {
        name: 'condition',
        title: (
          <FormattedMessage id='wantedBoard.condition' defaultMessage='Condition'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'deliveryLocation',
        title: (
          <FormattedMessage id='wantedBoard.deliveryLoc' defaultMessage='Delivery Loc'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'packaging',
        title: (
          <FormattedMessage id='wantedBoard.packaging' defaultMessage='Packaging'>
            {text => text}
          </FormattedMessage>
        ),
        width: 110
      },
      {
        name: 'deliveryPriceMax',
        title: (
          <FormattedMessage id='wantedBoard.deliveryPriceMax' defaultMessage='Delivery Price Max'>
            {text => text}
          </FormattedMessage>
        ),
        align: 'right',
        width: 170
      },
      {
        name: 'measurement',
        title: (
          <FormattedMessage id='wantedBoard.measurement' defaultMessage='Measurement'>
            {text => text}
          </FormattedMessage>
        ),
        width: 135
      },
      {
        name: 'fobQuote',
        title: (
          <FormattedMessage id='wantedBoard.fobQuote' defaultMessage='FOB Quote'>
            {text => text}
          </FormattedMessage>
        ),
        align: 'right',
        width: 110
      },
      {
        name: 'deliveredQuote',
        title: (
          <FormattedMessage id='wantedBoard.deliveredQuote' defaultMessage='Delivered Quote'>
            {text => text}
          </FormattedMessage>
        ),
        align: 'right',
        width: 145
      }
    ],

    selectedRows: [],
    pageNumber: 0,
    open: false,
    filterValue: '',
    expandedRowIds: []
  }

  componentDidMount() {
    this.setState({ filterValue: '' })
    //this.handleFilterClear()
    this.props.handleFiltersValue('')
  }

  /*componentDidUpdate(prevProps, prevState, snapshot) {
    //const { datagridFilterUpdate, datagridFilter, datagrid } = this.props
    //if (prevProps.datagridFilterUpdate !== datagridFilterUpdate) {
    //  datagrid.setFilter(datagridFilter)
    //}
  }*/

  handleFiltersValue = debounce(value => {
    const { handleFiltersValue } = this.props
    if (Datagrid.isReady()) Datagrid.setSearchPattern(value)
    else handleFiltersValue(value)
  }, 300)

  handleFilterChange = (e, { value }) => {
    this.setState({ filterValue: value })
    this.handleFiltersValue(value)
  }

  renderContent = () => {
    const { datagrid, intl, rows, editedId, sidebarDetailTrigger, type, tutorialCompleted } = this.props
    const { columnsProduct, columnsChemical, selectedRows, filterValue } = this.state
    let { formatMessage } = intl

    return (
      <>
        {!tutorialCompleted && <Tutorial marginWantedBoard />}
        <ControlPanel>
          <Grid>
            <Grid.Row>
              <GridColumn floated='left' width={5} data-test='my_requested_items_search_inp'>
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

              <GridColumn width={11}>
                <TopButtons>
                  <ProductChemicalSwitch className={type}>
                    <Button
                      attached='left'
                      onClick={() => {
                        this.setState({ expandedRowIds: [] })
                        this.props.setMyRequestedItemsType('product')
                      }}
                      data-test='my_requested_items_product_switch_btn'>
                      <FormattedMessage id='wantedBoard.switcher.product' defaultMessage='Finished Goods'>
                        {text => text}
                      </FormattedMessage>
                    </Button>
                    <Button
                      attached='right'
                      onClick={() => {
                        this.setState({ expandedRowIds: [] })
                        this.props.setMyRequestedItemsType('chemical')
                      }}
                      data-test='my_requested_items_chemical_switch_btn'>
                      <FormattedMessage id='wantedBoard.switcher.chemical' defaultMessage='Raw Materials'>
                        {text => text}
                      </FormattedMessage>
                    </Button>
                  </ProductChemicalSwitch>
                  <Button
                    primary
                    onClick={() => sidebarDetailTrigger(null, 'my-requested-items')}
                    data-test='my_requested_items_open_popup_btn'>
                    <FormattedMessage id='wantedBoard.addNewRequest' defaultMessage='Add New Request'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                </TopButtons>
              </GridColumn>
            </Grid.Row>
          </Grid>
        </ControlPanel>
        <div className='flex stretched' style={{ padding: '10px 0' }}>
          <ProdexGrid
            key={type}
            tableName='my_requested_items_grid'
            {...datagrid.tableProps}
            rows={rows}
            columns={type === 'product' ? columnsProduct : columnsChemical}
            rowSelection={false}
            showSelectionColumn={false}
            treeDataType={true}
            tableTreeColumn={type === 'product' ? 'product' : 'casNumber'}
            getChildRows={(row, rootRows) => {
              return row ? row.purchaseRequestOffers : rootRows
            }}
            onRowClick={(_, row) => {
              if (row.root && row.purchaseRequestOffers.length) {
                let ids = this.state.expandedRowIds.slice()
                if (ids.includes(row.id)) {
                  //ids.filter(id => id === row.id)
                  this.setState({ expandedRowIds: ids.filter(id => id !== row.id) })
                } else {
                  ids.push(row.id)
                  this.setState({ expandedRowIds: ids })
                }
              }
            }}
            expandedRowIds={this.state.expandedRowIds}
            onExpandedRowIdsChange={expandedRowIds => this.setState({ expandedRowIds })}
            rowActions={[
              {
                text: formatMessage({
                  id: 'global.edit',
                  defaultMessage: 'Edit'
                }),
                callback: row => {
                  sidebarDetailTrigger(row, 'my-requested-items')
                }
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
                      id: 'confirm.deleteRequestedItem.Header',
                      defaultMessage: 'Delete Requested Item'
                    }),
                    formatMessage({
                      id: 'confirm.deleteRequestedItem.Content',
                      defaultMessage: 'Do you really want to delete requested item?'
                    })
                  ).then(async () => {
                    try {
                      await this.props.deletePurchaseRequestItem(row.id)
                      datagrid.removeRow(row.id)
                    } catch (e) {}
                  })
                }
              }
            ]}
            rowChildActions={[
              {
                text: formatMessage({
                  id: 'wantedBoard.reject',
                  defaultMessage: 'Reject'
                }),
                disabled: row => editedId === row.id,
                callback: row => {
                  confirm(
                    formatMessage({
                      id: 'confirm.rejectRequestedItem.Header',
                      defaultMessage: 'Reject Requested Item'
                    }),
                    formatMessage({
                      id: 'confirm.rejectRequestedItem.Content',
                      defaultMessage: 'Do you really want to reject requested item?'
                    })
                  ).then(async () => {
                    try {
                      await this.props.rejectRequestedItem(row.id.split('_')[1])
                      datagrid.loadData()
                    } catch (e) {}
                  })
                }
              },
              {
                text: formatMessage({
                  id: 'wantedBoard.purchase',
                  defaultMessage: 'Purchase'
                }),
                disabled: row => editedId === row.id,
                callback: async row => {
                  await this.props.purchaseRequestedItem(row.id.split('_')[1])
                  datagrid.loadData()
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
      editWindowOpen,
      clientCompany
    } = this.props

    const panes = [
      !clientCompany && {
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
        render: () => <>{this.renderContent()}</>
      },
      !clientCompany && {
        menuItem: (
          <MenuLink to='/wanted-board/my-offers' data-test='wanted_board_submenu_tab_my_offers'>
            <UpperCaseText>{formatMessage({ id: 'title.myOffers', defaultMessage: 'My Offers' })}</UpperCaseText>
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
        {editWindowOpen === 'my-requested-items' && <DetailSidebar />}
      </>
    )
  }
}

MyRequestedItems.propTypes = {
  activeIndex: number
}

MyRequestedItems.defaultProps = {
  activeIndex: 0
}

export default injectIntl(MyRequestedItems)
