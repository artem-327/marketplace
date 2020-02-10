import React, { Component } from 'react'
import { Container, Menu, Header, Button, Popup, List, Icon, Tab } from 'semantic-ui-react'
import { AlertTriangle } from 'react-feather'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { withRouter } from 'next/router'
import { ShippingQuotes } from '~/modules/shipping'
import SubMenu from '~/src/components/SubMenu'
import { Filter } from '~/modules/filter'
import ProdexGrid from '~/components/table'
import AddCart from '~/src/pages/cart/components/AddCart'
import FilterTags from '~/modules/filter/components/FitlerTags'
import { filterTypes } from '~/modules/filter/constants/filter'
import { groupActionsMarketplace } from '~/modules/company-product-info/constants'
import { Holds } from '~/modules/marketplace/holds'

import { number } from 'prop-types'
import Link from 'next/link'

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
  font-size: 20px;
  color: #f16844;
  line-height: 20px;
`

class Marketplace extends Component {
  state = {
    columns: [
      { name: 'productName', disabled: true },
      { name: 'productNumber', disabled: true },
      // { name: 'merchant', title: <FormattedMessage id='marketplace.merchant' defaultMessage='Merchant'>{(text) => text}</FormattedMessage>, width: 250 },
      {
        name: 'conformingIcon',
        title: (
          <RedTriangle />
        ),
        width: 45,
        align: 'center'
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
    pageNumber: 0,
    open: false
  }

  initData = () => {
    const { datagrid } = this.props
    datagrid.loadData()
  }

  componentDidMount() {
    this.handleFilterClear()
    //this.initData()
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
          content={
            <FormattedMessage id='global.nonConforming.tooltip' defaultMessage='This is a non-conforming product.' />
          }
          trigger={<RedTriangle />}
        />
      ) : null,
      condition: r.condition ? (
        <FormattedMessage id='global.conforming' defaultMessage='Conforming' />
      ) : (
        <FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />
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
    if (id !== clickedId && id)
      sidebarChanged({ isOpen: true, id: clickedId, quantity: 1, isHoldRequest: isHoldRequest })
    else sidebarChanged({ isOpen: !isOpen, id: clickedId, quantity: 1, isHoldRequest: isHoldRequest })
  }

  handleFilterApply = filter => {
    this.props.datagrid.setFilter(filter)
  }

  handleFilterClear = () => {
    this.props.applyFilter({ filters: [] })
    this.props.datagrid.setFilter({ filters: [] })
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
    const {
      datagrid,
      intl,
      getAutocompleteData,
      autocompleteData,
      autocompleteDataLoading,
      openPopup,
      isMerchant
    } = this.props
    const { columns, selectedRows } = this.state
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
            <Menu.Item>
              <SubMenu clearAutocompleteData={this.handleClearAutocompleteData} />
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <div class='flex stretched' style={{ padding: '10px 32px' }}>
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
        <Filter
          filterType={filterTypes.MARKETPLACE}
          getAutocompleteData={getAutocompleteData}
          autocompleteData={autocompleteData}
          autocompleteDataLoading={autocompleteDataLoading}
          onApply={this.handleFilterApply}
          onClear={this.handleFilterClear}
          savedUrl='/prodex/api/product-offers/broadcasted/datagrid/saved-filters'
          searchUrl={text => `/prodex/api/company-products/broadcasted/search?pattern=${text}&onlyMapped=true`}
          apiUrl={datagrid.apiUrl}
          filters={datagrid.filters}
        />
        <AddCart />
      </>
    )
  }

  render() {
    const { activeIndex } = this.props

    const panes = [
      {
        menuItem: <MenuLink to='/marketplace/all'>MARKETPLACE</MenuLink>,
        render: () => <>{this.renderTabMarketplace()}</>
      },
      {
        menuItem: <MenuLink to='/marketplace/wanted-board'>WANTED BOARD</MenuLink>,
        render: () => <>Tab 2 Content</>
      },
      {
        menuItem: <MenuLink to='/marketplace/holds'>HOLDS</MenuLink>,
        render: () => <>{<Holds />}</>
      }
    ]
    return (
      <>
        <Container fluid style={{ padding: '0 32px' }}>
          <Tab activeIndex={activeIndex} menu={{ secondary: true, pointing: true }} panes={panes} />
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
