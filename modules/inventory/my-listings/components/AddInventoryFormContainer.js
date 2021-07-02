import { connect } from 'react-redux'
import Router from 'next/router'
import { withToastManager } from 'react-toast-notifications'
// Components
import AddInventoryForm from './AddInventoryForm'
// Actions
import * as Actions from '../../actions'
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
