import { connect } from 'react-redux'
import ShippingQuotes from './ShippingQuotes'
import * as Actions from '../actions'

function mapStateToProps({shipping}) {
  return shipping
}

export default connect(mapStateToProps, Actions)(ShippingQuotes)
