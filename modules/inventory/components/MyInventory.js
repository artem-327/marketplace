import React, { Component } from "react"
import { Container, Menu, Header, Checkbox, Icon } from "semantic-ui-react"
import SubMenu from '~/src/components/SubMenu'
import { FormattedMessage } from 'react-intl'
import Router from 'next/router'
import ProdexGrid from '~/components/table'
import { Broadcast } from '~/modules/broadcast'
import Filter from '~/src/components/Filter'

const PAGE_SIZE = 50

export default class MyInventory extends Component {
  state = {
    columns: [
      { name: 'productName', title: 'Product Name', width: 250 },
      { name: 'productNumber', title: 'Product Number' },
      { name: 'warehouse', title: 'Warehouse', width: 180 },
      { name: 'available', title: 'Available', width: 80 },
      { name: 'packaging', title: 'Packaging' },
      { name: 'pkgAmount', title: 'Pkg. Size' },
      { name: 'quantity', title: 'Quantity' },
      { name: 'cost', title: 'Cost' },
      { name: 'fobPrice', title: 'FOB Price' },
      { name: 'manufacturer', title: 'MFR.', width: 220 },
      { name: 'broadcast', title: 'Broadcast', width: 120 }
    ],
    selectedRows: [],
    pageNumber: 0,
  }

  componentDidMount() {
    this.getNextPage()
  }

  getNextPage = (pageNumber) => {
    this.props.getMyProductOffers({}, PAGE_SIZE, pageNumber)
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
    this.props.getMyProductOffers(filter, PAGE_SIZE)
  }

  getRows = () => {
    const { rows } = this.props

    return rows.map(r => ({
      ...r,
      broadcast: (
        <div style={{ float: 'right' }}>
          {r.status !== 'Unmapped' ? (
            <Checkbox toggle checked={r.status === 'Broadcasting'} disabled={r.status === 'Incomplete'} onChange={() => alert('Changed:' + r.productName)} />
          ) : (
              <Icon name='unlink' title='Product not mapped, click to map it.' onClick={() => Router.push({ pathname: '/settings/', query: { type: 'products', action: 'edit', id: r.product.id } })} />
            )}
        </div>
      )
    }))
  }

  render() {
    const {
      loading,
      openBroadcast
    } = this.props
    const { columns, selectedRows } = this.state
    const rows = this.getRows()

    return (
      <>
        <Container fluid style={{ padding: '0 32px' }}>
          <Menu secondary>
            <Menu.Item header>
              <Header as='h1' size='medium'>
                <FormattedMessage id='myInventory.myInventory'
                  defaultMessage='MY INVENTORY' />
              </Header>
            </Menu.Item>
            {selectedRows.length > 0 ? (
              <Menu.Item>
                <Header as='h3' size='small' color='grey'>
                  <FormattedMessage id='myInventory.smallHeader'
                    defaultMessage={selectedRows.length + ' products offerings selected'}
                    values={{ number: selectedRows.length }} />
                </Header>
              </Menu.Item>
            ) : ''}

            <Menu.Menu position='right'>
              <Menu.Item>
                <SubMenu />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Container>
        <div class="flex stretched" style={{ padding: '10px 32px' }}>
          <ProdexGrid
            tableName="my_inventory_grid"
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
            rowActions={[
              { text: 'Edit listing', callback: (row) => Router.push({ pathname: '/inventory/edit', query: { id: row.id } }) },
              { text: 'Custom broadcast', callback: (row) => { openBroadcast(row.id) } },
              { text: 'Delete listing', callback: (row) => { this.props.deleteProductOffer(row.id) } }
            ]}
          />
        </div>
        <Broadcast />
        <Filter
          chemicalName
          productAgeFilter
          date
          assay
          quantity
          price
          package
          condition
          productGrade
          form
          filterFunc={(filter) => { this.filterInventory({ ...filter }) }}
          savingFilters={true}
          {...this.props}
        />
      </>
    )
  }
}