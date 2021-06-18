import { connect } from 'react-redux'
import Router from 'next/router'
import AddInventoryForm from './AddInventoryForm'
import * as Actions from '../../actions'
import { withToastManager } from 'react-toast-notifications'
import {
  getProductGrades,
  getProductForms,
  getProductConditions,
  getDocumentTypes,
} from '../../../global-data/actions'

function mapStateToProps(store) {
  return {
    ...store.simpleAdd,
    applicationName: store.auth.identity.appInfo.applicationName,
    edit: (Router.router && Router.router.query.id) || false
  }
}

export default connect(mapStateToProps, {
  ...Actions,
  getProductGrades,
  getProductForms,
  getProductConditions,
  getDocumentTypes
})(withToastManager(AddInventoryForm))
