import React, { Component } from "react"
import { Container, Menu, Header, Checkbox, Icon, Popup, List, Button } from "semantic-ui-react"
import SubMenu from '~/src/components/SubMenu'
import { FormattedMessage, injectIntl } from 'react-intl'
import Router from 'next/router'
import ProdexTable from '~/components/table'
import { Broadcast } from '~/modules/broadcast'
import { Filter } from '~/modules/filter'

import confirm from '~/src/components/Confirmable/confirm'
import FilterTags from '~/modules/filter/components/FitlerTags'
import cn from 'classnames'

import ProductImportPopup from '~/modules/settings/components/ProductCatalogTable/ProductImportPopup'

class MyInventory extends Component {
  state = {
    columns: [
      { name: "productName", title: "Product Name", width: 250, sortPath: 'ProductOffer.product.productName' },
      { name: "productNumber", title: "Product Number", width: 160 },
      { name: "casNumberCombined", title: "CAS Number(s)" },
      { name: "warehouse", title: "Warehouse", width: 180, sortPath: 'ProductOffer.warehouse.warehouse' },
      { name: "available", title: "Available", width: 80, sortPath: 'ProductOffer.quantity' },
      { name: "packaging", title: "Packaging", sortPath: 'ProductOffer.product.packagingType.name' },
      { name: "pkgAmount", title: "Pkg. Size", sortPath: 'ProductOffer.pkgAmount' },
      { name: "quantity", title: "Quantity" },
      { name: "cost", title: "Cost" },
      { name: "fobPrice", title: "FOB Price", sortPath: 'ProductOffer.pricingPrice' },
      { name: "manufacturer", title: "MFR.", width: 220 },
      { name: "lotNumber", title: "Lot #", width: 100 },
      { name: "broadcast", title: "Broadcast", width: 120, align: 'right', sortPath: 'ProductOffer.broadcasted' }
    ],
    selectedRows: [],
    pageNumber: 0
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
                <Checkbox
                  data-test='my_inventory_broadcast'
                  toggle
                  defaultChecked={r.status.toLowerCase() === 'broadcasting'}
                  className={cn({error: r.status.toLowerCase() === 'incomplete' || r.status.toLowerCase() === 'unmapped'})}
                  disabled={r.status.toLowerCase() === 'incomplete' || r.status.toLowerCase() === 'unmapped'}
                  onChange={(e, data) => {
                    e.preventDefault()
                    this.props.patchBroadcast(data.checked, r.id, r.status)
                  }} 
                />
              }
              content={title}
            />
          </div>
        )
      }
    })
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
    const {
      openBroadcast,
      intl,
      rows,
      datagrid,
      openImportPopup,
      isOpenImportPopup
    } = this.props
    const { columns, selectedRows } = this.state

    let { formatMessage } = intl

    return (
      <>
        {isOpenImportPopup && <ProductImportPopup productOffer={true} />}

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
                <Button
                  size="large"
                  primary
                  onClick={() => openImportPopup()}
                  data-test='my_inventory_import'
                >
                  Import
                </Button>
              </Menu.Item>
              <Menu.Item>
                <FilterTags filters={datagrid.filters} data-test='my_inventory_filter' onClick={this.removeFilter} />
              </Menu.Item>
              <Menu.Item>
                <SubMenu />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Container>

        <div class="flex stretched" style={{ padding: '10px 32px' }}>

          <ProdexTable
            {...datagrid.tableProps}
            tableName="my_inventory_grid"
            columns={columns}
            rows={this.getRows(rows)}
            // rowSelection
            groupBy={['casNumberCombined']}
            getChildGroups={rows =>
              _(rows)
                .groupBy('productName')
                .map(v => ({
                  key: `${v[0].productName}_${v[0].casNumberCombined}_${v.length}`,
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
            rowActions={[
              { text: formatMessage({ id: 'inventory.edit', defaultMessage: 'Edit Listing' }), callback: (row) => Router.push({ pathname: '/inventory/edit', query: { id: row.id } }) },
              { text: formatMessage({ id: 'inventory.broadcast', defaultMessage: 'Price Book' }), callback: (row) => { openBroadcast(row) } },
              {
                text: formatMessage({ id: 'inventory.delete', defaultMessage: 'Delete Listing' }), callback: (row) => {
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
          searchWarehouseUrl={(text) => `/prodex/api/branches/warehouses/search?pattern=${text}`}
          apiUrl={datagrid.apiUrl}
          filters={datagrid.filters}
          layout='MyInventory'
        />
      </>
    )
  }
}

export default injectIntl(MyInventory)
