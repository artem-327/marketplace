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
  getProductGrades,
  searchOrigins,
  getProductForms,
  getProductConditions,
  searchManufacturers,
  getDocumentTypes,
  addAttachment,
  loadFile,
  removeAttachment,
  downloadAttachment,
  closeModalDetail,
  getProductOffer,
  removeAttachmentLinkProductOffer,
  saveTdsAsTemplate,
  getTdsTemplates,
  deleteTdsTemplate
} from '../../../actions'
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
  broadcastChange
}

const mapStateToProps = (
  {
    simpleAdd: {
      autocompleteData,
      autocompleteDataLoading,
      listConditions,
      listForms,
      listGrades,
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
      listDocumentTypes,
      editProductOfferInitTrig,
      tdsTemplatesLoading,
      tdsTemplates
    },
    broadcast
  },
  { inventoryGrid }
) => ({
  autocompleteData,
  autocompleteDataLoading,
  listConditions,
  listForms,
  listGrades,
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
  listDocumentTypes,
  editProductOfferInitTrig,
  currencySymbol: '$',
  datagrid: inventoryGrid,
  isLoadingBroadcast: getSafe(() => broadcast.loading, false),
  broadcastTemplates: getSafe(() => broadcast.templates, []),
  tdsTemplatesLoading,
  tdsTemplates
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalDetail)
