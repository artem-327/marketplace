import { connect } from 'react-redux'
import ShippingQuotes from './ShippingQuotes'
import * as Actions from '../actions'

function mapStateToProps({shiping}) {
  return shiping
}

export default connect(mapStateToProps, Actions)(ShippingQuotes)
