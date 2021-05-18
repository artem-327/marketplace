import { connect } from 'react-redux'
import Products from './Products'
import * as Actions from '../actions'

const mapStateToProps = state => {
    return {
      ...state.productsAdmin,
      auth: state.auth,
      isOpenImportPopup: state.settings.isOpenImportPopup,
      currentEdit2Form: state.productsAdmin.currentEdit2Form,
      currentEditForm: state.productsAdmin.currentEditForm,
      currentAddForm: state.productsAdmin.currentAddForm
    }
  }
  
  export default connect(mapStateToProps, Actions)(Products)