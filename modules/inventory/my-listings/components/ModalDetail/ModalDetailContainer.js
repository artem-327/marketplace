import { connect } from 'react-redux'
import { withToastManager } from 'react-toast-notifications'
// Components
import ModalDetail from './ModalDetail'
//Actions
import { getTemplates, broadcastChange } from '../../../../broadcast/actions'
import {
  modalDetailTrigger,
  getAutocompleteData,
  getWarehouses,
  addProductOffer,
  searchManufacturers,
  addAttachment,
  loadFile,
  removeAttachment,
  downloadAttachment,
  closeModalDetail,
  getProductOffer,
  removeAttachmentLinkProductOffer,
  saveTdsAsTemplate,
  getTdsTemplates,
  deleteTdsTemplate,
  changeBroadcast
} from '../../../actions'
import {
  getProductGrades,
  getProductForms,
  getProductConditions,
  getDocumentTypes,
  getCountries
} from '../../../../global-data/actions'
import { openBroadcast } from '../../../../broadcast/actions'
// Selectors
import {
  makeGetApplicationName,
  makeGetAutocompleteData,
  makeGetAutocompleteDataLoading,
  makeGetLoading,
  makeGetModalActiveTab,
  makeGetIsModalDetailOpen,
  makeGetDetailValues,
  makeGetSearchedManufacturers,
  makeGetSearchedManufacturersLoading,
  makeGetSearchedProducts,
  makeGetSearchedProductsLoading,
  makeGetWarehousesList,
  makeGetEditProductOfferInitTrig,
  makeGetIsLoadingBroadcast,
  makeGetBroadcastTemplates,
  makeGetTdsTemplatesLoading,
  makeGetTdsTemplates,
  makeGetBroadcastOption
} from '../../../selectors'
import { makeGetSettings } from '../../../../auth/selectors'

import {
  makeGetProductFormsDropdown,
  makeGetProductGradesDropdown,
  makeGetDocumentTypesDropdown,
  makeGetCountriesDropdown
} from '../../../../global-data/selectors'

const mapDispatchToProps = {
  modalDetailTrigger,
  getAutocompleteData,
  getDocumentTypes,
  addProductOffer,
  getProductConditions,
  getProductForms,
  getProductGrades,
  getWarehouses,
  getCountries,
  searchManufacturers,
  openBroadcast,
  addAttachment,
  loadFile,
  removeAttachment,
  downloadAttachment,
  closeModalDetail,
  getProductOffer,
  removeAttachmentLinkProductOffer,
  getTemplates,
  saveTdsAsTemplate,
  getTdsTemplates,
  deleteTdsTemplate,
  broadcastChange,
  changeBroadcast
}

const makeMapStateToProps = () => {
  const getApplicationName = makeGetApplicationName()
  const getAutocompleteData = makeGetAutocompleteData()
  const getAutocompleteDataLoading = makeGetAutocompleteDataLoading()
  const getProductFormsDropdown = makeGetProductFormsDropdown()
  const getProductGradesDropdown = makeGetProductGradesDropdown()
  const getLoading = makeGetLoading()
  const getModalActiveTab = makeGetModalActiveTab()
  const getIsModalDetailOpen = makeGetIsModalDetailOpen()
  const getDetailValues = makeGetDetailValues()
  const getSearchedManufacturers = makeGetSearchedManufacturers()
  const getSearchedManufacturersLoading = makeGetSearchedManufacturersLoading()
  const getSearchedProducts = makeGetSearchedProducts()
  const getSearchedProductsLoading = makeGetSearchedProductsLoading()
  const getWarehousesList = makeGetWarehousesList()
  const getEditProductOfferInitTrig = makeGetEditProductOfferInitTrig()
  const getIsLoadingBroadcast = makeGetIsLoadingBroadcast()
  const getBroadcastTemplates = makeGetBroadcastTemplates()
  const getTdsTemplatesLoading = makeGetTdsTemplatesLoading()
  const getTdsTemplates = makeGetTdsTemplates()
  const getBroadcastOption = makeGetBroadcastOption()
  const getDocumentTypesDropdown = makeGetDocumentTypesDropdown()
  const getCountriesDropdown = makeGetCountriesDropdown()
  const getSettings = makeGetSettings()

  const mapStateToProps = ( store, { inventoryGrid }) => ({
    applicationName: getApplicationName(store),
    autocompleteData: getAutocompleteData(store),
    autocompleteDataLoading: getAutocompleteDataLoading(store),
    productFormsDropdown: getProductFormsDropdown(store),
    productGradesDropdown: getProductGradesDropdown(store),
    loading: getLoading(store),
    modalActiveTab: getModalActiveTab(store),
    isModalDetailOpen: getIsModalDetailOpen(store),
    detailValues: getDetailValues(store),
    searchedManufacturers: getSearchedManufacturers(store),
    searchedManufacturersLoading: getSearchedManufacturersLoading(store),
    searchedProducts: getSearchedProducts(store),
    searchedProductsLoading: getSearchedProductsLoading(store),
    warehousesList: getWarehousesList(store),
    editProductOfferInitTrig: getEditProductOfferInitTrig(store),
    currencySymbol: '$',
    datagrid: inventoryGrid,
    isLoadingBroadcast: getIsLoadingBroadcast(store),
    broadcastTemplates: getBroadcastTemplates(store),
    tdsTemplatesLoading: getTdsTemplatesLoading(store),
    tdsTemplates: getTdsTemplates(store),
    broadcastOption: getBroadcastOption(store),
    documentTypesDropdown: getDocumentTypesDropdown(store),
    countriesDropdown: getCountriesDropdown(store),
    settings: getSettings(store)
  })
  return mapStateToProps
}

export default connect(makeMapStateToProps, mapDispatchToProps)(withToastManager(ModalDetail))
