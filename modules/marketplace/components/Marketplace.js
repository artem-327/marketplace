import React, { Component } from "react"
import { Container, Menu, Header, Button, MenuItem, Popup, List } from "semantic-ui-react"
import { FormattedMessage } from 'react-intl'
import { ShippingQuotes } from '~/modules/shipping'
import SubMenu from '~/src/components/SubMenu'
import { Filter } from '~/modules/filter'
import ProdexGrid from '~/components/table'
import AddCart from '~/src/pages/cart/components/AddCart'
import FilterTags from '~/modules/filter/components/FitlerTags'

import { UnitOfPackaging } from '~/components/formatted-messages'

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

  initData = () => {
    const { datagrid } = this.props
    datagrid.loadData()
  }

  componentDidMount() {
    this.initData()
  }

  getRows = () => {
    const { rows } = this.props

    return rows.map(r => ({
      ...r,
      packaging: <UnitOfPackaging value={r.packagingType} />,
    }))
  }

  tableRowClicked = (clickedId) => {
    const { getProductOffer, sidebarChanged } = this.props
    let { isOpen, id } = this.props.sidebar
    getProductOffer(clickedId)

    if (id !== clickedId && id) sidebarChanged({ isOpen: true, id: clickedId, quantity: 1 })
    else sidebarChanged({ isOpen: !isOpen, id: clickedId, quantity: 1 })

  }

  handleFilterApply = filter => {
    this.props.datagrid.setFilter(filter)
  }


  handleFilterClear = () => {
    this.props.applyFilter({ filters: [] })
    this.props.datagrid.setFilter({ filters: [] })
  }

  removeFilter = (indexes) => {
    let { datagrid, appliedFilter } = this.props

    indexes.forEach((index, i) => {
      datagrid.filters.splice(index - i, 1)
      appliedFilter.filters.splice(index - i, 1)
    })


    this.props.applyFilter(appliedFilter)
    datagrid.setFilter(datagrid.filters)
  }



  render() {
    const { datagrid } = this.props
    const { columns, selectedRows } = this.state
    const rows = this.getRows()

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
                <FormattedMessage id='allInventory.marketplace' defaultMessage='MARKETPLACE' />
              </Header>
            </Menu.Item>

            <Menu.Menu position='right'>
              <Menu.Item>
                <FilterTags filters={datagrid.filters} onClick={this.removeFilter} />
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
            {...datagrid.tableProps}
            rows={rows}
            columns={columns}
            rowSelection
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
              const numberArray = number.split(' & ')
              return (
                <span>
                  <span style={{ color: '#2599d5' }}>{numberArray.length > 1 ? (<Popup content={<List items={numberArray.map(n => { return n })} />} trigger={<span>Blend</span>} />) : number}</span>&nbsp;&nbsp; {name} <span className="right">Product offerings: {count}</span>
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
          onApply={this.handleFilterApply}
          onClear={this.handleFilterClear}
          savedUrl='/prodex/api/product-offers/broadcasted/datagrid/saved-filters'
          searchUrl={(text) => `/prodex/api/products/broadcasted/search?pattern=${text}&onlyMapped=true`}
          apiUrl={datagrid.apiUrl}
          filters={datagrid.filters}
        />
        <AddCart />
      </>
    )
  }
}
