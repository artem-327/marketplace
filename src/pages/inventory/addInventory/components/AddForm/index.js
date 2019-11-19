import { connect } from 'react-redux'
import AddForm from './AddForm'
import { bindActionCreators } from 'redux'
import {
  saveWarehouse,
  updateWarehouse,
  fetchWarehouses,
  fetchLocations,
  fetchFilterLocations
} from '../../../../../modules/location'
import {
  addProductOffer,
  editProductOffer,
  loadFile,
  addAttachment,
  linkAttachment,
  removeAttachment,
  removeAttachmentLink
} from '../../../../../modules/productOffers'
import { validatePackageType } from '../../../../../modules/packageTypes'
import { addMessage } from '../../../../../modules/errors'
import { getMerchant } from '../../../../../modules/merchants'

function mapStateToProps(store) {
  return {
    warehouse: store.location.warehouse,
    filterLocations: store.location.filterLocations,
    locations: store.location.locations,
    location: store.location,
    form: store.forms.addProductOffer,
    files: store.products.files,
    productOfferingForm: store.forms.productOffering,
    merchantDetail: store.merchants.merchantDetail,
    productMappingValidation: store.products.productMappingValidation,
    productOfferingValidation: store.products.productOfferingValidation
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      saveWarehouse,
      fetchLocations,
      fetchFilterLocations,
      validatePackageType,
      updateWarehouse,
      addProductOffer,
      loadFile,
      addAttachment,
      linkAttachment,
      removeAttachment,
      removeAttachmentLink,
      fetchWarehouses,
      addMessage,
      editProductOffer,
      getMerchant
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AddForm)
