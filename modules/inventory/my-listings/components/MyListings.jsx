import { Component } from 'react'
import cn from 'classnames'
import moment from 'moment/moment'
import { debounce } from 'lodash'
import {
  Clock,
  FileText,
  CornerLeftUp,
  CornerLeftDown,
  MoreVertical,
  PlusCircle,
  Sliders,
  ChevronDown
} from 'react-feather'
import { Container, Menu, Header, Modal, Checkbox, Popup, Button, Dropdown, Grid, Input } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
import styled from 'styled-components'
import { Warning } from '@material-ui/icons'
import ProdexTable from '../../../../components/table'
import ActionCell from '../../../../components/table/ActionCell'
import ModalDetailContainer from './ModalDetail/ModalDetailContainer'
import QuickEditPricingPopup from './QuickEditPricingPopup'
import confirm from '../../../../components/Confirmable/confirm'
import FilterTags from '../../../filter/components/FitlerTags'
import { groupActions } from '../../../company-product-info/constants'
import ProductImportPopup from '../../my-products/components/ProductImportPopup'
import { getSafe, uniqueArrayByKey, generateToastMarkup } from '../../../../utils/functions'
import Tutorial from '../../../tutorial/Tutorial'
import SearchByNamesAndTags from '../../../search'
import ExportInventory from '../../../export-inventory/components/ExportInventory'
import ColumnSettingButton from '../../../../components/table/ColumnSettingButton'
import { ArrayToFirstItem } from '../../../../components/formatted-messages'
import { CustomRowDiv } from '../../constants/layout'
import { InventoryFilter } from '../../../filter'
import { FormattedUnit } from '../../../../components/formatted-messages'
//Services
import { onClickBroadcast, tableRowClickedProductOffer } from '../MyListings.services'
//Constants
import {
  INDEX_TAB_EDIT,
  INDEX_TAB_PRICE_TIERS,
  INDEX_TAB_DOCUMENTS,
  INDEX_TAB_TDS,
  INDEX_TAB_PRICE_BOOK,
  BOOLEAN_TRUE
} from '../MyListings.constants'

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

const FobPrice = styled.div`
  cursor: pointer;

  &:hover {
    //text-decoration-style: solid;
    text-decoration: none;
    font-weight: bold;
    color: #2599d5;
  }
`

const BroadcastDiv = styled.div`
  margin: 0 8px 0 4px;
`

const NetworkDropdown = styled(Dropdown)`
  &.ui.dropdown {
    width: 50px;
    height: 32px !important;
    margin: -5px 0 !important;
    border: 1px solid #dee2e6;
    border-radius: 3px;
    padding: 6px 5px 6px 8px;

    > .text {
      svg {
        width: 18px;
        height: 18px;

        path[fill] {
          fill: #848893 !important;
        }
      }
    }

    &.active {
      background: #edeef2 !important;

      > svg {
        transform: rotate(180deg);
      }

      > .text svg path[fill] {
        fill: #20273a !important;
      }
    }

    &.loading {
      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 18px;
        margin: -0.64285714em 0 0 -0.64285714em;
        border-radius: 500rem;
        border: 0.2em solid rgba(0, 0, 0, 0.1);
        width: 1.28571429em;
        height: 1.28571429em;
      }

      &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 18px;
        -webkit-animation: dropdown-spin 0.6s linear;
        animation: dropdown-spin 0.6s linear;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        width: 1.28571429em;
        height: 1.28571429em;
        margin: -0.64285714em 0 0 -0.64285714em;
        border-radius: 500rem;
        border-color: #767676 transparent transparent;
        border-style: solid;
        border-width: 0.2em;
        -webkit-box-shadow: 0 0 0 1px transparent;
        box-shadow: 0 0 0 1px transparent;
      }

      > .text svg {
        opacity: 0;
      }
    }

    > .menu {
      margin-top: 5px !important;

      > .header {
        height: 30px !important;
        margin: 5px 0 !important;
        padding: 0 20px !important;
        text-transform: none;
        font-size: 14px;
        font-weight: 500;
        color: #404040;
        line-height: 30px;
      }

      &:after {
        right: 5px !important;
      }

      > .item {
        box-sizing: border-box;
        height: 60px;
        padding: 16px 30px 12px 60px !important;
        line-height: 16px;

        svg {
          position: absolute;
          top: 17px;
          left: 20px;
          width: 24px;
          height: 24px;

          path[fill] {
            fill: #848893 !important;
          }
        }

        &:hover svg path[fill] {
          fill: #20273a !important;
        }

        .content {
          font-size: 14px;
          color: #20273a;
          line-height: 16px;

          .sub.header {
            font-size: 12px;
            color: #848893;
            line-height: 16px;
          }
        }
      }
    }
  }
`

