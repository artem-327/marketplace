import { connect } from 'react-redux'
import ShippingQuotes from './ShippingQuotes'
import { getShippingQuotes } from '../actions'

function mapStateToProps({shipping}) {
  return shipping
}

const mapDispatchToProps = {
  getShippingQuotes
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingQuotes)
