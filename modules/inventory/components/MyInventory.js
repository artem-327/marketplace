import React, { Component } from 'react'
import { Container, Menu, Header, Checkbox, Icon, Popup, List, Button } from 'semantic-ui-react'
import SubMenu from '~/src/components/SubMenu'
import { FormattedMessage, injectIntl } from 'react-intl'
import Router from 'next/router'
import ProdexTable from '~/components/table'
import { Broadcast } from '~/modules/broadcast'
import { Filter } from '~/modules/filter'

import SimpleEdit from '~/modules/inventory/components/SimpleEdit'

import confirm from '~/src/components/Confirmable/confirm'
import FilterTags from '~/modules/filter/components/FitlerTags'
import cn from 'classnames'

import ProductImportPopup from '~/modules/settings/components/ProductCatalogTable/ProductImportPopup'

const defaultHiddenColumns = [
  'minOrderQuantity', 'splits', 'condition', 'grade', 'origin', 'form', 'assay',
  'mfgDate', 'expDate', 'allocatedPkg', 'offerExpiration', 'lotNumber'
]

class MyInventory extends Component {
  state = {
    columns: [
      { name: 'productName', title: <FormattedMessage id='myInventory.productName' defaultMessage='Product Name'>{(text) => text}</FormattedMessage>, width: 250, sortPath: 'ProductOffer.product.productName' },
      { name: 'productNumber', title: <FormattedMessage id='global.productCode' defaultMessage='Product Code'>{(text) => text}</FormattedMessage>, width: 160 },
      { name: 'echoName', disabled: true },
      { name: 'echoCode', disabled: true },
      { name: 'warehouse', title: <FormattedMessage id='myInventory.warehouse' defaultMessage='Warehouse'>{(text) => text}</FormattedMessage>, width: 180, sortPath: 'ProductOffer.warehouse.warehouse' },
      { name: 'available', title: <FormattedMessage id='myInventory.available' defaultMessage='Available PKGs'>{(text) => text}</FormattedMessage>, width: 130, sortPath: 'ProductOffer.quantity' },
      { name: 'packaging', title: <FormattedMessage id='myInventory.packaging' defaultMessage='Packaging'>{(text) => text}</FormattedMessage>, width: 130, sortPath: 'ProductOffer.product.packagingType.name' },
      { name: 'pkgAmount', title: <FormattedMessage id='myInventory.pkgSize' defaultMessage='Pkg. Size'>{(text) => text}</FormattedMessage>, width: 130, sortPath: 'ProductOffer.pkgAmount' },
      { name: 'quantity', title: <FormattedMessage id='myInventory.quantity' defaultMessage='Quantity'>{(text) => text}</FormattedMessage>, width: 130 },
      { name: 'cost', title: <FormattedMessage id='myInventory.cost' defaultMessage='Cost'>{(text) => text}</FormattedMessage>, width: 100 },
      { name: 'fobPrice', title: <FormattedMessage id='myInventory.fobPrice' defaultMessage='FOB Price'>{(text) => text}</FormattedMessage>, width: 180, sortPath: 'ProductOffer.pricingPrice' },
      { name: 'manufacturer', title: <FormattedMessage id='myInventory.mfr' defaultMessage='MFR.'>{(text) => text}</FormattedMessage>, width: 220 },
      { name: 'lotNumber', title: <FormattedMessage id='myInventory.lot' defaultMessage='Lot #'>{(text) => text}</FormattedMessage>, width: 70 },
      { name: 'broadcast', title: <FormattedMessage id='myInventory.broadcast' defaultMessage='Broadcast'>{(text) => text}</FormattedMessage>, width: 130, align: 'right', sortPath: 'ProductOffer.broadcasted' },
      { name: 'minOrderQuantity', title: <FormattedMessage id='myInventory.minOrderQuantity' defaultMessage='Min Order Q.'>{(text) => text}</FormattedMessage>, width: 100 },
      { name: 'splits', title: <FormattedMessage id='myInventory.splits' defaultMessage='Splits'>{(text) => text}</FormattedMessage>, width: 100 },
      { name: 'condition', title: <FormattedMessage id='myInventory.condition' defaultMessage='Condition'>{(text) => text}</FormattedMessage>, width: 100 },
      { name: 'grade', title: <FormattedMessage id='myInventory.grade' defaultMessage='Grade'>{(text) => text}</FormattedMessage>, width: 80 },
      { name: 'origin', title: <FormattedMessage id='myInventory.origin' defaultMessage='Origin'>{(text) => text}</FormattedMessage>, width: 100 },
      { name: 'form', title: <FormattedMessage id='myInventory.form' defaultMessage='Form'>{(text) => text}</FormattedMessage>, width: 120 },
      { name: 'assay', title: <FormattedMessage id='myInventory.assay' defaultMessage='Assay'>{(text) => text}</FormattedMessage>, width: 100 },
      { name: 'mfgDate', title: <FormattedMessage id='myInventory.mfgDate' defaultMessage='MFG Date'>{(text) => text}</FormattedMessage>, width: 100 },
      { name: 'expDate', title: <FormattedMessage id='myInventory.expDate' defaultMessage='EXP Date'>{(text) => text}</FormattedMessage>, width: 100 },
      { name: 'allocatedPkg', title: <FormattedMessage id='myInventory.allocatedPkg' defaultMessage='Allocated PKG'>{(text) => text}</FormattedMessage>, width: 120 },
      { name: 'offerExpiration', title: <FormattedMessage id='myInventory.offerExpiration' defaultMessage='Offer EXP'>{(text) => text}</FormattedMessage>, width: 100 },
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
          title = <FormattedMessage id='myInventory.broadcasting.active' defaultMessage='Broadcasting now, switch off to stop broadcasting.' />
          break
        case 'not broadcasting':
          title = <FormattedMessage id='myInventory.broadcasting.inactive' defaultMessage='Not Broadcasting now, switch on to start broadcasting.' />
          break
        case 'incomplete':
          title = <FormattedMessage id='myInventory.broadcasting.incomplete' defaultMessage='Incomplete, please enter all required values first.' />
          break
        case 'unmapped':
          title = <FormattedMessage id='myInventory.broadcasting.unmapped' defaultMessage='Unmapped, please make sure related Product is mapped first.' />
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
                  data-test='my_inventory_broadcast_chckb'
                  toggle
                  defaultChecked={r.status.toLowerCase() === 'broadcasting'}
                  className={cn({ error: r.status.toLowerCase() === 'incomplete' || r.status.toLowerCase() === 'unmapped' })}
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
      intl: { formatMessage },
      rows,
      datagrid,
      openImportPopup,
      isOpenImportPopup,
      simpleEditTrigger
    } = this.props
    const { columns, selectedRows } = this.state

    return (
      <>
        {isOpenImportPopup && <ProductImportPopup productOffer={true} />}

        <Container fluid style={{ padding: '0 32px' }}>
          <Menu secondary>
            <Menu.Item header>
              <Header as='h1' size='medium'>
                <FormattedMessage id='myInventory.myInventory' defaultMessage='MY INVENTORY' />
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

            <Menu.Menu position='right'>
              <Menu.Item>
                <Button
                  size='large'
                  onClick={() => simpleEditTrigger({}, true)}>
                  <FormattedMessage id='global.addInventory' defaultMessage='Add Inventory'>{text => text}</FormattedMessage>
                </Button>
              </Menu.Item>
              <Menu.Item>
                <Button
                  size='large'
                  primary
                  onClick={() => openImportPopup()}
                  data-test='my_inventory_import_btn'>
                  {formatMessage({ id: 'myInventory.import', defaultMessage: 'Import' })}
                </Button>
              </Menu.Item>
              <Menu.Item>
                <FilterTags filters={datagrid.filters} data-test='my_inventory_filter_btn' onClick={this.removeFilter} />
              </Menu.Item>
              <Menu.Item>
                <SubMenu />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Container>

        <div class='flex stretched' style={{ padding: '10px 32px' }}>

          <ProdexTable
            defaultHiddenColumns={defaultHiddenColumns}
            {...datagrid.tableProps}
            tableName='my_inventory_grid'
            columns={columns}
            rows={this.getRows(rows)}
            // rowSelection
            groupBy={['echoCode']}
            getChildGroups={rows =>
              _(rows)
                .groupBy('echoName')
                .map(v => ({
                  key: `${v[0].echoName}_${v[0].echoCode}_${v.length}`,
                  childRows: v
                }))
                .value()
            }
            renderGroupLabel={({ row: { value } }) => {
              const [name, number, count] = value.split('_')
              const numberArray = number.split(' & ')
              return (
                <span>
                  <span style={{ color: '#2599d5' }}>{numberArray.length > 1 ? (<Popup content={<List items={numberArray.map(n => { return n })} />} trigger={<span>Blend</span>} />) : number}</span>&nbsp;&nbsp; {name} <span className='right'>Product offerings: {count}</span>
                </span>
              )
            }}
            onSelectionChange={selectedRows => this.setState({ selectedRows })}
            rowActions={[
              {
                text: formatMessage({ id: 'inventory.edit', defaultMessage: 'Edit Listing' }), callback: (row) =>
                  // Router.push({ pathname: '/inventory/edit', query: { id: row.id } })
                  simpleEditTrigger(datagrid.rows.find((r) => r.id === row.id), true)
              },
              { text: formatMessage({ id: 'inventory.broadcast', defaultMessage: 'Price Book' }), callback: (row) => openBroadcast(row) },
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
          /* COMMENTED #30916
          onRowClick={(e, row) => {
            const targetTag = e.target.tagName.toLowerCase()
            if (targetTag !== 'input' && targetTag !== 'label') {
              Router.push({ pathname: '/inventory/edit', query: { id: row.id } })
            }
          }}*/
          />


        </div>
        <Broadcast />
        <SimpleEdit />
        <Filter
          onApply={this.handleFilterApply}
          onClear={this.handleFilterClear}
          savedUrl='/prodex/api/product-offers/own/datagrid/saved-filters'
          searchUrl={(text) => `/prodex/api/company-products/own/search?pattern=${text}&onlyMapped=false`}
          searchWarehouseUrl={(text) => `/prodex/api/branches/warehouses/search?pattern=${text}`}
          apiUrl={datagrid.apiUrl}
          filters={datagrid.filters}
          layout='MyInventory'
          getAutocompleteData={this.props.getAutocompleteData}
          autocompleteData={this.props.autocompleteData}
        />
      </>
    )
  }
}

export default injectIntl(MyInventory)