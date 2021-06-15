import { connect } from 'react-redux'
import ModalDetail from './ModalDetail'
import { withDatagrid } from '../../../../datagrid'

//Actions
import { getTemplates, broadcastChange } from '../../../../broadcast/actions'
import {
  modalDetailTrigger,
  getAutocompleteData,
  getWarehouses,
  addProductOffer,
  searchOrigins,
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
} from '../../../../global-data/actions'

import { openBroadcast } from '../../../../broadcast/actions'

//Services
import { getSafe } from '../../../../../utils/functions'

const mapDispatchToProps = {
  modalDetailTrigger,
  getAutocompleteData,
  getDocumentTypes,
  addProductOffer,
  getProductConditions,
  getProductForms,
  getProductGrades,
  getWarehouses,
  searchManufacturers,
  searchOrigins,
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

const mapStateToProps = (
  {
    simpleAdd: {
      autocompleteData,
      autocompleteDataLoading,
      loading,
      modalActiveTab,
      isModalDetailOpen,
      detailValues,
      searchedManufacturers,
      searchedManufacturersLoading,
      searchedOrigins,
      searchedOriginsLoading,
      searchedProducts,
      searchedProductsLoading,
      warehousesList,
      editProductOfferInitTrig,
      tdsTemplatesLoading,
      tdsTemplates,
      broadcastOption
    },
    broadcast,
    globalData: {
      productFormsDropdown,
      productGradesDropdown,
      productConditionsDropdown,
      documentTypesDropdown,

    }
  },
  { inventoryGrid }
) => ({
  autocompleteData,
  autocompleteDataLoading,
  productFormsDropdown,
  productGradesDropdown,
  loading,
  modalActiveTab,
  isModalDetailOpen,
  detailValues,
  searchedManufacturers,
  searchedManufacturersLoading,
  searchedOrigins,
  searchedOriginsLoading,
  searchedProducts,
  searchedProductsLoading,
  warehousesList,
  editProductOfferInitTrig,
  currencySymbol: '$',
  datagrid: inventoryGrid,
  isLoadingBroadcast: getSafe(() => broadcast.loading, false),
  broadcastTemplates: getSafe(() => broadcast.templates, []),
  tdsTemplatesLoading,
  tdsTemplates,
  broadcastOption,
  documentTypesDropdown: documentTypesDropdown
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalDetail)
