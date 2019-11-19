import {connect} from 'react-redux'
import {withToastManager} from 'react-toast-notifications'

import Messages from './Messages'
import * as Actions from '../actions'

const mapStateToProps = ({messages}) => messages

export default connect(mapStateToProps, Actions)(withToastManager(Messages))
