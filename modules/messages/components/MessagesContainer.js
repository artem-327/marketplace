import { connect } from 'react-redux'
import { withToastManager } from 'react-toast-notifications'
import { injectIntl } from 'react-intl'
import { Messages as WithoutRedux, Message } from './Messages'
import * as Actions from '../actions'

const mapStateToProps = ({ messages }) => messages
const Messages = connect(mapStateToProps, Actions)(withToastManager(injectIntl(WithoutRedux)))

export { Messages, Message }
