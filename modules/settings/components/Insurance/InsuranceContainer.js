import { connect } from 'react-redux'
//Actions
import { getInsuranceDocuments, openPopup, closeSuccessPopup } from '../../actions'
//Components
import Insurance from './Insurance'
//Selectors
import { makeGetDatagridRows, makeGetLoading, makeGetOpenPopup, makeGetIsOpenSuccessPopup } from '../../selectors'

const makeMapStateToProps = () => {
  const getRows = makeGetDatagridRows()
  const getLoading = makeGetLoading()
  const getOpenPopup = makeGetOpenPopup()
  const getIsOpenSuccessPopup = makeGetIsOpenSuccessPopup()

  const mapStateToProps = state => {
    return {
      rows: getRows(state),
      loading: getLoading(state),
      isOpenPopup: getOpenPopup(state),
      isOpenSuccessPopup: getIsOpenSuccessPopup(state)
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = {
  getInsuranceDocuments,
  openPopup,
  closeSuccessPopup
}

export default connect(makeMapStateToProps, mapDispatchToProps)(Insurance)
