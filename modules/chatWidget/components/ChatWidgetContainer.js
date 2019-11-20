import { connect } from 'react-redux'
import ChatWidget from './ChatWidget'
import * as Actions from '../actions'
import { injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'

function mapStateToProps({ chatWidget }) {
  // currently not used (usd only actions & reducer)
  return {}
}

export default connect(mapStateToProps, Actions)(injectIntl(ChatWidget))
