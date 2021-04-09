import { connect } from 'react-redux'
//Actions
import { getInsuranceDocuments } from '../../actions'
//Components
import Insurance from './Insurance'
//Selectors
import { makeGetDatagridRows } from '../../selectors'
//Constants
import { MOCK_ROWS } from './Insurance.constants'

const makeMapStateToProps = () => {
  const getRows = makeGetDatagridRows()

  const mapStateToProps = state => {
    return {
      rows: getRows(MOCK_ROWS), //TODO state?.settings?.insuranceRows after BE returns data from new endpoint
      loading: state?.settings?.loading
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = {
  getInsuranceDocuments
}

export default connect(makeMapStateToProps, mapDispatchToProps)(Insurance)
