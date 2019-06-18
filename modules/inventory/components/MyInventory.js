import React, { Component } from "react"
import { Container, Menu, Header, Checkbox, Icon, Popup } from "semantic-ui-react"
import SubMenu from '~/src/components/SubMenu'
import { FormattedMessage, injectIntl } from 'react-intl'
import Router from 'next/router'
import ProdexTable from '~/components/table'
import { Broadcast } from '~/modules/broadcast'
import { Filter } from '~/modules/filter'

import confirm from '~/src/components/Confirmable/confirm'
import FilterTags from '~/modules/filter/components/FitlerTags'

class MyInventory extends Component {
  state = {
    columns: [
      { name: "productName", title: "Product Name", width: 250 },
      { name: "productNumber", title: "Product Number" },
      { name: "warehouse", title: "Warehouse", width: 180 },
      { name: "available", title: "Available", width: 80 },
      { name: "packaging", title: "Packaging" },
      { name: "pkgAmount", title: "Pkg. Size" },
      { name: "quantity", title: "Quantity" },
      { name: "cost", title: "Cost" },
      { name: "fobPrice", title: "FOB Price" },
      { name: "manufacturer", title: "MFR.", width: 220 },
      { name: "broadcast", title: "Broadcast", width: 120 }
    ],
    selectedRows: [],
    pageNumber: 0
  }

  componentDidMount() {
    const { datagrid } = this.props

    datagrid.loadData()
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
    //this.props.getMyProductOffers(filter, PAGE_SIZE)
  }

  getRows = (rows) => {
    let title = ''

    return rows.map(r => {
      switch (r.status.toLowerCase()) {
        case 'broadcasting':
          title = 'Broadcasting now, switch off to stop broadcasting.'
          break
        case 'not broadcasting':
          title = 'Not Broadcasting now, switch on to start broadcasting.'
          break
        case 'incomplete':
          title = 'Incomplete, please enter all required values first.'
          break
        case 'unmapped':
          title = 'Unmapped, please make sure related Product is mapped first.'
          break
        default:
          title = ''
      }

      return {
        ...r,
        broadcast: (
          <div style={{ float: 'right' }}>
            <Popup id={r.id}
              trigger={
                <Checkbox toggle={true}
                  defaultChecked={r.status.toLowerCase() === 'broadcasting'}
                  disabled={r.status.toLowerCase() === 'incomplete' || r.status.toLowerCase() === 'unmapped'}
                  onChange={(e, data) => {
                    e.preventDefault()
                    this.props.patchBroadcast(data.checked, r.id, r.status)
                  }} />
              }
              content={title}
            />
          </div>
        )
      }
    })
  }

  handleFilterApply = filter => {
    const { datagrid } = this.props

    datagrid.setFilter(filter)
  }

  handleFilterClear = () => {
    let { datagrid } = this.props

    datagrid.setFilter({ filters: [] })
  }

  removeFilter = (i) => {
    let { datagrid } = this.props
    let { filters } = datagrid

    filters.splice(i, 1)
    datagrid.setFilter(filters)
  }

  render() {
    const {
      openBroadcast,
      intl,
      rows,
      datagrid
    } = this.props
    const { columns, selectedRows } = this.state

    let { formatMessage } = intl

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
            ) : null}

            <Menu.Menu position="right">
              <Menu.Item>
                <FilterTags filters={datagrid.filters} onClick={this.removeFilter} />
              </Menu.Item>
              <Menu.Item>
                <SubMenu />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Container>

        <div class="flex stretched" style={{ padding: '10px 32px' }}>

          <ProdexTable
            tableName="my_inventory_grid"
            rows={this.getRows(rows)}
            onScrollToEnd={datagrid.onScrollToEnd}
            loading={datagrid.loading}

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
              {
                text: 'Delete listing', callback: (row) => {
                  confirm(
                    formatMessage({ id: 'confirm.deleteOfferHeader', defaultMessage: 'Delete Product Offer' }),
                    formatMessage({ id: 'confirm.deleteItem', defaultMessage: `Do you really want to remove ${row.chemicalName}?` },
                      { item: row.chemicalName }
                    )
                  ).then(() => {
                    this.props.deleteProductOffer(row.id)
                    datagrid.removeRow(row.id)
                  })
                }
              }
            ]}
            onRowClick={(e, row) => {
              const targetTag = e.target.tagName.toLowerCase()
              if (targetTag !== 'input' && targetTag !== 'label') {
                Router.push({ pathname: '/inventory/edit', query: { id: row.id } })
              }
            }}
          />


        </div>
        <Broadcast />
        <Filter
          onApply={this.handleFilterApply}
          onClear={this.handleFilterClear}
          savedUrl='/prodex/api/product-offers/own/datagrid/saved-filters'
          searchUrl={(text) => `/prodex/api/products/own/search?pattern=${text}&onlyMapped=false`}
          filters={datagrid.filters}
        />
      </>
    )
  }
}

export default injectIntl(MyInventory)
