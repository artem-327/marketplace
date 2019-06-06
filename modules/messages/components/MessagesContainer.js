import { connect } from 'react-redux'
import Messages from './Messages'
import * as Actions from '../actions'

const mapStateToProps = ({ messages }) => messages

export default connect(mapStateToProps, Actions)(Messages)
