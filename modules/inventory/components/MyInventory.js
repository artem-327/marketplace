import React, { Component } from 'react'
import cn from 'classnames'
import moment from 'moment/moment'
import { debounce } from 'lodash'
import { Clock, FileText, CornerLeftUp, CornerLeftDown, PlusCircle } from 'react-feather'
import { Container, Menu, Header, Modal, Checkbox, Popup, Button, Grid, Input, Dropdown } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
import styled from 'styled-components'

import ProdexTable from '~/components/table'
import DetailSidebar from '~/modules/inventory/components/DetailSidebar'
import QuickEditPricingPopup from '~/modules/inventory/components/QuickEditPricingPopup'
import confirm from '~/src/components/Confirmable/confirm'
import FilterTags from '~/modules/filter/components/FitlerTags'
import { groupActions } from '~/modules/company-product-info/constants'
import ProductImportPopup from '~/modules/settings/components/ProductCatalogTable/ProductImportPopup'
import { getSafe, uniqueArrayByKey, generateToastMarkup } from '~/utils/functions'
import Tutorial from '~/modules/tutorial/Tutorial'
import SearchByNamesAndTags from '~/modules/search'
import SubMenu from '~/src/components/SubMenu'
import ExportInventorySidebar from '~/modules/export-inventory/components/ExportInventory'

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

const ClockIcon = styled(Clock)`
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

const FileTextIcon = styled(FileText)`
  display: block;
  width: 20px;
  height: 20px;
  margin: 0 auto;
  vertical-align: top;
  font-size: 20px;
  color: #f16844;
  line-height: 20px;

  &.grey {
    color: #848893;
  }
`

const StyledPopup = styled(Popup)`
  max-width: 90% !important;
  padding: 0 !important;
  border-radius: 4px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #dee2e6;
  background-color: #ffffff;

  .ui.form {
    width: 570px;
    padding: 0;
  }
`

const StyledMenu = styled(Menu)`
  .item .ui.button {
    height: 40px;
    border-radius: 3px;
    font-weight: 500;
    color: #848893;   
    display: flex;
    align-items: center;

    svg {
        width: 18px;
        height: 20px;
        margin-right: 10px;
        vertical-align: top;
        color: inherit;
      }
      
    &.light {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
      border: solid 1px #dee2e6;
      background-color: #ffffff;
      color: #848893;    
      &:hover {
        background-color: #f8f9fb;
        color: #20273a;
      }
      &:active {
        background-color: #edeef2;
        color: #20273a;
      }
    }
    
    &.secondary {
      color: #ffffff;
      background-color: #2599d5;
      &:hover {
        background-color: #188ec9;
      }
      &:active {
        background-color: #0d82bc;
      }
    }
  }
