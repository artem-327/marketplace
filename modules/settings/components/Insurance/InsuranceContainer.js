import { connect } from 'react-redux'
//Actions
import { getInsuranceDocuments, openPopup } from '../../actions'
//Components
import Insurance from './Insurance'
//Selectors
import { makeGetDatagridRows } from '../../selectors'

const makeMapStateToProps = () => {
  const getRows = makeGetDatagridRows()

  const mapStateToProps = ({ settings }) => {
    return {
      rows: getRows(settings?.insuranceRows),
      loading: settings.loading,
      isOpenPopup: settings.isOpenPopup
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = {
  getInsuranceDocuments,
  openPopup
}

export default connect(makeMapStateToProps, mapDispatchToProps)(Insurance)
