import React, { Component } from 'react'
import { Container, Menu, Header, Button, Popup, List, Icon, Tab, Grid, Input } from 'semantic-ui-react'
import { AlertTriangle } from 'react-feather'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withRouter } from 'next/router'
import { number } from 'prop-types'
import Link from 'next/link'
import styled from 'styled-components'

import { ShippingQuotes } from '~/modules/shipping'
import ProdexGrid from '~/components/table'
import AddCart from '~/src/pages/cart/components/AddCart'
import FilterTags from '~/modules/filter/components/FitlerTags'
import { filterTypes } from '~/modules/filter/constants/filter'
import { groupActionsMarketplace } from '~/modules/company-product-info/constants'
import { Holds } from '~/modules/marketplace/holds'
import Tutorial from '~/modules/tutorial/Tutorial'
import { Datagrid } from '~/modules/datagrid'
import { debounce } from 'lodash'

const CapitalizedText = styled.span`
  text-transform: capitalize;
`

const DivButtonWithToolTip = styled.div`
  z-index: 501;
`

const MenuLink = withRouter(({ router: { pathname }, to, children }) => (
  <Link prefetch href={to}>
    <Menu.Item as='a' active={pathname === to}>
      {children}
    </Menu.Item>
  </Link>
))

const RedTriangle = styled(AlertTriangle)`
  display: block;
  width: 20px;
  height: 19px;
  margin: 0 auto;
  vertical-align: top;
  font-size: 20px;
  color: #f16844;
  line-height: 20px;

  &.grey {
    color: #848893;
  }
`

const MarketplaceTab = styled(Tab)`
  flex-grow: 1;
  flex-shrink: 1;
`

