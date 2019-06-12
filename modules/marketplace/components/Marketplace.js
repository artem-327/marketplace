import React, { Component } from "react"
import { Container, Menu, Header, Button, MenuItem } from "semantic-ui-react"
import { FormattedMessage } from 'react-intl'
import { ShippingQuotes } from '~/modules/shipping'
import SubMenu from '~/src/components/SubMenu'
import { Filter } from '~/modules/filter'
import ProdexGrid from '~/components/table'
import AddCart from '~/src/pages/cart/components/AddCart'
import FilterTags from '~/modules/filter/components/FitlerTags'

const PAGE_SIZE = 50

export default class Marketplace extends Component {
  state = {
    columns: [
      { name: 'productName', disabled: true },
      { name: 'productNumber', disabled: true },
      { name: 'merchant', title: 'Merchant', width: 250 },
      { name: 'available', title: 'Available', width: 80 },
      { name: 'packaging', title: 'Packaging', width: 140 },
      { name: 'quantity', title: 'Quantity', width: 140 },
      { name: 'fobPrice', title: 'FOB Price', width: 160 },
      { name: 'tradeName', title: 'Trade Name', width: 140 },
      { name: 'manufacturer', title: 'MFR.', width: 120 },
      { name: 'origin', title: 'Origin', width: 120 },
      { name: 'expiration', title: 'Expiration', width: 120 },
      { name: 'assay', title: 'Assay', width: 80 },
      { name: 'condition', title: 'Condition', width: 100 },
      { name: 'form', title: 'Form', width: 100 },
      { name: 'location', title: 'Location', width: 160 }
    ],
    selectedRows: [],
    pageNumber: 0,
    open: false
  }

  componentDidMount() {
    this.getNextPage()
  }

  filterInventory = async (filter) => {
    let productIds = []
    if (filter.search) {
      let foundProducts = await this.props.findProducts(filter.search)
      foundProducts.value.data.reduce((filteredProducts, product) => {
        if (product.casProduct.chemicalName === filter.search || product.casProduct.casNumber === filter.search)
          productIds.push(product.id)
      }, [])

      if (productIds.length) {
        filter = { ...filter, product: productIds }
      }
    }
    this.props.getBroadcastedProductOffers(filter, PAGE_SIZE)
  }

  getNextPage = (pageNumber) => {
    this.props.getBroadcastedProductOffers({}, PAGE_SIZE, pageNumber)
  }

  getRows = () => {
    const { rows } = this.props

    return rows.map(r => ({
      ...r
    }))
  }

  tableRowClicked = (clickedId) => {
    const { getProductOffer, sidebarChanged } = this.props
    let { isOpen, id } = this.props.sidebar
    getProductOffer(clickedId)

    if (id !== clickedId && id) sidebarChanged({ isOpen: true, id: clickedId, quantity: 1 })
    else sidebarChanged({ isOpen: !isOpen, id: clickedId, quantity: 1 })

  }

  onFilterApply = (filter) => {
    this.props.postBroadcastedDatagrid(filter)
  }

  onFilterSave = (filter) => {
    this.props.saveBroadcastedFilter(filter)
  }

  onFilterClear = () => {
    let { filter } = this.props
    filter.filters = []
    this.props.postBroadcastedDatagrid(filter)
  }

  removeFilter = (i) => {
    let { filter } = this.props

    filter.filters.splice(i, 1)

    this.props.postBroadcastedDatagrid(filter)
  }

  render() {
    let {
      loading
    } = this.props
    let { columns, selectedRows } = this.state
    let rows = this.getRows()

    return (
      <>
        <Container fluid style={{ padding: '0 32px' }}>

          <ShippingQuotes
            modalProps={{
              open: this.state.open,
              closeModal: () => this.setState({ open: false })
            }}
            selectedRows={selectedRows}
            removePopup={this.props.removePopup}
            {...this.props}
          />

          <Menu secondary>
            <Menu.Item header>
              <Header as='h1' size='medium'>
                <FormattedMessage
                  id='allInventory.marketplace'
                  defaultMessage='MARKETPLACE'
                />
              </Header>
            </Menu.Item>

            <Menu.Menu position='right'>
              <Menu.Item>
                <FilterTags filter={this.props.filter} onClick={this.removeFilter} />
              </Menu.Item>
              {selectedRows.length === 0 ? null :
                <Button primary onClick={() => this.setState({ open: true })}>
                  <FormattedMessage id='allInventory.shippingQuote' defaultMessage='Shipping Quote' />
                </Button>

              }
              <Menu.Item>
                <SubMenu />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Container>
        <div class="flex stretched" style={{ padding: '10px 32px' }}>
          <ProdexGrid
            tableName="marketplace_grid"
            loading={loading}
            columns={columns}
            rows={rows}
            rowSelection
            getNextPage={this.getNextPage}
            pageSize={PAGE_SIZE}
            groupBy={['productNumber']}
            getChildGroups={rows =>
              _(rows)
                .groupBy('productName')
                .map(v => ({
                  key: `${v[0].productName}_${v[0].productNumber}_${v.length}`,
                  childRows: v
                }))
                .value()
            }
            renderGroupLabel={({ row: { value } }) => {
              const [name, number, count] = value.split('_')
              return (
                <span>
                  <span style={{ color: '#2599d5' }}>{number}</span>&nbsp;&nbsp; {name} <span className="right">Product offerings: {count}</span>
                </span>
              )
            }}
            onSelectionChange={selectedRows => this.setState({ selectedRows })}
            onRowClick={(e, row) => {
              const targetTag = e.target.tagName.toLowerCase()
              if (targetTag !== 'input' && targetTag !== 'label') {
                this.tableRowClicked(row.id)
              }
            }}
            rowActions={[
              { text: 'Buy Product Offer', callback: (row) => this.tableRowClicked(row.id) }
            ]}
          />
        </div>
        <Filter
          onApply={this.onFilterApply}
          onSave={this.onFilterSave}
          onClear={this.onFilterClear}
        />
        <AddCart />
      </>
    )
  }
}
