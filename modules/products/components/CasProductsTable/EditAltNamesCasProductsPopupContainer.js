import { connect } from 'react-redux'
import EditAltNamesCasProductsPopup from './EditAltNamesCasProductsPopup'
import { getSafe } from '../../../../utils/functions'
import {
  closeEditPopup,
  getAlternativeProductNames,
  postNewProductName,
  updateProductName,
  deleteProductName
} from '../../actions'


const mapDispatchToProps = {
    closeEditPopup,
    getAlternativeProductNames,
    postNewProductName,
    updateProductName,
    deleteProductName
  }
  
  const mapStateToProps = state => {
    return {
      popupValues: state.productsAdmin.popupValues,
      altCasNamesRows: getSafe(() => state.productsAdmin.altCasNamesRows.data, []),
      loading: getSafe(() => state.productsAdmin.loading, false)
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditAltNamesCasProductsPopup)
  