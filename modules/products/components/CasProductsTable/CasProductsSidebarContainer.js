import { connect } from 'react-redux'
import CasProductsSidebar from './CasProductsSidebar'
import { withDatagrid } from '../../../datagrid'
import { closeAddPopup, postNewCasProductRequest, updateCasProductRequest } from '../../actions'


function mapStateToProps(store) {
    return {
      popupValues: store.productsAdmin.popupValues,
      updating: store.productsAdmin.updating
    }
}

export default withDatagrid(connect(mapStateToProps, {
    closeAddPopup,
    postNewCasProductRequest,
    updateCasProductRequest
})(CasProductsSidebar))
