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
// Selectors
import { makeGetApplicationName } from '../../selectors'

const makeMapStateToProps = () => {
  const getApplicationName = makeGetApplicationName()
  const mapStateToProps = (store) => {
    return {
      ...store.simpleAdd,
      applicationName: getApplicationName(store),
      edit: (Router.router && Router.router.query.id) || false
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps, {
  ...Actions,
  getProductGrades,
  getProductForms,
  getProductConditions,
  getDocumentTypes
})(withToastManager(AddInventoryForm))
