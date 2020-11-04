import React, { Component } from 'react'
import cn from 'classnames'
import moment from 'moment/moment'
import { debounce } from 'lodash'
import { Clock, FileText, CornerLeftUp, CornerLeftDown, MoreVertical, PlusCircle, Sliders } from 'react-feather'
import { Container, Menu, Header, Modal, Checkbox, Popup, Button, Grid, Input, Dropdown } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
import styled from 'styled-components'

import ProdexTable from '~/components/table'
import DetailSidebar from '~/modules/inventory/my-listings/components/DetailSidebar'
import QuickEditPricingPopup from '~/modules/inventory/my-listings/components/QuickEditPricingPopup'
import confirm from '~/src/components/Confirmable/confirm'
import FilterTags from '~/modules/filter/components/FitlerTags'
import { groupActions } from '~/modules/company-product-info/constants'
import ProductImportPopup from '~/modules/inventory/my-products/components/ProductImportPopup'
import { getSafe, uniqueArrayByKey, generateToastMarkup } from '~/utils/functions'
import Tutorial from '~/modules/tutorial/Tutorial'
import SearchByNamesAndTags from '~/modules/search'
import ExportInventorySidebar from '~/modules/export-inventory/components/ExportInventory'
import ColumnSettingButton from '~/components/table/ColumnSettingButton'
import { ArrayToFirstItem } from '~/components/formatted-messages'
import { CustomRowDiv } from '../../constants/layout'
import { InventoryFilter } from '~/modules/filter'

const defaultHiddenColumns = [
  'productNumber',
  'manufacturer',
  'cost',
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
  'groupId',
  'lotNumber'
]

const FiltersRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: -5px;
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
    color: #20273a;
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
    color: #20273a;
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

const CustomSearchNameTags = styled.div`
  .column {
    width: 370px;
    padding-top: 0 !important;
  }
`

const CapitalizedText = styled.span`
  text-transform: capitalize;
`

const DivRow = styled.div`
  display: flex !important;
`

const SpanText = styled.span`
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    font-weight: bold;
    color: #2599d5;
  }
`

const DivIcons = styled.div`
  position: -webkit-sticky !important;
  position: sticky !important;
  right: 0px !important;
  display: flex !important;
  margin-left: 10px !important;
`

const FobPrice = styled.div`
  text-decoration: underline;
  text-decoration-style: dotted;
  cursor: pointer;

  &:hover {
    //text-decoration-style: solid;
    text-decoration: none;
    font-weight: bold;
    color: #2599d5;
  }
`

const RowDropDownIcon = styled.div`
  width: 16px;
  height: 16px;
  margin: 2px 0 2px -4px;

  svg {
    width: 16px !important;
    height: 16px !important;
    color: #848893 !important;
  }
`

