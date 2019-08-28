import { connect } from 'react-redux'
import DwollaRegister from './DwollaRegister'
// import * as Actions from '../actions'
import { getSafe } from '~/utils/functions'

console.log('type', typeof DwollaRegister)


function mapStateToProps(state, props) {
  return {}
}

export default connect(mapStateToProps, null)(DwollaRegister)
