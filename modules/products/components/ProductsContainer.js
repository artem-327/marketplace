import { connect } from 'react-redux'
import { withAuth } from '../../../hocs'
import { withDatagrid } from '../../datagrid'
import Products from './Products'
import * as Actions from '../actions'
import {
  makeGetAuth,
  makeGetIsOpenImportPopup,
  makeGetCurrentEdit2Form,
  makeGetCurrentEditForm,
  makeGetCurrentAddForm
} from '../selectors'

const makeMapStateToProps = () => {
  const getAuth = makeGetAuth()
  const getIsOpenImportPopup = makeGetIsOpenImportPopup()
  const getCurrentEdit2Form = makeGetCurrentEdit2Form()
  const getCurrentEditForm = makeGetCurrentEditForm()
  const getCurrentAddForm = makeGetCurrentAddForm()

  const mapStateToProps = state => {
    return {
      ...state.productsAdmin,
      auth: getAuth(state),
      isOpenImportPopup: getIsOpenImportPopup(state),
      currentEdit2Form: getCurrentEdit2Form(state),
      currentEditForm: getCurrentEditForm(state),
      currentAddForm: getCurrentAddForm(state)
    }
  }
  return mapStateToProps
}

export default withDatagrid(withAuth(connect(makeMapStateToProps, Actions)(Products)))