class Marketplace extends Component {
  state = {
    columns: [
      { name: 'productName', disabled: true },
      { name: 'productNumber', disabled: true },
      // { name: 'merchant', title: <FormattedMessage id='marketplace.merchant' defaultMessage='Merchant'>{(text) => text}</FormattedMessage>, width: 250 },
      {
        name: 'conformingIcon',
        title: <RedTriangle className='grey' />,
        width: 45,
        align: 'center'
      },
      {
        name: 'intProductName',
        title: (
          <FormattedMessage id='global.productName' defaultMessage='Product Name'>
            {text => text}
          </FormattedMessage>
        ),
        width: 180,
        sortPath: 'ProductOffer.companyProduct.intProductName'
      },
      {
        name: 'available',
        title: (
          <FormattedMessage id='marketplace.available' defaultMessage='Available PKGs'>
            {text => text}
          </FormattedMessage>
        ),
        width: 140,
        align: 'right',
        sortPath: 'ProductOffer.pkgAvailable'
      },
      {
        name: 'packaging',
        title: (
          <FormattedMessage id='marketplace.packaging' defaultMessage='Packaging'>
            {text => text}
          </FormattedMessage>
        ),
        width: 140
      },
      {
        name: 'quantity',
        title: (
          <FormattedMessage id='marketplace.quantity' defaultMessage='Quantity'>
            {text => text}
          </FormattedMessage>
        ),
        width: 140,
        align: 'right',
        sortPath: 'ProductOffer.quantity'
      },
      {
        name: 'fobPrice',
        title: (
          <FormattedMessage id='marketplace.fobPrice' defaultMessage='FOB Price'>
            {text => text}
          </FormattedMessage>
        ),
        width: 160,
        align: 'right',
        sortPath: 'ProductOffer.cfPricePerUOM'
      },
      {
        name: 'manufacturer',
        title: (
          <FormattedMessage id='marketplace.manufacturer' defaultMessage='Manufacturer'>
            {text => text}
          </FormattedMessage>
        ),
        width: 220,
        sortPath: 'ProductOffer.companyProduct.echoProduct.manufacturer.name'
      },
      {
        name: 'origin',
        title: (
          <FormattedMessage id='marketplace.origin' defaultMessage='Origin'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120,
        sortPath: 'ProductOffer.origin.name'
      },
      {
        name: 'expiration',
        title: (
          <FormattedMessage id='marketplace.expirationDate' defaultMessage='Expiration Date'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120,
        sortPath: 'ProductOffer.lotExpirationDate'
      },
      {
        name: 'condition',
        title: (
          <FormattedMessage id='marketplace.condition' defaultMessage='Condition'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100,
        sortPath: 'ProductOffer.condition.name'
      },
      {
        name: 'form',
        title: (
          <FormattedMessage id='marketplace.form' defaultMessage='Form'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100,
        sortPath: 'ProductOffer.productForm.name'
      },
      {
        name: 'location',
        title: (
          <FormattedMessage id='marketplace.location' defaultMessage='Location'>
            {text => text}
          </FormattedMessage>
        ),
        width: 160
      },
      {
        name: 'nacdMember',
        title: (
          <FormattedMessage id='marketplace.nacdMember' defaultMessage='NACD Member'>
            {text => text}
          </FormattedMessage>
        ),
        width: 160
      }
    ],
    selectedRows: [],
    //pageNumber: 0,
    open: false,
    filterValue: ''
  }

  initData = () => {
    const { datagrid } = this.props
    datagrid.loadData()
  }

  componentDidMount() {
    this.props.applyDatagridFilter('')
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { datagridFilterUpdate, datagridFilter, datagrid } = this.props
    if (prevProps.datagridFilterUpdate !== datagridFilterUpdate) {
      datagrid.setFilter(datagridFilter)
    }
  }

  getRows = () => {
    const {
      rows,
      intl: { formatMessage }
    } = this.props

    return rows.map(r => ({
      ...r,
      clsName: r.condition ? 'non-conforming' : '',
      conformingIcon: r.condition ? (
        <Popup
          header={
            <FormattedMessage id='global.nonConforming.tooltip' defaultMessage='This is a non-conforming product.' />
          }
          content={r.conditionNotes}
          trigger={
            <div>
              <RedTriangle />
            </div>
          } // <div> has to be there otherwise popup will be not shown
        />
      ) : null,
      condition: r.condition ? (
        <Popup
          content={r.conditionNotes}
          trigger={
            <div className='dashed-underline'>
              <FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />
            </div>
          } // <div> has to be there otherwise popup will be not shown
        />
      ) : (
        <FormattedMessage id='global.conforming' defaultMessage='Conforming' />
      ),
      packaging: (
        <>
          {`${r.packagingSize} ${r.packagingUnit} `}
          <CapitalizedText>{r.packagingType}</CapitalizedText>{' '}
        </>
      )
    }))
  }

  tableRowClicked = (clickedId, isHoldRequest = false) => {
    const { getProductOffer, sidebarChanged, isProductInfoOpen, closePopup } = this.props
    let { isOpen, id } = this.props.sidebar
    getProductOffer(clickedId)

    if (isProductInfoOpen) closePopup()
    sidebarChanged({ isOpen: true, id: clickedId, quantity: 1, isHoldRequest: isHoldRequest })
  }

  handleFiltersValue = debounce(value => {
    const { applyDatagridFilter } = this.props
    if (Datagrid.isReady()) Datagrid.setSearch(value)
    else applyDatagridFilter(value)
  }, 250)

  handleFilterChange = (e, { value }) => {
    this.setState({ filterValue: value })
    this.handleFiltersValue(value)
  }

  handleClearAutocompleteData = () => {
    this.props.clearAutocompleteData()
  }

  isSelectedMultipleEcho = (rows, selectedRows) => {
    if (!rows || !selectedRows) return
    const filteredRows = rows.reduce((filtered, row, rowIndex) => {
      if (selectedRows.includes(row.id)) {
        filtered.push(row.companyProduct.echoProduct.id)
      }
      return [...new Set(filtered)]
    }, [])
    if (filteredRows.length <= 1) {
      return false
    } else {
      return true
    }
  }

  getEchoProducts = (rows, selectedRows) => {
    if (!rows || !selectedRows) return
    return rows.reduce((filtered, row, rowIndex) => {
      if (selectedRows.includes(row.id)) {
        filtered.push(row.companyProduct.echoProduct)
      }
      return filtered
    }, [])
  }

  renderTabMarketplace = () => {
    const { datagrid, intl, openPopup, isMerchant, tutorialCompleted } = this.props
    const { columns, selectedRows, filterValue } = this.state
    let { formatMessage } = intl
    const rows = this.getRows()

    const rowActions = []
    const buttonRequestHold = {
      text: formatMessage({
        id: 'hold.requestHold',
        defaultMessage: 'Request Hold'
      }),
      callback: row => this.tableRowClicked(row.id, true)
    }
    const buttonBuy = {
      text: formatMessage({
        id: 'marketplace.buy',
        defaultMessage: 'Buy Product Offer'
      }),
      callback: row => this.tableRowClicked(row.id)
    }
    if (isMerchant) {
      rowActions.push(buttonBuy)
      rowActions.push(buttonRequestHold)
    } else {
      rowActions.push(buttonBuy)
    }

    return (
      <>
        {!tutorialCompleted && <Tutorial marginMarketplace />}
        <ShippingQuotes
          modalProps={{
            open: this.state.open,
            closeModal: () => this.setState({ open: false })
          }}
          productOfferIds={rows.reduce(function(filtered, row) {
            if (selectedRows.includes(row.id)) {
              filtered.push(row.id)
            }
            return filtered
          }, [])}
          productOffersSelected={rows.reduce(function(filtered, row) {
            if (selectedRows.includes(row.id)) {
              filtered.push({
                id: row.id,
                min: row.minPkg,
                split: row.splitPkg
              })
            }
            return filtered
          }, [])}
          removePopup={this.props.removePopup}
          echoProducts={this.getEchoProducts(rows, selectedRows)}
          {...this.props}
        />

        <Grid>
          <Grid.Row>
            <Grid.Column width={4} style={{ paddingTop: '9px' }}>
              <Input
                fluid
                icon='search'
                value={filterValue}
                onChange={this.handleFilterChange}
                placeholder={formatMessage({
                  id: 'myInventory.searchByProductName',
                  defaultMessage: 'Search by product name...'
                })}
              />
            </Grid.Column>
            <Grid.Column width={12}>
              <Menu secondary className='page-part'>
                <Menu.Menu position='right'>
                  <Menu.Item>
                    <FilterTags datagrid={datagrid} data-test='marketplace_remove_filter' />
                  </Menu.Item>
                  <Popup
                    wide='very'
                    data-test='array_to_multiple_list'
                    content={
                      <FormattedMessage
                        id='marketplace.shippingQuoteTooltip'
                        defaultMessage='Select one or more Product Offers to calculate a Shipping Quote.'
                      />
                    }
                    disabled={selectedRows.length !== 0}
                    position='bottom right'
                    trigger={
                      <DivButtonWithToolTip
                        data-tooltip={
                          this.isSelectedMultipleEcho(rows, selectedRows)
                            ? formatMessage({
                                id: 'marketplace.multipleEchoProduct',
                                defaultMessage: 'Multiple ProductOffers can not be calculate.'
                              })
                            : null
                        }
                        data-position='bottom right'>
                        <Button
                          disabled={selectedRows.length === 0 || this.isSelectedMultipleEcho(rows, selectedRows)}
                          primary
                          onClick={() => this.setState({ open: true })}
                          data-test='marketplace_shipping_quote_btn'>
                          <FormattedMessage id='allInventory.shippingQuote' defaultMessage='Shipping Quote'>
                            {text => text}
                          </FormattedMessage>
                        </Button>
                      </DivButtonWithToolTip>
                    }
                  />
                </Menu.Menu>
              </Menu>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <div class='flex stretched' style={{ padding: '10px 0' }}>
          <ProdexGrid
            groupActions={row => {
              let values = row.key.split('_')
              return groupActionsMarketplace(rows, values[values.length - 1], openPopup).map(a => ({
                ...a,
                text: <FormattedMessage {...a.text}>{text => text}</FormattedMessage>
              }))
            }}
            tableName='marketplace_grid'
            {...datagrid.tableProps}
            rows={rows}
            columns={columns}
            rowSelection
            showSelectionColumn
            groupBy={['productNumber']}
            // sameGroupSelectionOnly
            getChildGroups={rows =>
              _(rows)
                .groupBy('productName')
                .map(v => ({
                  key: `${v[0].productName}_${v[0].productNumber}_${v.length}_${v[0].companyProduct.id}`,
                  childRows: v
                }))
                .value()
            }
            renderGroupLabel={({ row: { value }, children = null }) => {
              const [name, number, count] = value.split('_')
              // const numberArray = number.split(' & ')
              return (
                <span>
                  <span style={{ color: '#2599d5' }}>{name ? name : 'Unmapped'}</span>
                  <span className='right'>Product offerings: {count}</span>
                </span>
              )
            }}
            onSelectionChange={selectedRows => this.setState({ selectedRows })}
            /* COMMENTED #30916
            onRowClick={(e, row) => {
              const targetTag = e.target.tagName.toLowerCase()
              if (targetTag !== 'input' && targetTag !== 'label') {
                this.tableRowClicked(row.id)
              }
            }}*/
            data-test='marketplace_row_action'
            rowActions={rowActions}
          />
        </div>
        <AddCart />
      </>
    )
  }

  render() {
    const { activeIndex } = this.props

    const panes = [
      {
        menuItem: (
          <MenuLink to='/marketplace/all' data-test='marketplace_submenu_tab_marketplace'>
            MARKETPLACE
          </MenuLink>
        ),
        render: () => <>{this.renderTabMarketplace()}</>
      },
      // {
      //   menuItem: <MenuLink to='/marketplace/wanted-board' data-test='marketplace_submenu_tab_wanted_board'>WANTED BOARD</MenuLink>,
      //   render: () => <>Tab 2 Content</>
      // },
      {
        menuItem: (
          <MenuLink to='/marketplace/holds' data-test='marketplace_submenu_tab_holds'>
            HOLDS
          </MenuLink>
        ),
        render: () => <>{<Holds />}</>
      }
    ]
    return (
      <>
        <Container fluid style={{ padding: '0 32px' }} className='flex stretched'>
          <MarketplaceTab
            activeIndex={activeIndex}
            className='marketplace-container'
            menu={{ secondary: true, pointing: true }}
            panes={panes}
          />
        </Container>
      </>
    )
  }
}

Marketplace.propTypes = {
  activeIndex: number
}

Marketplace.defaultProps = {
  activeIndex: 0
}

export default injectIntl(Marketplace)
