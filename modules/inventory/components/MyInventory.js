import React, { Component } from 'react'
import { Container, Menu, Header, Checkbox, Popup, Button } from 'semantic-ui-react'
import SubMenu from '~/src/components/SubMenu'
import { FormattedMessage, injectIntl } from 'react-intl'
import ProdexTable from '~/components/table'
import { Filter } from '~/modules/filter'

import DetailSidebar from '~/modules/inventory/components/DetailSidebar'

import confirm from '~/src/components/Confirmable/confirm'
import FilterTags from '~/modules/filter/components/FitlerTags'
import cn from 'classnames'

import { groupActions } from '~/modules/company-product-info/constants'
import ProductImportPopup from '~/modules/settings/components/ProductCatalogTable/ProductImportPopup'

import moment from 'moment/moment'
import { getSafe } from '~/utils/functions'

const defaultHiddenColumns = [
  'minOrderQuantity',
  'splits',
  'condition',
  'grade',
  'origin',
  'form',
  'assayString',
  'mfgDate',
  'expDate',
  'allocatedPkg',
  'offerExpiration',
  'lotNumber'
]

class MyInventory extends Component {
  state = {
    columns: [
      {
        name: 'productName',
        title: (
          <FormattedMessage id='global.intProductName' defaultMessage='Product Name'>
            {text => text}
          </FormattedMessage>
        ),
        width: 250,
        sortPath: 'ProductOffer.companyProduct.intProductName'
      },
      {
        name: 'productNumber',
        title: (
          <FormattedMessage id='global.intProductCode' defaultMessage='Product Code'>
            {text => text}
          </FormattedMessage>
        ),
        width: 160,
        sortPath: 'ProductOffer.companyProduct.intProductCode'
      },
      { name: 'echoName', disabled: true },
      { name: 'echoCode', disabled: true },
      {
        name: 'warehouse',
        title: (
          <FormattedMessage id='myInventory.warehouse' defaultMessage='Warehouse'>
            {text => text}
          </FormattedMessage>
        ),
        width: 180,
        sortPath: 'ProductOffer.warehouse.warehouse'
      },
      {
        name: 'available',
        title: (
          <FormattedMessage id='myInventory.available' defaultMessage='Available PKGs'>
            {text => text}
          </FormattedMessage>
        ),
        width: 130,
        align: 'right',
        sortPath: 'ProductOffer.quantity'
      },
      {
        name: 'pkgAmount',
        title: (
          <FormattedMessage id='global.pkgSize' defaultMessage='Packaging Size'>
            {text => text}
          </FormattedMessage>
        ),
        width: 130,
        align: 'right',
        sortPath: 'ProductOffer.pkgAvailable'
      },
      {
        name: 'packagingUnit',
        title: (
          <FormattedMessage id='global.packagingUnit' defaultMessage='Packaging Unit'>
            {text => text}
          </FormattedMessage>
        ),
        width: 130,
        sortPath: 'ProductOffer.companyProduct.packagingUnit.name'
      },
      {
        name: 'packaging',
        title: (
          <FormattedMessage id='global.packagingType' defaultMessage='Packaging Type'>
            {text => text}
          </FormattedMessage>
        ),
        width: 130,
        sortPath: 'ProductOffer.companyProduct.packagingType.name'
      },
      {
        name: 'quantity',
        title: (
          <FormattedMessage id='myInventory.quantity' defaultMessage='Quantity'>
            {text => text}
          </FormattedMessage>
        ),
        width: 130,
        align: 'right',
        sortPath: 'ProductOffer.quantity'
      },
      {
        name: 'cost',
        title: (
          <FormattedMessage id='myInventory.cost' defaultMessage='Cost'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100,
        align: 'right'
      },
      {
        name: 'fobPrice',
        title: (
          <FormattedMessage id='myInventory.fobPrice' defaultMessage='FOB Price'>
            {text => text}
          </FormattedMessage>
        ),
        width: 180,
        align: 'right',
        sortPath: 'ProductOffer.cfPricePerUOM'
      },
      {
        name: 'manufacturer',
        title: (
          <FormattedMessage id='global.manufacturer' defaultMessage='Manufacturer'>
            {text => text}
          </FormattedMessage>
        ),
        width: 220
      },
      // { name: 'lotNumber', title: <FormattedMessage id='myInventory.lot' defaultMessage='Lot #'>{(text) => text}</FormattedMessage>, width: 70 },
      {
        name: 'broadcast',
        title: (
          <FormattedMessage id='myInventory.broadcast' defaultMessage='Broadcast'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100,
        align: 'right',
        sortPath: 'ProductOffer.broadcasted'
      },
      {
        name: 'minOrderQuantity',
        title: (
          <FormattedMessage id='myInventory.minOrderQuantity' defaultMessage='Min Order Q.'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100
      },
      {
        name: 'splits',
        title: (
          <FormattedMessage id='myInventory.splits' defaultMessage='Splits'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100
      },
      {
        name: 'condition',
        title: (
          <FormattedMessage id='myInventory.condition' defaultMessage='Condition'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100
      },
      {
        name: 'grade',
        title: (
          <FormattedMessage id='myInventory.grade' defaultMessage='Grade'>
            {text => text}
          </FormattedMessage>
        ),
        width: 80
      },
      {
        name: 'origin',
        title: (
          <FormattedMessage id='myInventory.origin' defaultMessage='Origin'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100
      },
      {
        name: 'form',
        title: (
          <FormattedMessage id='myInventory.form' defaultMessage='Form'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'mfgDate',
        title: (
          <FormattedMessage id='myInventory.mfgDate' defaultMessage='MFR Date'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100
      },
      {
        name: 'expDate',
        title: (
          <FormattedMessage id='myInventory.expDate' defaultMessage='EXP Date'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100
      },
      {
        name: 'allocatedPkg',
        title: (
          <FormattedMessage id='myInventory.allocatedPkg' defaultMessage='Allocated PKG'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'offerExpiration',
        title: (
          <FormattedMessage id='myInventory.offerExpiration' defaultMessage='Expiration Date'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100
      }
    ],
    selectedRows: [],
    pageNumber: 0
  }

  componentDidMount() {
    const { sidebarDetailTrigger } = this.props
    if (window) {
      const searchParams = new URLSearchParams(getSafe(() => window.location.href, ''))

      if (searchParams.has('id') || searchParams.has(`${window.location.href.split('?')[0]}?id`)) {
        const idOffer = searchParams.has('id')
          ? { id: Number(searchParams.get('id')) }
          : { id: Number(searchParams.get(`${window.location.href.split('?')[0]}?id`)) }
        let tabOffer = 0

        if (searchParams.has('tab') || searchParams.has(`${window.location.href.split('?')[0]}?tab`)) {
          tabOffer = searchParams.has('tab')
            ? Number(searchParams.get('tab'))
            : Number(searchParams.get(`${window.location.href.split('?')[0]}?tab`))
        }
        sidebarDetailTrigger(idOffer, true, tabOffer)
      }
    }
    // Because of #31767
    this.props.setCompanyElligible()
  }

  filterInventory = async filter => {
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

  getRows = rows => {
    let title = ''

    return rows.map(r => {
      const isOfferValid = r.validityDate ? moment().isBefore(r.validityDate) : true

      if (this.props.sellEligible) {
        if (isOfferValid) {
          switch (r.cfStatus.toLowerCase()) {
            case 'broadcasting':
              title = (
                <FormattedMessage
                  id='myInventory.broadcasting.active'
                  defaultMessage='Broadcasting now, switch off to stop broadcasting.'
                />
              )
              break
            case 'not broadcasting':
              title = (
                <FormattedMessage
                  id='myInventory.broadcasting.inactive'
                  defaultMessage='Not Broadcasting now, switch on to start broadcasting.'
                />
              )
              break
            case 'incomplete':
              title = (
                <FormattedMessage
                  id='myInventory.broadcasting.incomplete'
                  defaultMessage='Incomplete, please enter all required values first.'
                />
              )
              break
            case 'unmapped':
              title = (
                <FormattedMessage
                  id='myInventory.broadcasting.unmapped'
                  defaultMessage='Unmapped, please make sure related Product is mapped first.'
                />
              )
              break
            default:
              title = ''
          }
        } else {
          title = (
            <FormattedMessage
              id='myInventory.broadcasting.validityExpired'
              defaultMessage='This product offer validity date has expired, so it cannot be broadcasted.'
            />
          )
        }
      } else {
        title = (
          <FormattedMessage
            id='myInventory.broadcasting.noSellEligible'
            defaultMessage='Your company is not eligible for broadcasting yet. Make sure to finalize your set-up.'
          />
        )
      }

      return {
        ...r,
        condition: r.condition ? (
          <FormattedMessage id='global.conforming' defaultMessage='Conforming' />
        ) : (
          <FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />
        ),
        broadcast: (
          <div style={{ float: 'right' }}>
            <Popup
              id={r.id}
              trigger={
                <Checkbox
                  data-test='my_inventory_broadcast_chckb'
                  toggle
                  defaultChecked={
                    r.cfStatus.toLowerCase() === 'broadcasting' && this.props.sellEligible !== false && isOfferValid
                  }
                  className={cn({
                    error:
                      this.props.sellEligible &&
                      (r.cfStatus.toLowerCase() === 'incomplete' || r.cfStatus.toLowerCase() === 'unmapped')
                  })}
                  disabled={
                    !this.props.sellEligible ||
                    r.cfStatus.toLowerCase() === 'incomplete' ||
                    r.cfStatus.toLowerCase() === 'unmapped' ||
                    !isOfferValid
                  }
                  onChange={(e, data) => {
                    e.preventDefault()
                    this.props.patchBroadcast(data.checked, r.id, r.cfStatus)
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

  tableRowClickedProductOffer = (row, bol, tab, sidebarDetailTrigger) => {
    const { isProductInfoOpen, closePopup } = this.props

    if (isProductInfoOpen) closePopup()
    sidebarDetailTrigger(row, bol, tab)
  }

  render() {
    const {
      openBroadcast,
      sidebarDetailOpen,
      intl: { formatMessage },
      rows,
      datagrid,
      openImportPopup,
      isOpenImportPopup,
      simpleEditTrigger,
      sidebarDetailTrigger,
      sidebarValues,
      openPopup,
      editedId,
      closeSidebarDetail
    } = this.props
    const { columns, selectedRows } = this.state
    
    return (
      <>
        {isOpenImportPopup && <ProductImportPopup productOffer={true} />}

        <Container fluid style={{ padding: '0 32px' }}>
          <Menu secondary className='page-part'>
            {/*selectedRows.length > 0 ? (
              <Menu.Item>
                <Header as='h3' size='small' color='grey'>
                  <FormattedMessage
                    id='myInventory.smallHeader'
                    defaultMessage={selectedRows.length + ' products offerings selected'}
                    values={{ number: selectedRows.length }}
                  />
                </Header>
              </Menu.Item>
            ) : null*/}

            <Menu.Menu position='right'>
              <Menu.Item>
                <Button
                  size='large'
                  primary
                  onClick={() => this.tableRowClickedProductOffer(null, true, 0, sidebarDetailTrigger)}
                  data-test='my_inventory_add_btn'>
                  <FormattedMessage id='global.addInventory' defaultMessage='Add Inventory'>
                    {text => text}
                  </FormattedMessage>
                </Button>
              </Menu.Item>
              {false ? (
                <Menu.Item>
                  <Button
                    size='large'
                    primary
                    onClick={() => this.tableRowClickedProductOffer(null, true, 0, sidebarDetailTrigger)}
                    data-test='my_inventory_add_btn'>
                    <FormattedMessage id='global.addInventory' defaultMessage='Add Inventory'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                </Menu.Item>
              ) : null}
              <Menu.Item>
                <Button size='large' primary onClick={() => openImportPopup()} data-test='my_inventory_import_btn'>
                  {formatMessage({
                    id: 'myInventory.import',
                    defaultMessage: 'Import'
                  })}
                </Button>
              </Menu.Item>
              <Menu.Item>
                <FilterTags datagrid={datagrid} data-test='my_inventory_filter_btn' />
              </Menu.Item>
              <Menu.Item>
                <SubMenu />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Container>

        <div className='flex stretched' style={{ padding: '10px 32px' }}>
          <ProdexTable
            defaultHiddenColumns={defaultHiddenColumns}
            {...datagrid.tableProps}
            tableName='my_inventory_grid'
            columns={columns}
            rows={this.getRows(rows)}
            selectByRowClick
            rowSelection
            highlightRow
            hideCheckboxes
            singleSelectionRow
            groupBy={['echoCode']}
            getChildGroups={rows =>
              _(rows)
                .groupBy('echoName')
                .map(v => {
                  return {
                    key: `${v[0].echoName}_${v[0].echoCode}_${v.length}_${v[0].companyProduct.id}`,
                    childRows: v
                  }
                })
                .value()
            }
            renderGroupLabel={({ row, children = null }) => {
              let { value } = row
              const [name, number, count] = value.split('_')

              return (
                <span>
                  {children}
                  <span style={{ color: '#2599d5' }}>{name ? name : 'Unmapped'}</span>
                  <span className='right'>Product offerings: {count}</span>
                </span>
              )
            }}
            onSelectionChange={selectedRows => this.setState({ selectedRows })}
            groupActions={row => {
              let values = row.key.split('_')
              return groupActions(
                rows,
                values[values.length - 1],
                sidebarDetailOpen,
                //! ! sidebarDetailTrigger,
                closeSidebarDetail,
                openPopup
              ).map(a => ({
                ...a,
                text: <FormattedMessage {...a.text}>{text => text}</FormattedMessage>
              }))
            }}
            rowActions={[
              /*{
                text: formatMessage({ id: 'inventory.edit', defaultMessage: 'Edit Listing' }), callback: (row) =>
                  // Router.push({ pathname: '/inventory/edit', query: { id: row.id } })
                  simpleEditTrigger(datagrid.rows.find((r) => r.id === row.id), true)
              },*/
              {
                text: formatMessage({
                  id: 'global.edit',
                  defaultMessage: 'Edit'
                }),
                callback: row => this.tableRowClickedProductOffer(row, true, 0, sidebarDetailTrigger)
              },
              //{ text: formatMessage({ id: 'inventory.broadcast', defaultMessage: 'Price Book' }), callback: (row) => openBroadcast(row) },
              {
                text: formatMessage({
                  id: 'global.documents',
                  defaultMessage: 'Documents'
                }),
                callback: row => this.tableRowClickedProductOffer(row, true, 1, sidebarDetailTrigger)
              },
              {
                text: formatMessage({
                  id: 'inventory.broadcast',
                  defaultMessage: 'Price Book'
                }),
                callback: row => this.tableRowClickedProductOffer(row, true, 2, sidebarDetailTrigger)
              },
              {
                text: formatMessage({
                  id: 'inventory.priceTiers',
                  defaultMessage: 'Price Tiers'
                }),
                callback: row => this.tableRowClickedProductOffer(row, true, 3, sidebarDetailTrigger)
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
                      id: 'confirm.deleteOfferHeader',
                      defaultMessage: 'Delete Product Offer'
                    }),
                    formatMessage(
                      {
                        id: 'confirm.deleteItem',
                        defaultMessage: `Do you really want to remove ${row.chemicalName}?`
                      },
                      {item: row.chemicalName}
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
        {sidebarDetailOpen && <DetailSidebar />}
        <Filter
          onApply={this.handleFilterApply}
          onClear={this.handleFilterClear}
          savedUrl='/prodex/api/product-offers/own/datagrid/saved-filters'
          searchUrl={text => `/prodex/api/company-products/own/search?pattern=${text}&onlyMapped=false`}
          searchWarehouseUrl={text => `/prodex/api/branches/warehouses/search?pattern=${text}`}
          apiUrl={datagrid.apiUrl}
          filters={datagrid.filters}
          layout='MyInventory'
          autocompleteDataLoading={this.props.autocompleteDataLoading}
          getAutocompleteData={this.props.getAutocompleteData}
          autocompleteData={this.props.autocompleteData}
        />
      </>
    )
  }
}

export default injectIntl(MyInventory)
