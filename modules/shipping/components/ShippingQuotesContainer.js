import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ShippingQuotes from './ShippingQuotes'
import { getShippingQuotes } from '~/modules/shippingQuotes'

function mapStateToProps(store) {
  return {
    shippingQuotesIsFetching: store.shippingQuotes.shippingQuotesIsFetching,
  }
}

const mapDispatchToProps = {
  getShippingQuotes
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingQuotes)
