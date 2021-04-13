import { connect } from 'react-redux'
//Actions
import { getInsuranceDocuments, openPopup } from '../../actions'
//Components
import Insurance from './Insurance'
//Selectors
import { makeGetDatagridRows, makeGetLoading, makeGetOpenPopup } from '../../selectors'

const makeMapStateToProps = () => {
  const getRows = makeGetDatagridRows()
  const getLoading = makeGetLoading()
  const getOpenPopup = makeGetOpenPopup()

  const mapStateToProps = state => {
    return {
      rows: getRows(state),
      loading: getLoading(state),
      isOpenPopup: getOpenPopup(state)
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = {
  getInsuranceDocuments,
  openPopup
}

export default connect(makeMapStateToProps, mapDispatchToProps)(Insurance)
