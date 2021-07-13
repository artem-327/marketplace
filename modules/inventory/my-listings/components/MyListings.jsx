import { useEffect, useState } from 'react'
import { CornerLeftDown, PlusCircle, Sliders } from 'react-feather'
import { Container, Modal, Button } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
import PropTypes from 'prop-types'
// Components
import ProdexTable from '../../../../components/table'
import ModalDetailContainer from './ModalDetail/ModalDetailContainer'
import FilterTags from '../../../filter/components/FitlerTags'
import Tutorial from '../../../tutorial/Tutorial'
import SearchByNamesAndTags from '../../../search'
import ColumnSettingButton from '../../../../components/table/ColumnSettingButton'
import { InventoryFilter } from '../../../filter'
// Services
import { groupActions } from '../../../company-product-info/constants'
import ProductImportPopup from '../../my-products/components/ProductImportPopupContainer'
import { getSafe } from '../../../../utils/functions'
import {
  columns,
  toDatagridFilter,
  SearchByNamesAndTagsChanged,
  getRows,
  groupOffer,
  tableRowClickedProductOffer
} from './MyListings.services'
import { CustomRowDiv } from '../../styles'
// Hooks
import { usePrevious } from '../../../../hooks'
//Constants
import { INDEX_TAB_EDIT, BOOLEAN_TRUE } from './MyListings.constants'
// Styles
import { defaultHiddenColumns, FiltersRow, CustomSearchNameTags } from './MyListings.styles'

/**
 * MyListings Component
 * @category Inventory - My Listings
 * @components
 */
const MyListings = props => {  
  const [state, setState] = useState({
    selectedRows: [],
    open: false,
    clientMessage: '',
    request: null,
    filterValues: {
      SearchByNamesAndTags: null
    },
    rows: [],
    updatedRow: false,
    focusInput: '',
    openFilterPopup: false
  })

  useEffect(() => {
    const {
      modalDetailTrigger,
      myListingsFilters,
      advancedFilters,
      datagrid,
      applyDatagridFilter,
      broadcastTemplates
    } = props
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
      props.getTemplates()
    }
    // Because of #31767
    try {
      props.setCompanyElligible()
    } catch (error) {
      console.error(error)
    }

    if (myListingsFilters) {
      setState({ ...state, filterValues: myListingsFilters })
      const filter = {
        ...myListingsFilters,
        ...(!!myListingsFilters.SearchByNamesAndTags && {
          ...myListingsFilters.SearchByNamesAndTags.filters
        })
      }
      datagrid.setSearch(filter, !advancedFilters.filters, 'pageFilters')
    } else {
      datagrid.setSearch(state.filterValues, !advancedFilters.filters, 'pageFilters')
    }

    if (advancedFilters.filters) {
      let datagridFilter = toDatagridFilter(advancedFilters)
      applyDatagridFilter(datagridFilter, true)
    }

    return () => {
      const { isModalDetailOpen, closeModalDetail, isProductInfoOpen, closePopup } = props

      if (isModalDetailOpen) closeModalDetail()
      if (isProductInfoOpen) closePopup()
    }
  }, [])

  const prevDatagridFilterUpdate = usePrevious(props.datagridFilterUpdate)
  const prevRows = usePrevious(props.rows)
  const prevPricingEditOpenId = usePrevious(props.pricingEditOpenId)
  const prevUpdateRow = usePrevious(props.updateRow)
  const prevFocusInput = usePrevious(props.focusInput)

  useEffect(() => {
    const { datagridFilterReload, datagridFilter, datagrid } = props
    if (prevDatagridFilterUpdate  !== 'undefined') {
      datagrid.setFilter(datagridFilter, datagridFilterReload, 'inventory')
    }
  }, [props.datagridFilterUpdate])

  useEffect(() => {
    const { datagrid } = props
    if (prevRows  !== 'undefined' && prevPricingEditOpenId  !== 'undefined' && prevUpdateRow  !== 'undefined' && prevFocusInput  !== 'undefined') {
      if (
        (getSafe(() => prevRows.length, '') === getSafe(() => state.rows.length, '') &&
          getSafe(() => prevRows.length, '') !== getSafe(() => props.rows.length, '')) ||
        getSafe(() => prevRows[0].id, '') !== getSafe(() => props.rows[0].id, '') ||
        getSafe(() => prevPricingEditOpenId, '') !== getSafe(() => props.pricingEditOpenId, '') ||
        (getSafe(() => state.updatedRow, '') && !getSafe(() => prevUpdateRow, '')) ||
        getSafe(() => state.focusInput, '') !== getSafe(() => prevFocusInput, '') ||
        getSafe(() => datagrid.isUpdatedRow, '')
      ) {
        if (getSafe(() => datagrid.isUpdatedRow, '')) {
          datagrid.setUpdatedRow(false)
        }
        getRows(props, state, setState)
        if (state.updatedRow && !prevUpdateRow) {
          setState({ ...state, updatedRow: false })
        }
      }
    }
  }, [props.rows, props.pricingEditOpenId, props.updateRow, props.focusInput])

  const {
    isModalDetailOpen,
    intl: { formatMessage },
    datagrid,
    openImportPopup,
    isOpenImportPopup,
    modalDetailTrigger,
    openPopup,
    editedId,
    closeModalDetail,
    myListingsFilters,
    updatingDatagrid
  } = props
  const { clientMessage, request, rows, openFilterPopup } = state

  return (
    <>
      <Modal size='small' open={state.open} onClose={() => setState({ ...state, open: false })} closeIcon>
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
          <Button negative onClick={() => setState({ ...state, open: false })}>
            <FormattedMessage id='"global.no"' defaultMessage='No' />
          </Button>
          <Button
            positive
            onClick={e => {
              e.preventDefault()
              if (!request) return
              groupOffer({ ...request, overrideBroadcastRules: true }, {}, props, state, setState)
              setState({ ...state, open: false })
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
                  onChange={(data) => SearchByNamesAndTagsChanged(data, props, state, setState)}
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
                onClick={() => setState({ ...state, openFilterPopup: true })}
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
          <div>
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
                <FormattedMessage id='global.addListing' defaultMessage='Add Listing' />
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
          }
          onSelectionChange={selectedRows => setState({ ...state, selectedRows })}
          groupActionsIcon
          groupActions={row => {
            let values = row.key.split('_')
            return groupActions(
              rows,
              values[values.length - 3],
              isModalDetailOpen,
              closeModalDetail,
              (companyProduct, i) => {
                openPopup(companyProduct, i)
              }
            ).map(a => ({
              ...a,
              text: <FormattedMessage {...a.text} />
            }))
          }}
          editingRowId={editedId}
          columnActions='actCol'
        />
      </div>
      {isModalDetailOpen && <ModalDetailContainer inventoryGrid={props.datagrid} />}
      {openFilterPopup && <InventoryFilter onClose={() => setState({ ...state, openFilterPopup: false })} />}
    </>
  )
}

