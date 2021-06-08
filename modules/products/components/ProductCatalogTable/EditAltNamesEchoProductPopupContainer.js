import { connect } from 'react-redux'
import EditAltNamesEchoProductPopup from './EditAltNamesEchoProductPopup'
import {
  closePopup,
  getAlternativeCompanyGenericProductsNames,
  postNewCompanyGenericProductsAltName,
  updateCompanyGenericProductsAltName,
  deleteCompanyGenericProductsAltName
} from '../../actions'
import {
  makeGetPopupValues,
  makeGetAltEchoNamesRows,
  makeGetLoading
} from '../../selectors'

const mapDispatchToProps = {
  closePopup,
  getAlternativeCompanyGenericProductsNames,
  postNewCompanyGenericProductsAltName,
  updateCompanyGenericProductsAltName,
  deleteCompanyGenericProductsAltName
}

const makeMapStateToProps = () => {
  const getPopupValues = makeGetPopupValues()
  const getAltEchoNamesRows = makeGetAltEchoNamesRows()
  const getLoading = makeGetLoading()

  const mapStateToProps = state => {
    return {
      popupValues: getPopupValues(state),
      productAltNames: getAltEchoNamesRows(state),
      loading: getLoading(state)
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps, mapDispatchToProps)(EditAltNamesEchoProductPopup)
  