const NetworkChevronDown = styled(ChevronDown)`
  float: right !important;
  width: 14px !important;
  height: 20px !important;
  color: #848893 !important;
`

class MyListings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        /*{
          name: 'actCol',
          title: ' ',
          width: 30,
          actions: this.getActions(),
          disabled: true
        },
        {
          name: 'broadcast',
          title: (
            <FormattedMessage id='myInventory.broadcast' defaultMessage='Broadcast'>
              {text => text}
            </FormattedMessage>
          ),
          width: 100,
          align: 'left',
          sortPath: 'ProductOffer.broadcasted',
          disabled: true
        },*/
        {
          name: 'productName',
          title: (
            <FormattedMessage id='global.intProductName' defaultMessage='Product Name'>
              {text => text}
            </FormattedMessage>
          ),
          width: 250,
          sortPath: 'ProductOffer.companyProduct.intProductName',
          allowReordering: false
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
        },
        {
          name: 'network',
          title: ' ',
          width: 81,
          allowReordering: false
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
      rows: [],
      updatedRow: false,
      focusInput: ''
    }
  }

  componentDidMount = async () => {
    const {
      modalDetailTrigger,
      myListingsFilters,
      advancedFilters,
      datagrid,
      applyDatagridFilter,
      broadcastTemplates
    } = this.props
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
        modalDetailTrigger(idOffer, true, tabOffer)
      }
    }
    if (broadcastTemplates && !broadcastTemplates.length) {
      this.props.getTemplates()
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
      isModalDetailOpen,
      closeModalDetail,
      isProductInfoOpen,
      closePopup,
      isExportInventoryOpen,
      setExportModalOpenState
    } = this.props

    this.props.handleVariableSave('myListingsFilters', this.state.filterValues)
    if (isModalDetailOpen) closeModalDetail()
    if (isProductInfoOpen) closePopup()
    if (isExportInventoryOpen) setExportModalOpenState(false)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { datagridFilterUpdate, datagridFilterReload, datagridFilter, datagrid } = this.props
    if (prevProps.datagridFilterUpdate !== datagridFilterUpdate) {
      datagrid.setFilter(datagridFilter, datagridFilterReload, 'inventory')
    }
    if (
      (getSafe(() => prevProps.rows.length, '') === getSafe(() => this.state.rows.length, '') &&
        getSafe(() => prevProps.rows.length, '') !== getSafe(() => this.props.rows.length, '')) ||
      getSafe(() => prevProps.rows[0].id, '') !== getSafe(() => this.props.rows[0].id, '') ||
      getSafe(() => prevProps.pricingEditOpenId, '') !== getSafe(() => this.props.pricingEditOpenId, '') ||
      (getSafe(() => this.state.updatedRow, '') && !getSafe(() => prevState.updateRow, '')) ||
      getSafe(() => this.state.focusInput, '') !== getSafe(() => prevState.focusInput, '') ||
      getSafe(() => datagrid.isUpdatedRow, '')
    ) {
      if (getSafe(() => datagrid.isUpdatedRow, '')) {
        datagrid.setUpdatedRow(false)
      }
      this.getRows(this.props.rows)
      if (this.state.updatedRow && !prevState.updateRow) {
        this.setState({ updatedRow: false })
      }
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
      modalDetailTrigger,
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
        callback: row => tableRowClickedProductOffer(row, { modalDetailTrigger }, BOOLEAN_TRUE, INDEX_TAB_EDIT)
      },
      //{ text: formatMessage({ id: 'inventory.broadcast', defaultMessage: 'Price Book' }), callback: (row) => openBroadcast(row) },
      {
        text: formatMessage({
          id: 'global.tds',
          defaultMessage: 'TDS'
        }),
        disabled: row => !!row.groupId,
        callback: row => tableRowClickedProductOffer(row, { modalDetailTrigger }, BOOLEAN_TRUE, INDEX_TAB_TDS)
      },
      {
        text: formatMessage({
          id: 'global.documents',
          defaultMessage: 'Documents'
        }),
        disabled: row => !!row.groupId,
        callback: row => tableRowClickedProductOffer(row, { modalDetailTrigger }, BOOLEAN_TRUE, INDEX_TAB_DOCUMENTS)
      },
      {
        text: formatMessage({
          id: 'inventory.broadcast',
          defaultMessage: 'Price Book'
        }),
        disabled: row => !!row.groupId,
        callback: row => tableRowClickedProductOffer(row, { modalDetailTrigger }, BOOLEAN_TRUE, INDEX_TAB_PRICE_BOOK)
      },
      {
        text: formatMessage({
          id: 'inventory.priceTiers',
          defaultMessage: 'Price Tiers'
        }),
        disabled: row => !!row.groupId,
        callback: row => tableRowClickedProductOffer(row, { modalDetailTrigger }, BOOLEAN_TRUE, INDEX_TAB_PRICE_TIERS)
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
              await this.props.deleteProductOffer(row.id)
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          })
        }
      }
      // {
      //   text: formatMessage({
      //     id: 'inventory.groupOffer',
      //     defaultMessage: 'Join/Create Virtual Group'
      //   }),
      //   callback: (row) =>
      //     this.groupOffer(
      //       {
      //         overrideBroadcastRules: false,
      //         productOfferIds: [row.id]
      //       },
      //       row.rawData
      //     ),
      //   disabled: (row) => !!row.parentOffer
      // },
      // {
      //   text: formatMessage({
      //     id: 'inventory.detachOffer',
      //     defaultMessage: 'Detach from Virtual Group'
      //   }),
      //   callback: (row) => this.detachOffer([row.id], row.rawData),
      //   disabled: (row) => !row.parentOffer
      // }
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
    const {
      datagrid,
      pricingEditOpenId,
      setPricingEditOpenId,
      modalDetailTrigger,
      toastManager,
      closePricingEditPopup,
      intl: { formatMessage },
      broadcastTemplates,
      isProductInfoOpen,
      closePopup,
      isExportInventoryOpen,
      setExportModalOpenState,
      broadcastChange
    } = this.props
    let title

    const options = [
      {
        icon: (
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <g fill='none' fill-rule='evenodd'>
              <path
                d='M0 0L24 0 24 24 0 24z'
                transform='translate(-1125 -387) translate(1105 295) translate(0 29) translate(20 63)'
              />
              <path
                fill='#20273A'
                fill-rule='nonzero'
                d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'
                transform='translate(-1125 -387) translate(1105 295) translate(0 29) translate(20 63)'
              />
            </g>
          </svg>
        ),
        title: formatMessage({ id: 'myInventory.network', defaultMessage: 'Network' }),
        subtitle: formatMessage({
          id: 'myInventory.networkSubtitle',
          defaultMessage: 'Your accepted Partners and invited Guests'
        }),
        value: 'GLOBAL_RULES'
      },
      /*{
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g fill="none" fill-rule="evenodd">
              <path d="M0 0L24 0 24 24 0 24z" transform="translate(-1125 -447) translate(1105 295) translate(0 29) translate(20 123)"/>
              <path fill="#848893" fill-rule="nonzero" d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7C15.12 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V18c0 .55.45 1 1 1h9c.55 0 1-.45 1-1v-1.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h6v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z" transform="translate(-1125 -447) translate(1105 295) translate(0 29) translate(20 123)"/>
            </g>
          </svg>

        ),
        title: formatMessage({ id: 'myInventory.partners', defaultMessage: 'Partners' }),
        subtitle: formatMessage({ id: 'myInventory.partnersSubtitle', defaultMessage: 'Your accepted Partners' }),
        value: ''
      },*/
      {
        icon: (
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <g fill='none' fill-rule='evenodd'>
              <path
                d='M0 0L24 0 24 24 0 24z'
                transform='translate(-1125 -507) translate(1105 295) translate(0 29) translate(20 183)'
              />
              <path
                fill='#848893'
                fill-rule='nonzero'
                d='M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z'
                transform='translate(-1125 -507) translate(1105 295) translate(0 29) translate(20 183)'
              />
            </g>
          </svg>
        ),
        title: formatMessage({ id: 'myInventory.guests', defaultMessage: 'Guests' }),
        subtitle: formatMessage({ id: 'myInventory.guestsSubtitle', defaultMessage: 'Your invited Guests' }),
        value: 'CLIENT_COMPANIES'
      },
      {
        icon: (
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <g fill='none' fill-rule='evenodd'>
              <g>
                <path
                  d='M0 0L24 0 24 24 0 24z'
                  transform='translate(-1125 -567) translate(1105 295) translate(0 29) translate(20 243)'
                />
                <path
                  d='M0 0L24 0 24 24 0 24z'
                  opacity='.87'
                  transform='translate(-1125 -567) translate(1105 295) translate(0 29) translate(20 243)'
                />
              </g>
              <path
                fill='#848893'
                fill-rule='nonzero'
                d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z'
                transform='translate(-1125 -567) translate(1105 295) translate(0 29) translate(20 243)'
              />
            </g>
          </svg>
        ),
        title: formatMessage({ id: 'myInventory.justMe', defaultMessage: 'Just Me' }),
        subtitle: formatMessage({ id: 'myInventory.justMeSubtitle', defaultMessage: 'Only my Company' }),
        value: 'NO_BROADCAST'
      },
      ...broadcastTemplates.map(template => {
        return {
          icon: (
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
              <g fill='none' fill-rule='evenodd'>
                <path
                  d='M0 0L24 0 24 24 0 24z'
                  transform='translate(-1125 -627) translate(1105 295) translate(0 29) translate(20 303)'
                />
                <path
                  fill='#848893'
                  fill-rule='nonzero'
                  d='M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z'
                  transform='translate(-1125 -627) translate(1105 295) translate(0 29) translate(20 303)'
                />
              </g>
            </svg>
          ),
          title: template.name,
          subtitle: formatMessage({ id: 'myInventory.customTemplate', defaultMessage: 'Custom Template' }),
          id: template.id,
          tmp: template.name,
          value: `BROADCAST_TEMPLATE|${template.id}`
        }
      }),
      {
        icon: (
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <g fill='none' fill-rule='evenodd'>
              <path
                d='M0 0L24 0 24 24 0 24z'
                transform='translate(-1125 -627) translate(1105 295) translate(0 29) translate(20 303)'
              />
              <path
                fill='#848893'
                fill-rule='nonzero'
                d='M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z'
                transform='translate(-1125 -627) translate(1105 295) translate(0 29) translate(20 303)'
              />
            </g>
          </svg>
        ),
        title: formatMessage({ id: 'myInventory.custom', defaultMessage: 'Custom' }),
        subtitle: formatMessage({ id: 'myInventory.customSubtitle', defaultMessage: 'Create Custom Rule' }),
        value: 'CUSTOM_RULES'
      }
    ]

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
        network: (
          <NetworkDropdown
            icon={<NetworkChevronDown />}
            floating
            scrolling
            header={formatMessage({ id: 'myInventory.whoShouldSee', defaultMessage: 'Who should see this offer?' })}
            pointing='top right'
            value={
              r.broadcastTemplateResponse ? r.broadcastOption + '|' + r.broadcastTemplateResponse.id : r.broadcastOption
            }
            loading={!!r.isBroadcastLoading}
            closeOnChange
            //onChange={this.broadcastChange}
            options={options.map((option, optIndex) => {
              return {
                key: option.id ? option.id : optIndex * -1 - 1,
                text: option.icon,
                value: option.value,
                content: <Header icon={option.icon} content={option.title} subheader={option.subtitle} />,
                onClick: () =>
                  onClickBroadcast(
                    r,
                    option.value,
                    broadcastChange,
                    datagrid,
                    option.id ? { id: option.id, name: option.tmp } : null,
                    {
                      isProductInfoOpen,
                      closePopup,
                      isExportInventoryOpen,
                      setExportModalOpenState,
                      modalDetailTrigger
                    }
                  )
              }
            })}
          />
        ),
        productName: (
          <ActionCell
            row={r}
            getActions={this.getActions}
            content={r.productName}
            onContentClick={() => tableRowClickedProductOffer(r, { modalDetailTrigger }, BOOLEAN_TRUE, INDEX_TAB_EDIT)}
            rightAlignedContent={
              r.expired || productStatusText ? (
                <Popup
                  size='small'
                  inverted
                  style={{
                    fontSize: '12px',
                    color: '#cecfd4',
                    opacity: '0.9'
                  }}
                  header={
                    <div>
                      {r.expired && (
                        <div>
                          <FormattedMessage id='global.expiredProduct.tooltip' defaultMessage='Expired Product' />
                        </div>
                      )}
                      {productStatusText && <div>{productStatusText}</div>}
                    </div>
                  }
                  trigger={
                    <div>
                      <Warning className='title-icon' style={{ fontSize: '16px', color: '#f16844' }} />
                    </div>
                  } // <div> has to be there otherwise popup will be not shown
                />
              ) : null
            }
          />
        ),
        packaging: (
          <>
            {`${r.packagingSize} ${r.packagingUnit} `}
            <CapitalizedText>{r.packagingType}</CapitalizedText>{' '}
          </>
        ),
        quantity: r.qtyPart ? <FormattedUnit unit={r.qtyPart} separator=' ' value={r.quantity} /> : 'N/A',
        condition: r.condition ? (
          <FormattedMessage id='global.conforming' defaultMessage='Conforming' />
        ) : (
          <FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />
        ),
        fobPrice: r.grouped ? (
          r.fobPrice
        ) : (
          <StyledPopup
            content={
              <QuickEditPricingPopup
                handlechange={(values, index, focusInput) =>
                  this.handleChangePriceTiers(values, rIndex, index, focusInput)
                }
                rawData={getSafe(() => this.state.rows[rIndex].rawData, '') || r.rawData}
                focusInput={this.state.focusInput}
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
                      this.props.datagrid.updateRow(r.id, () => ({
                        ...r.rawData,
                        cfStatus: data.checked ? 'Broadcasting' : 'Not broadcasting'
                      }))
                      // Its necessary to render and see changes in MyListing when datagrid updated row
                      this.setState({ updatedRow: true })
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

  handleChangePriceTiers = (values, rIndex, pIndex, focusInput) => {
    let newRows = this.state.rows

    if (pIndex || pIndex === 0) {
      //pIndex means pricingTiers index and that row was changed. values are {}
      newRows[rIndex].rawData.pricingTiers[pIndex] = values
    } else {
      // it was added or removed row pricingTiers. values are []
      newRows[rIndex].rawData.pricingTiers = values
    }

    this.setState({ rows: newRows, focusInput: (pIndex || pIndex === 0) && focusInput ? focusInput : '' })
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
            warehouse: { deliveryAddress: { cfName: row.warehouse.deliveryAddress.cfName } },
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
            warehouse: { deliveryAddress: { cfName: row.warehouse.deliveryAddress.cfName } },
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
    const { groupOffers, datagrid } = this.props
    try {
      const response = await groupOffers(request)

      datagrid.updateRow(row.id, () => ({
        ...row,
        grouped: true,
        parentOffer: getSafe(() => response.value.productOfferStatuses[0].virtualOfferId, null)
      }))
      this.setState({ updatedRow: true })

      this.showMessage(response, request, row)
    } catch (error) {
      console.error(error)
    }
  }

  detachOffer = async (productOfferIds, row) => {
    const { detachOffers, datagrid } = this.props
    try {
      const response = await detachOffers(productOfferIds)

      datagrid.updateRow(row.id, () => ({ ...row, grouped: false, parentOffer: null }))
      this.setState({ updatedRow: true })

      this.showMessage(response, null, row)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const {
      openBroadcast,
      isModalDetailOpen,
      intl: { formatMessage },
      datagrid,
      openImportPopup,
      isOpenImportPopup,
      simpleEditTrigger,
      modalDetailTrigger,
      openPopup,
      editedId,
      closeModalDetail,
      tutorialCompleted,
      isExportInventoryOpen,
      setExportModalOpenState,
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
        {<Tutorial isTutorial={false} isBusinessVerification={true} />}
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
                  onClick={() => setExportModalOpenState(true)}
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
                  onClick={() =>
                    tableRowClickedProductOffer(null, { modalDetailTrigger }, BOOLEAN_TRUE, INDEX_TAB_EDIT)
                  }
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
            groupActionsIcon
            groupActions={row => {
              let values = row.key.split('_')
              return groupActions(
                rows,
                values[values.length - 3],
                isModalDetailOpen,
                closeModalDetail,
                (companyProduct, i) => {
                  if (isExportInventoryOpen) setExportModalOpenState(false)
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
        {isModalDetailOpen && <ModalDetailContainer inventoryGrid={this.props.datagrid} />}
        {isExportInventoryOpen && <ExportInventory onClose={() => setExportModalOpenState(false)} />}
        {openFilterPopup && <InventoryFilter onClose={() => this.setState({ openFilterPopup: false })} />}
      </>
    )
  }
}

export default injectIntl(withToastManager(MyListings))