MyListings.propTypes = {
  myListingsFilters: PropTypes.object,
  advancedFilters: PropTypes.object,
  datagrid: PropTypes.object,
  intl: PropTypes.object,
  broadcastTemplates: PropTypes.array,
  rows: PropTypes.array,
  pricingEditOpenId: PropTypes.number,
  editedId: PropTypes.number,
  focusInput: PropTypes.string,
  applicationName: PropTypes.string,
  datagridFilterUpdate: PropTypes.bool,
  isModalDetailOpen: PropTypes.bool,
  isOpenImportPopup: PropTypes.bool,
  updatingDatagrid: PropTypes.bool,
  isProductInfoOpen: PropTypes.bool,
  toastManager: PropTypes.any,
  modalDetailTrigger: PropTypes.func,
  applyDatagridFilter: PropTypes.func,
  getTemplates: PropTypes.func,
  setCompanyElligible: PropTypes.func,
  handleVariableSave: PropTypes.func,
  updateRow: PropTypes.func,
  openImportPopup: PropTypes.func,
  openPopup: PropTypes.func,
  closeModalDetail: PropTypes.func,
  deleteProductOffer: PropTypes.func,
  setPricingEditOpenId: PropTypes.func,
  closePopup: PropTypes.func,
  broadcastChange: PropTypes.func,
  patchBroadcast: PropTypes.func,
  groupOffers: PropTypes.func
}

MyListings.defaultProps = {
  myListingsFilters: null,
  advancedFilters: null,
  datagrid: {},
  intl: {},
  broadcastTemplates: [],
  rows: [],
  pricingEditOpenId: null,
  editedId: null,
  focusInput: '',
  applicationName: '',
  datagridFilterUpdate: false,
  isModalDetailOpen: false,
  isOpenImportPopup: false,
  updatingDatagrid: false,
  isProductInfoOpen: false,
  toastManager: null,
  modalDetailTrigger: () => {},
  applyDatagridFilter: () => {},
  getTemplates: () => {},
  setCompanyElligible: () => {},
  handleVariableSave: () => {},
  updateRow: () => {},
  openImportPopup: () => {},
  openPopup: () => {},
  closeModalDetail: () => {},
  deleteProductOffer: () => {},
  setPricingEditOpenId: () => {},
  closePopup: () => {},
  broadcastChange: () => {},
  patchBroadcast: () => {},
  groupOffers: () => {}
}

export default injectIntl(withToastManager(MyListings))
