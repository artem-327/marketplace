import React, { Component } from 'react'
import { connect } from 'react-redux'

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
import { PlusCircle } from 'react-feather'
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

import { UpperCaseText, CustomRowDiv, ProductChemicalSwitch, TopButtons } from '../../constants/layout'

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
      },
      {
        name: 'ownerBranch',
        title: (
          <FormattedMessage id='wantedBoard.requestedBy' defaultMessage='Requested By'>
            {text => text}
          </FormattedMessage>
        ),
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
      },
      {
        name: 'ownerBranch',
        title: (
          <FormattedMessage id='wantedBoard.requestedBy' defaultMessage='Requested By'>
            {text => text}
          </FormattedMessage>
        ),
        width: 145
      }
    ],

    selectedRows: [],
    pageNumber: 0,
    open: false,
    filterValue: {
      searchInput: ''
    },
    expandedRowIds: []
  }

  handleFiltersValue = debounce(filter => {
    const { datagrid } = this.props
    datagrid.setSearch(filter, true, 'pageFilters')
  }, 300)

  componentDidMount() {
    const { tableHandlersFiltersMyReqItems } = this.props

    if (tableHandlersFiltersMyReqItems) {
      this.setState({ filterValue: tableHandlersFiltersMyReqItems })
      this.handleFiltersValue(tableHandlersFiltersMyReqItems)
    } else {
      this.handleFiltersValue(this.state.filterValue)
    }
  }

  componentWillUnmount() {
    this.props.handleVariableSave('tableHandlersFiltersMyReqItems', this.state.filterValue)
  }

  handleFilterChangeInputSearch = (e, data) => {
    this.setState({
      filterValue: {
        ...this.state.filterValue,
        [data.name]: data.value
      }
    })

    const filter = {
      ...this.state.filterValue,
      [data.name]: data.value
    }
    this.handleFiltersValue(filter)
  }

  handleProductChemicalSwitch = data => {
    const { datagrid } = this.props
    this.props.setMyRequestedItemsType(data)
    datagrid.clear()
    const filter = {
      ...this.state.filterValue,
      [data.name]: data.value
    }
    this.handleFiltersValue(filter)
  }

  renderContent = () => {
    const { datagrid, intl, rows, editedId, sidebarDetailTrigger, type, tutorialCompleted } = this.props
    const { columnsProduct, columnsChemical, selectedRows, filterValue } = this.state
    let { formatMessage } = intl

    return (
      <>
        {!tutorialCompleted && <Tutorial marginWantedBoard />}
        <div style={{ padding: '10px 0' }}>
          <CustomRowDiv>
            <div>
              <div className='column'>
                <Input
                  style={{ width: 340 }}
                  name='searchInput'
                  icon='search'
                  value={filterValue.searchInput}
                  placeholder={formatMessage({
                    id: 'wantedBoard.searchByProductName',
                    defaultMessage: 'Search by product name...'
                  })}
                  onChange={this.handleFilterChangeInputSearch}
                />
              </div>
            </div>

            <div>
              <div className='column'>
                <ProductChemicalSwitch className={type}>
                  <Button
                    attached='left'
                    onClick={() => {
                      this.setState({ expandedRowIds: [] })
                      this.handleProductChemicalSwitch('product')
                    }}
                    data-test='my_requested_items_product_switch_btn'>
                    <FormattedMessage id='wantedBoard.product' defaultMessage='Product'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                  <Button
                    attached='right'
                    onClick={() => {
                      this.setState({ expandedRowIds: [] })
                      this.handleProductChemicalSwitch('chemical')
                    }}
                    data-test='my_requested_items_chemical_switch_btn'>
                    <FormattedMessage id='wantedBoard.chemical' defaultMessage='Chemical'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                </ProductChemicalSwitch>
              </div>
              <div className='column'>
                <Button
                  className='secondary'
                  primary
                  onClick={() => {
                    sidebarDetailTrigger(null, 'my-requested-items')
                  }}
                  data-test='my_requested_items_open_popup_btn'>
                  <PlusCircle />
                  <FormattedMessage id='wantedBoard.requestProduct' defaultMessage='Request Product'>
                    {text => text}
                  </FormattedMessage>
                </Button>
              </div>
            </div>
          </CustomRowDiv>
        </div>
        <div className='flex stretched' style={{ padding: '10px 0 20px 0' }}>
          <ProdexGrid
            key={type}
            tableName={`my_requested_items_${type}_grid`}
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
      isClientCompany,
      openSidebar
    } = this.props

    const panes = [
      !isClientCompany && {
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
      !isClientCompany && {
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
        <Container fluid style={{ padding: '0 30px' }} className='flex stretched'>
          <Tab
            activeIndex={activeIndex}
            className='marketplace-container'
            menu={{ secondary: true, pointing: true }}
            panes={panes}
          />
        </Container>
        {openSidebar ? <DetailSidebar /> : null}
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

const mapStateToProps = state => ({
  isClientCompany: getSafe(() => state.auth.identity.company.isClientCompany, false)
})

export default injectIntl(connect(mapStateToProps)(MyRequestedItems))
