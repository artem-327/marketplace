import { connect } from 'react-redux'

import * as Actions from '../actions'
import OrderFilter from './OrderFilter'

const mapStateToProps = store => ({ ...store.filter.filter }) // ! !

const mapDispatchToProps = {
  ...Actions
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderFilter)
