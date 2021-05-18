import { connect } from 'react-redux'
import EditAltNamesEchoProductPopup from './EditAltNamesEchoProductPopup'
import {
  closePopup,
  getAlternativeCompanyGenericProductsNames,
  postNewCompanyGenericProductsAltName,
  updateCompanyGenericProductsAltName,
  deleteCompanyGenericProductsAltName
} from '../../actions'
import { getSafe } from '../../../../utils/functions'


const mapDispatchToProps = {
    closePopup,
    getAlternativeCompanyGenericProductsNames,
    postNewCompanyGenericProductsAltName,
    updateCompanyGenericProductsAltName,
    deleteCompanyGenericProductsAltName
  }
  
  const mapStateToProps = state => {
    return {
      popupValues: getSafe(() => state.productsAdmin.popupValues, ''),
      productAltNames: getSafe(() => state.productsAdmin.altEchoNamesRows, []),
      loading: getSafe(() => state.productsAdmin.loading, false)
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditAltNamesEchoProductPopup)
  