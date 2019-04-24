import { connect } from 'react-redux'
import ShipingQuotes from './ShipingQuotes'
import * as Actions from '../actions'

function mapStateToProps({shiping}) {
  return shiping
}

export default connect(mapStateToProps, Actions)(ShipingQuotes)
