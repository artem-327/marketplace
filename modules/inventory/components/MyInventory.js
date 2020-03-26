import React, { Component } from 'react'
import { Container, Menu, Header, Modal, Checkbox, Popup, Button } from 'semantic-ui-react'
import SubMenu from '~/src/components/SubMenu'
import { FormattedMessage, injectIntl } from 'react-intl'
import ProdexTable from '~/components/table'

import DetailSidebar from '~/modules/inventory/components/DetailSidebar'

import confirm from '~/src/components/Confirmable/confirm'
import FilterTags from '~/modules/filter/components/FitlerTags'
import cn from 'classnames'

import { groupActions } from '~/modules/company-product-info/constants'
import ProductImportPopup from '~/modules/settings/components/ProductCatalogTable/ProductImportPopup'

import moment from 'moment/moment'
import { getSafe } from '~/utils/functions'
import { Datagrid } from '~/modules/datagrid'
import styled from 'styled-components'
import Tutorial from '~/modules/tutorial/Tutorial'

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

const MenuItemFilters = styled(Menu.Item)`
  max-width: 40vw;
`

const CustomProdexTable = styled(ProdexTable)`
  .dx-g-bs4-table-container {
    overflow: hidden;
  }
`

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
      },
      {
        name: 'groupId',
        title: (
          <FormattedMessage id='myInventory.groupId' defaultMessage='Group ID'>
            {text => text}
          </FormattedMessage>
        ),
        width: 200
      },
      {
        name: 'lotNumber',
        title: (
          <FormattedMessage id='myInventory.lotNumber' defaultMessage='Lot Number'>
            {text => text}
          </FormattedMessage>
        ),
        width: 200
      }
    ],
    selectedRows: [],
    // pageNumber: 0,
    open: false,
    clientMessage: '',
    request: null
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
    this.handleFilterClear()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { datagridFilterUpdate, datagridFilter, datagrid } = this.props
    if (prevProps.datagridFilterUpdate !== datagridFilterUpdate) {
      datagrid.setFilter(datagridFilter)
    }
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

    return rows.map((r, rIndex) => {
      const isOfferValid = r.validityDate ? moment().isBefore(r.validityDate) : true

      if (r.groupId) {
        title = (
          <FormattedMessage
            id='myInventory.broadcasting.disabled'
            defaultMessage='This Product Offer is part of virtual Product Group, its broadcast setting cannot be changed. If you wish not to broadcast it, remove it from the group.'
          />
        )
      } else if (isOfferValid) {
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
            title = (
              <FormattedMessage id='myInventory.broadcasting.notAvailable' defaultMessage='Status is not available' />
            )
        }
      } else {
        title = (
          <FormattedMessage
            id='myInventory.broadcasting.validityExpired'
            defaultMessage='This product offer validity date has expired, so it cannot be broadcasted.'
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
              position={rIndex === 0 ? 'bottom right' : 'top right'}
              trigger={
                <Checkbox
                  data-test='my_inventory_broadcast_chckb'
                  toggle
                  defaultChecked={r.cfStatus.toLowerCase() === 'broadcasting' && isOfferValid}
                  className={cn({
                    error: r.cfStatus.toLowerCase() === 'incomplete' || r.cfStatus.toLowerCase() === 'unmapped'
                  })}
                  disabled={
                    r.cfStatus.toLowerCase() === 'incomplete' ||
                    r.cfStatus.toLowerCase() === 'unmapped' ||
                    r.cfStatus.toLowerCase() === 'n/a' ||
                    !isOfferValid ||
                    r.groupId
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

  // ! ! delete
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

  showMessage = (response, request = null) => {
    response &&
      response.value &&
      response.value.productOfferStatuses &&
      response.value.productOfferStatuses.length &&
      response.value.productOfferStatuses.map(status => {
        if (!status.code) return
        if (status.code === 'GROUPED') {
          const rowData = this.getRows(this.props.rows).filter(row => row.id === status.productOfferId)
          Datagrid.updateRow(status.productOfferId, () => ({
            ...rowData[0],
            parentOffer: status.virtualOfferId ? status.virtualOfferId : ''
          }))
        } else if (status.code === 'BROADCAST_RULE_CONFLICT') {
          this.setState({ open: true, clientMessage: status.clientMessage, request })
        } else if (status.code === 'DETACHED') {
          const rowData = this.getRows(this.props.rows).filter(row => row.id === status.productOfferId)
          Datagrid.updateRow(status.productOfferId, () => ({
            ...rowData[0],
            parentOffer: ''
          }))
        }
      })
  }

  groupOffer = async request => {
    const { groupOffers } = this.props
    try {
      const response = await groupOffers(request)
      this.showMessage(response, request)
    } catch (error) {
      console.error(error)
    }
  }

  detachOffer = async productOfferIds => {
    const { detachOffers } = this.props
    try {
      const response = await detachOffers(productOfferIds)
      this.showMessage(response)
    } catch (error) {
      console.error(error)
    }
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
      closeSidebarDetail,
      tutorialCompleted
    } = this.props
    const { columns, selectedRows, clientMessage, request } = this.state
    return (
      <>
        <Modal size='small' open={this.state.open} onClose={() => this.setState({ open: false })} closeIcon>
          <Modal.Header>
            <FormattedMessage
              id='notifications.groupedOffer.conflict.header'
              defaultMessage='Broadcast rule conflict'
            />
          </Modal.Header>
          <Modal.Content>{clientMessage}</Modal.Content>
          <Modal.Actions>
            <FormattedMessage
              id='notifications.groupedOffer.conflict.discard'
              defaultMessage='Do you want to discard rules of current offer?'
            />
            <Button negative onClick={() => this.setState({ open: false })}>
              <FormattedMessage id='"global.no"' defaultMessage='No' />
            </Button>
            <Button
              positive
              onClick={e => {
                e.preventDefault()
                if (!request) return
                this.groupOffer({ ...request, overrideBroadcastRules: true })
                this.setState({ open: false })
              }}>
              <FormattedMessage id='"global.yes"' defaultMessage='Yes' />
            </Button>
          </Modal.Actions>
        </Modal>
        {isOpenImportPopup && <ProductImportPopup productOffer={true} />}
        {!tutorialCompleted && <Tutorial />}
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
              <Menu.Item>
                <Button size='large' primary onClick={() => openImportPopup()} data-test='my_inventory_import_btn'>
                  {formatMessage({
                    id: 'myInventory.import',
                    defaultMessage: 'Import'
                  })}
                </Button>
              </Menu.Item>
              <MenuItemFilters>
                <FilterTags datagrid={datagrid} data-test='my_inventory_filter_btn' />
              </MenuItemFilters>
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
            hideCheckboxes
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
                disabled: row => row.groupId,
                callback: row => this.tableRowClickedProductOffer(row, true, 1, sidebarDetailTrigger)
              },
              {
                text: formatMessage({
                  id: 'inventory.broadcast',
                  defaultMessage: 'Price Book'
                }),
                disabled: row => row.groupId,
                callback: row => this.tableRowClickedProductOffer(row, true, 2, sidebarDetailTrigger)
              },
              {
                text: formatMessage({
                  id: 'inventory.priceTiers',
                  defaultMessage: 'Price Tiers'
                }),
                disabled: row => row.groupId,
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
                      { item: row.chemicalName }
                    )
                  ).then(() => {
                    this.props.deleteProductOffer(row.id)
                    datagrid.removeRow(row.id)
                  })
                }
              },
              {
                text: formatMessage({
                  id: 'inventory.groupOffer',
                  defaultMessage: 'Join/Create Virtual Group'
                }),
                callback: row =>
                  this.groupOffer({
                    overrideBroadcastRules: false,
                    productOfferIds: [row.id]
                  }),
                disabled: row => !!row.parentOffer
              },
              {
                text: formatMessage({
                  id: 'inventory.detachOffer',
                  defaultMessage: 'Detach from Virtual Group'
                }),
                callback: row => this.detachOffer([row.id]),
                disabled: row => !row.parentOffer
              }
            ]}
            /* COMMENTED #30916
          onRowClick={(e, row) => {
            const targetTag = e.target.tagName.toLowerCase()
            if (targetTag !== 'input' && targetTag !== 'label') {
              Router.push({ pathname: '/inventory/edit', query: { id: row.id } })
            }
          }}*/
            editingRowId={editedId}
          />
        </div>
        {sidebarDetailOpen && <DetailSidebar />}
      </>
    )
  }
}

export default injectIntl(MyInventory)
