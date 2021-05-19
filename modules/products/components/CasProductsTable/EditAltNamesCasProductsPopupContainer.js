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
import { makeGetPopupValues, makeGetAltCasNamesRows, makeGetLoading } from '../../selectors'

const mapDispatchToProps = {
  closeEditPopup,
  getAlternativeProductNames,
  postNewProductName,
  updateProductName,
  deleteProductName
}

const makeMapStateToProps = () => {
  const getPopupValues = makeGetPopupValues()
  const getAltCasNamesRows = makeGetAltCasNamesRows()
  const getLoading = makeGetLoading()

  const mapStateToProps = state => {
    return {
      popupValues: getPopupValues(state),
      altCasNamesRows: getAltCasNamesRows(state),
      loading: getLoading(state)
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps, mapDispatchToProps)(EditAltNamesCasProductsPopup)
  