`

class MyInventory extends Component {
  state = {
    columns: [
      {
        name: 'expired',
        title: <ClockIcon className='grey' />,
        width: 40,
        align: 'center'
      },
      {
        name: 'productStatus',
        title: <FileTextIcon className='grey' />,
        width: 40,
        align: 'center'
      },
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
          <FormattedMessage id='myInventory.expDate' defaultMessage='Lot Exp. Date'>
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
          <FormattedMessage id='myInventory.offerExpiration' defaultMessage='Offer Exp. Date'>
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
    request: null,
    selectedTagsOptions: []
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
    try {
      this.props.setCompanyElligible()
    } catch (error) {
      console.error(error)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { datagridFilterUpdate, datagridFilter, datagrid } = this.props

    if (prevProps.datagridFilterUpdate !== datagridFilterUpdate) {
      datagrid.setFilter(datagridFilter, true, 'myInventoryFilter')
    }
  }

  getRows = rows => {
    const { datagrid, pricingEditOpenId, setPricingEditOpenId, toastManager } = this.props
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
          case 'unpublished':
            title = (
              <FormattedMessage
                id='myInventory.broadcasting.unpublished'
                defaultMessage='Unpublished, please make sure related Product is published first.'
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

      let productStatusText = null
      switch (r.cfStatus) {
        case 'Unpublished': {
          productStatusText = (
            <FormattedMessage
              id='global.notPublished'
              defaultMessage='This echo product is not published and will not show on the Marketplace.'
            />
          )
          break
        }
        case 'Unmapped': {
          productStatusText = (
            <FormattedMessage
              id='myInventory.productStatus.unmapped'
              defaultMessage="This Offer's Company Product is not mapped to Echo Product, so it will not be visible to other users at Marketplace."
            />
          )
          break
        }
      }

      return {
        ...r,
        expired: r.expired ? (
          <Popup
            header={<FormattedMessage id='global.expiredProduct.tooltip' defaultMessage='Expired Product' />}
            trigger={
              <div>
                <ClockIcon />
              </div>
            } // <div> has to be there otherwise popup will be not shown
          />
        ) : null,
        productStatus: (productStatusText
          ? (
            <Popup
              size='small'
              header={productStatusText}
              trigger={
                <div>
                  <FileTextIcon />
                </div>
              } // <div> has to be there otherwise popup will be not shown
            />
          )
          : null
        ),
        condition: r.condition ? (
          <FormattedMessage id='global.conforming' defaultMessage='Conforming' />
        ) : (
          <FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />
        ),
        fobPrice: (
          <StyledPopup
            content={<QuickEditPricingPopup rawData={r.rawData} />}
            on='click'
            pinned
            position='left center'
            trigger={<div>{r.fobPrice}</div>}
            open={pricingEditOpenId === r.rawData.id}
            onOpen={() => setPricingEditOpenId(r.rawData.id)}
            onClose={() => setPricingEditOpenId(null)}
          />
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
                    error:
                      r.cfStatus.toLowerCase() === 'incomplete' ||
                      r.cfStatus.toLowerCase() === 'unmapped' ||
                      r.cfStatus.toLowerCase() === 'unpublished'
                  })}
                  disabled={
                    r.cfStatus.toLowerCase() === 'incomplete' ||
                    r.cfStatus.toLowerCase() === 'unmapped' ||
                    r.cfStatus.toLowerCase() === 'unpublished' ||
                    r.cfStatus.toLowerCase() === 'n/a' ||
                    !isOfferValid ||
                    !!r.groupId
                  }
                  onChange={(e, data) => {
                    e.preventDefault()
                    try {
                      this.props.patchBroadcast(data.checked, r.id, r.cfStatus)
                      datagrid.updateRow(r.id, () => ({
                        ...r.rawData,
                        cfStatus: data.checked ? 'Broadcasting' : 'Not broadcasting'
                      }))
                    } catch (error) {
                      console.error(error)
                    }
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

  tableRowClickedProductOffer = (row, bol, tab, sidebarDetailTrigger) => {
    const { isProductInfoOpen, closePopup, isExportInventoryOpen, setExportSidebarOpenState } = this.props

    if (isProductInfoOpen) closePopup()
    if (isExportInventoryOpen) setExportSidebarOpenState(false)
    sidebarDetailTrigger(row, bol, tab)
  }

  showMessage = (response, request = null, row) => {
    const { toastManager, datagrid } = this.props
    response &&
      response.value &&
      response.value.productOfferStatuses &&
      response.value.productOfferStatuses.length &&
      response.value.productOfferStatuses.map(status => {
        if (!status.code) return
        if (status.code === 'GROUPED') {
          datagrid.updateRow(status.productOfferId, () => ({
            ...row,
            warehouse: { deliveryAddress: { cfName: row.warehouse } },
            parentOffer: status.virtualOfferId ? status.virtualOfferId : ''
          }))
          toastManager.add(
            generateToastMarkup(
              <FormattedMessage id={`success.title`} defaultMessage='Success' />,
              `${status.clientMessage}`
            ),
            {
              appearance: 'success'
            }
          )
        } else if (status.code === 'BROADCAST_RULE_CONFLICT') {
          this.setState({ open: true, clientMessage: status.clientMessage, request })
        } else if (status.code === 'DETACHED') {
          datagrid.updateRow(status.productOfferId, () => ({
            ...row,
            warehouse: { deliveryAddress: { cfName: row.warehouse } },
            parentOffer: ''
          }))
          toastManager.add(
            generateToastMarkup(
              <FormattedMessage id={`success.title`} defaultMessage='Success' />,
              `${status.clientMessage}`
            ),
            {
              appearance: 'success'
            }
          )
        } else if (status.code === 'ERROR') {
          toastManager.add(
            generateToastMarkup(
              <FormattedMessage id={`error.title`} defaultMessage='Error' />,
              `${status.clientMessage}`
            ),
            {
              appearance: 'error'
            }
          )
        }
      })
  }

  groupOffer = async (request, row) => {
    const { groupOffers } = this.props
    try {
      const response = await groupOffers(request)
      this.showMessage(response, request, row)
    } catch (error) {
      console.error(error)
    }
  }

  detachOffer = async (productOfferIds, row) => {
    const { detachOffers } = this.props
    try {
      const response = await detachOffers(productOfferIds)
      this.showMessage(response, null, row)
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
      openPopup,
      editedId,
      closeSidebarDetail,
      tutorialCompleted,
      isExportInventoryOpen,
      setExportSidebarOpenState
    } = this.props
    const { columns, clientMessage, request } = this.state

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
        <Container fluid style={{ padding: '10px 32px 0' }}>
          <Grid>
            <Grid.Row>
              <SearchByNamesAndTags />

              <Grid.Column width={8}>
                <StyledMenu secondary className='page-part'>
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
                        className='light'
                        size='large'
                        primary
                        onClick={() => setExportSidebarOpenState(true)}
                        data-test='my_inventory_export_btn'>
                        <CornerLeftUp />
                        {formatMessage({
                          id: 'myInventory.export',
                          defaultMessage: 'Export'
                        })}
                      </Button>
                    </Menu.Item>
                    <Menu.Item>
                      <Button
                        className='light'
                        size='large'
                        primary
                        onClick={() => openImportPopup()}
                        data-test='my_inventory_import_btn'>
                        <CornerLeftDown />
                        {formatMessage({
                          id: 'myInventory.import',
                          defaultMessage: 'Import'
                        })}
                      </Button>
                    </Menu.Item>
                    <Menu.Item>
                      <Button
                        className='secondary'
                        size='large'
                        primary
                        onClick={() => this.tableRowClickedProductOffer(null, true, 0, sidebarDetailTrigger)}
                        data-test='my_inventory_add_btn'>
                        <PlusCircle />
                        <FormattedMessage id='global.addInventory' defaultMessage='Add Inventory'>
                          {text => text}
                        </FormattedMessage>
                      </Button>
                    </Menu.Item>
                    <MenuItemFilters>
                      <FilterTags datagrid={datagrid} data-test='my_inventory_filter_btn' />
                    </MenuItemFilters>
                  </Menu.Menu>
                </StyledMenu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
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
                closeSidebarDetail,
                (companyProduct, i) => {
                  if (isExportInventoryOpen) setExportSidebarOpenState(false)
                  openPopup(companyProduct, i)
                }
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
                  this.groupOffer(
                    {
                      overrideBroadcastRules: false,
                      productOfferIds: [row.id]
                    },
                    row
                  ),
                disabled: row => !!row.parentOffer
              },
              {
                text: formatMessage({
                  id: 'inventory.detachOffer',
                  defaultMessage: 'Detach from Virtual Group'
                }),
                callback: row => this.detachOffer([row.id], row),
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
        {isExportInventoryOpen && <ExportInventorySidebar onClose={() => setExportSidebarOpenState(false)}/>}
      </>
    )
  }
}

export default injectIntl(withToastManager(MyInventory))