class MyListings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        {
          name: 'broadcast',
          title: (
            <FormattedMessage id='myInventory.broadcast' defaultMessage='Broadcast'>
              {text => text}
            </FormattedMessage>
          ),
          width: 100,
          align: 'left',
          sortPath: 'ProductOffer.broadcasted'
        },
        {
          name: 'actCol',
          title: ' ',
          width: 30,
          actions: this.getActions()
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
          name: 'packaging',
          title: (
            <FormattedMessage id='myInventory.packaging' defaultMessage='Packaging'>
              {text => text}
            </FormattedMessage>
          ),
          width: 150
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
      filterValues: {
        SearchByNamesAndTags: null
      },
      rows: []
    }
  }

  componentDidMount = async () => {
    const { sidebarDetailTrigger, myListingsFilters, advancedFilters, datagrid, applyDatagridFilter } = this.props
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

    if (myListingsFilters) {
      this.setState({ filterValues: myListingsFilters }, () => {
        const filter = {
          ...this.state.filterValues,
          ...(!!this.state.filterValues.SearchByNamesAndTags && {
            ...this.state.filterValues.SearchByNamesAndTags.filters
          })
        }
        datagrid.setSearch(filter, !advancedFilters.filters, 'pageFilters')
      })
    } else {
      datagrid.setSearch(this.state.filterValues, !advancedFilters.filters, 'pageFilters')
    }

    if (advancedFilters.filters) {
      let datagridFilter = this.toDatagridFilter(advancedFilters)
      applyDatagridFilter(datagridFilter, true)
    }
  }

  componentWillUnmount() {
    const {
      sidebarDetailOpen,
      closeSidebarDetail,
      isProductInfoOpen,
      closePopup,
      isExportInventoryOpen,
      setExportSidebarOpenState
    } = this.props

    this.props.handleVariableSave('myListingsFilters', this.state.filterValues)
    if (sidebarDetailOpen) closeSidebarDetail()
    if (isProductInfoOpen) closePopup()
    if (isExportInventoryOpen) setExportSidebarOpenState(false)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { datagridFilterUpdate, datagridFilterReload, datagridFilter, datagrid } = this.props
    if (prevProps.datagridFilterUpdate !== datagridFilterUpdate) {
      datagrid.setFilter(datagridFilter, datagridFilterReload, 'inventory')
    }
    if (
      (!prevState.rows.length && !this.state.rows.length && !prevProps.rows.length && this.props.rows.length) ||
      prevProps.pricingEditOpenId !== this.props.pricingEditOpenId
    ) {
      this.getRows(this.props.rows)
    }
  }

  toDatagridFilter = savedFilter => {
    let { filters, ...rest } = savedFilter

    return {
      filters: filters.map(filter => ({
        operator: filter.operator,
        path: filter.path,
        values: filter.values.map(val => val.value)
      })),
      //pageNumber: savedFilter.pageNumber,
      pageSize: 50
    }
  }

  handleFiltersValue = debounce(filter => {
    const { datagrid } = this.props
    datagrid.setSearch(filter, true, 'pageFilters')
  }, 300)

  getActions = () => {
    const {
      intl: { formatMessage },
      sidebarDetailTrigger,
      datagrid
    } = this.props
    return [
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
          id: 'global.tds',
          defaultMessage: 'TDS'
        }),
        disabled: row => row.groupId,
        callback: row => this.tableRowClickedProductOffer(row, true, 1, sidebarDetailTrigger)
      },
      {
        text: formatMessage({
          id: 'global.documents',
          defaultMessage: 'Documents'
        }),
        disabled: row => row.groupId,
        callback: row => this.tableRowClickedProductOffer(row, true, 2, sidebarDetailTrigger)
      },
      {
        text: formatMessage({
          id: 'inventory.broadcast',
          defaultMessage: 'Price Book'
        }),
        disabled: row => row.groupId,
        callback: row => this.tableRowClickedProductOffer(row, true, 3, sidebarDetailTrigger)
      },
      {
        text: formatMessage({
          id: 'inventory.priceTiers',
          defaultMessage: 'Price Tiers'
        }),
        disabled: row => row.groupId,
        callback: row => this.tableRowClickedProductOffer(row, true, 4, sidebarDetailTrigger)
      },
      {
        text: formatMessage({
          id: 'global.delete',
          defaultMessage: 'Delete'
        }),
        disabled: row => this.props.editedId === row.id,
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
          ).then(async () => {
            try {
              this.props.deleteProductOffer(row.id)
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
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
            row.rawData
          ),
        disabled: row => !!row.parentOffer
      },
      {
        text: formatMessage({
          id: 'inventory.detachOffer',
          defaultMessage: 'Detach from Virtual Group'
        }),
        callback: row => this.detachOffer([row.id], row.rawData),
        disabled: row => !row.parentOffer
      }
    ]
  }

  SearchByNamesAndTagsChanged = data => {
    this.setState(
      {
        filterValues: {
          ...this.state.filterValues,
          SearchByNamesAndTags: data
        }
      },
      () => {
        const filter = {
          ...this.state.filterValues,
          ...(!!this.state.filterValues.SearchByNamesAndTags && {
            ...this.state.filterValues.SearchByNamesAndTags.filters
          })
        }
        this.handleFiltersValue(filter)
      }
    )
  }

  getRows = rows => {
    const { datagrid, pricingEditOpenId, setPricingEditOpenId, sidebarDetailTrigger, toastManager } = this.props
    let title = ''

    let result = rows.map((r, rIndex) => {
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
      if (r.cfStatusReason && !(r.cfStatus.toLowerCase() === 'broadcasting' && isOfferValid))
        title = (
          <>
            {title} <span>{' ' + r.cfStatusReason}</span>
          </>
        )

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
        actCol: (
          <RowDropDownIcon>
            <MoreVertical />
          </RowDropDownIcon>
        ),
        productName: (
          <DivRow>
            <SpanText onClick={() => this.tableRowClickedProductOffer(r, true, 0, sidebarDetailTrigger)}>
              {r.productName}
            </SpanText>
            <DivIcons>
              {r.expired ? (
                <Popup
                  header={<FormattedMessage id='global.expiredProduct.tooltip' defaultMessage='Expired Product' />}
                  trigger={
                    <div>
                      <ClockIcon />
                    </div>
                  } // <div> has to be there otherwise popup will be not shown
                />
              ) : null}
              {productStatusText ? (
                <Popup
                  size='small'
                  header={productStatusText}
                  trigger={
                    <div>
                      <FileTextIcon />
                    </div>
                  } // <div> has to be there otherwise popup will be not shown
                />
              ) : null}
            </DivIcons>
          </DivRow>
        ),
        packaging: (
          <>
            {`${r.packagingSize} ${r.packagingUnit} `}
            <CapitalizedText>{r.packagingType}</CapitalizedText>{' '}
          </>
        ),
        condition: r.condition ? (
          <FormattedMessage id='global.conforming' defaultMessage='Conforming' />
        ) : (
          <FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />
        ),
        fobPrice: (
          <StyledPopup
            content={
              <QuickEditPricingPopup
                handlechange={(values, index) => this.handleChangePriceTiers(values, rIndex, index)}
                rawData={getSafe(() => this.state.rows[rIndex].rawData, '') || r.rawData}
              />
            }
            on='click'
            trigger={<FobPrice>{r.fobPrice}</FobPrice>}
            open={pricingEditOpenId === r.rawData.id}
            onOpen={() => setPricingEditOpenId(r.rawData.id)}
            onClose={() => setPricingEditOpenId(null)}
          />
        ),
        broadcast: (
          <div style={{ float: 'left' }}>
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
    this.setState({ rows: result })
  }

  handleChangePriceTiers = (values, rIndex, pIndex) => {
    let newRows = this.state.rows

    if (pIndex) {
      //pIndex means pricingTiers index and that row was changed. values are {}
      newRows[rIndex].rawData.pricingTiers[pIndex] = values
    } else {
      // it was added or removed row pricingTiers. values are []
      newRows[rIndex].rawData.pricingTiers = values
    }

    this.setState({ rows: newRows })
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
      setExportSidebarOpenState,
      myListingsFilters,
      updatingDatagrid,
      activeInventoryFilter
    } = this.props
    const { columns, clientMessage, request, openFilterPopup, rows } = this.state

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
        {false && !tutorialCompleted && <Tutorial />}
        <Container fluid style={{ padding: '20px 25px 10px' }}>
          <CustomRowDiv>
            <div>
              <div className='column'>
                <CustomSearchNameTags>
                  <SearchByNamesAndTags
                    onChange={this.SearchByNamesAndTagsChanged}
                    initFilterState={getSafe(() => myListingsFilters.SearchByNamesAndTags, null)}
                    filterApply={false}
                  />
                </CustomSearchNameTags>
              </div>
              <div className='column'>
                <Button
                  className='light'
                  size='large'
                  primary
                  onClick={() => this.setState({ openFilterPopup: true })}
                  data-test='my_inventory_advanced_filters_btn'>
                  <Sliders />
                  {formatMessage({
                    id: 'global.filters',
                    defaultMessage: 'Filters'
                  })}
                </Button>
              </div>
              <FiltersRow>
                <FilterTags filterType='inventory' datagrid={datagrid} />
              </FiltersRow>
            </div>

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
            <div>
              <div className='column'>
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
              </div>
              <div className='column'>
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
              </div>
              <div className='column'>
                <Button
                  className='secondary'
                  size='large'
                  primary
                  onClick={() => this.tableRowClickedProductOffer(null, true, 0, sidebarDetailTrigger)}
                  data-test='my_inventory_add_btn'>
                  <PlusCircle />
                  <FormattedMessage id='global.addListing' defaultMessage='Add Listing'>
                    {text => text}
                  </FormattedMessage>
                </Button>
              </div>
              <ColumnSettingButton divide={true} />
            </div>
          </CustomRowDiv>
        </Container>

        <div className='flex stretched inventory-wrapper listings-wrapper' style={{ padding: '10px 30px' }}>
          <ProdexTable
            defaultHiddenColumns={defaultHiddenColumns}
            {...datagrid.tableProps}
            tableName='my_inventory_grid'
            columns={columns}
            rows={rows}
            selectByRowClick
            hideCheckboxes
            loading={datagrid.loading || updatingDatagrid}
            groupBy={['echoCode']}
            getChildGroups={rows =>
              _(rows)
                .groupBy('echoName')
                .map(v => {
                  return {
                    key: `${v[0].echoName}_${v[0].echoCode}_${v[0].companyProduct.id}_${
                      v[0].productGroup !== null
                        ? v[0].productGroup + ':'
                        : formatMessage({ id: 'global.unmapped.cptlz', defaultMessage: 'Unmapped' })
                    }_${v[0].tagsNames ? v[0].tagsNames : ''}`,
                    childRows: v,
                    groupLength: v.length
                  }
                })
                .value()
            }
            renderGroupLabel={
              ({ row: { value }, groupLength }) => null
              /* #35127
              {
                const [name, number, id, productGroup, tagsNames] = value.split('_')
                const tagNames = tagsNames ? tagsNames.split(',') : []
                return (
                  <span>
                    <span className='flex row right'>
                      <span>
                        {tagNames.length ? <ArrayToFirstItem values={tagNames} rowItems={5} tags={true} /> : ''}
                      </span>
                    </span>
                  </span>
                )
              }
              */
            }
            onSelectionChange={selectedRows => this.setState({ selectedRows })}
            groupActions={row => {
              let values = row.key.split('_')
              return groupActions(
                rows,
                values[values.length - 3],
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
            /* COMMENTED #30916
          onRowClick={(e, row) => {
            const targetTag = e.target.tagName.toLowerCase()
            if (targetTag !== 'input' && targetTag !== 'label') {
              Router.push({ pathname: '/inventory/edit', query: { id: row.id } })
            }
          }}*/
            editingRowId={editedId}
            columnActions='actCol'
          />
        </div>
        {sidebarDetailOpen && <DetailSidebar />}
        {isExportInventoryOpen && <ExportInventorySidebar onClose={() => setExportSidebarOpenState(false)} />}
        {openFilterPopup && <InventoryFilter onClose={() => this.setState({ openFilterPopup: false })} />}
      </>
    )
  }
}

export default injectIntl(withToastManager(MyListings))
